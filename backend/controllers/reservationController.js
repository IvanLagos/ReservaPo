import { pool } from "../consultas.js";

// CREATE RESERVATION
export const createReservation = async (req, res, next) => {
  try {
    const {
      business_id,
      professional_id,
      service,
      reservation_date,
      reservation_time,
    } = req.body;

    if (
      !business_id ||
      !professional_id ||
      !service ||
      !reservation_date ||
      !reservation_time
    ) {
      return res.status(400).json({
        error: "Todos los campos son obligatorios",
      });
    }

    const existingReservation = await pool.query(
      `
            SELECT id
            FROM reservations
            WHERE business_id = $1
            AND professional_id = $2
            AND reservation_date = $3
            AND reservation_time = $4
            AND LOWER(status) != 'cancelled'
            LIMIT 1
            `,
      [business_id, professional_id, reservation_date, reservation_time],
    );

    if (existingReservation.rows.length > 0) {
      return res.status(409).json({
        error: "Esta hora ya fue reservada",
      });
    }

    const result = await pool.query(
      `
            INSERT INTO reservations
            (
                user_id,
                business_id,
                professional_id,
                service,
                reservation_date,
                reservation_time,
                status,
                payment_status
            )
            VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
            `,
      [
        req.user.id,
        business_id,
        professional_id,
        service,
        reservation_date,
        reservation_time,
        "Pendiente",
        "Pendiente",
      ],
    );

    res.status(201).json({
      message: "Reserva creada correctamente",
      reservation: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

// GET CLIENT RESERVATIONS
export const getReservations = async (req, res, next) => {
  try {
    const result = await pool.query(
      `
            SELECT
                reservations.id,
                reservations.user_id,
                reservations.business_id,
                reservations.professional_id,
                reservations.service,
                reservations.reservation_date,
                TO_CHAR(reservations.reservation_time, 'HH24:MI') AS reservation_time,
                reservations.status,
                reservations.payment_status,
                businesses.name AS business_name,
                businesses.city AS business_city,
                professionals.name AS professional_name
            FROM reservations
            INNER JOIN businesses
            ON reservations.business_id = businesses.id
            INNER JOIN professionals
            ON reservations.professional_id = professionals.id
            WHERE reservations.user_id = $1
            ORDER BY reservations.id DESC
            LIMIT 10
            `,
      [req.user.id],
    );

    res.json({
      reservations: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE CLIENT RESERVATION
export const updateReservation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      professional_id,
      service,
      reservation_date,
      reservation_time,
      status,
    } = req.body;

    const reservation = await pool.query(
      `
            SELECT *
            FROM reservations
            WHERE id = $1
            AND user_id = $2
            `,
      [id, req.user.id],
    );

    if (reservation.rows.length === 0) {
      return res.status(404).json({
        error: "Reserva no encontrada",
      });
    }

    const currentReservation = reservation.rows[0];

    const nextProfessionalId =
      professional_id || currentReservation.professional_id;

    const nextService = service || currentReservation.service;

    const nextDate = reservation_date || currentReservation.reservation_date;

    const nextTime = reservation_time || currentReservation.reservation_time;

    const nextStatus = status || currentReservation.status;

    const existingReservation = await pool.query(
      `
            SELECT id
            FROM reservations
            WHERE business_id = $1
            AND professional_id = $2
            AND reservation_date = $3
            AND reservation_time = $4
            AND LOWER(status) != 'cancelled'
            AND id != $5
            LIMIT 1
            `,
      [
        currentReservation.business_id,
        nextProfessionalId,
        nextDate,
        nextTime,
        id,
      ],
    );

    if (existingReservation.rows.length > 0) {
      return res.status(409).json({
        error: "Esta hora ya fue reservada",
      });
    }

    const result = await pool.query(
      `
            UPDATE reservations
            SET
                professional_id = $1,
                service = $2,
                reservation_date = $3,
                reservation_time = $4,
                status = $5
            WHERE id = $6
            RETURNING *
            `,
      [nextProfessionalId, nextService, nextDate, nextTime, nextStatus, id],
    );

    res.json({
      message: "Reserva actualizada correctamente",
      reservation: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

// CANCEL CLIENT RESERVATION
export const deleteReservation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const reservation = await pool.query(
      `
            SELECT *
            FROM reservations
            WHERE id = $1
            AND user_id = $2
            `,
      [id, req.user.id],
    );

    if (reservation.rows.length === 0) {
      return res.status(404).json({
        error: "Reserva no encontrada",
      });
    }

    if (reservation.rows[0].status?.toLowerCase() === "cancelled") {
      return res.status(400).json({
        error: "La reserva ya está cancelada",
      });
    }

    const result = await pool.query(
      `
            UPDATE reservations
            SET status = 'cancelled'
            WHERE id = $1
            RETURNING *
            `,
      [id],
    );

    res.json({
      message: "Reserva cancelada correctamente",
      reservation: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE RESERVATION STATUS FROM BUSINESS DASHBOARD
export const updateBusinessReservationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        error: "El estado es obligatorio",
      });
    }

    const allowedStatuses = [
      "Pendiente",
      "pending",
      "Confirmada",
      "confirmed",
      "Cancelada",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        error: "Estado no permitido",
      });
    }

    const businessResult = await pool.query(
      `
            SELECT id
            FROM businesses
            WHERE user_id = $1
            LIMIT 1
            `,
      [req.user.id],
    );

    if (businessResult.rows.length === 0) {
      return res.status(404).json({
        error: "No tienes un negocio asociado",
      });
    }

    const businessId = businessResult.rows[0].id;

    const reservationResult = await pool.query(
      `
            SELECT *
            FROM reservations
            WHERE id = $1
            AND business_id = $2
            `,
      [id, businessId],
    );

    if (reservationResult.rows.length === 0) {
      return res.status(404).json({
        error: "Reserva no encontrada para este negocio",
      });
    }

    const finalStatus =
      status === "confirmed"
        ? "Confirmada"
        : status === "cancelled"
          ? "Cancelada"
          : "Pendiente";

    const result = await pool.query(
      `
    UPDATE reservations
    SET status = $1
    WHERE id = $2
    AND business_id = $3
    RETURNING *
    `,
      [finalStatus, id, businessId],
    );

    res.json({
      message: "Estado de reserva actualizado correctamente",
      reservation: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};
