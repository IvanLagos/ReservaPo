export function isBusinessOpen(schedule, day) {

    const selectedDay = schedule.find(
        (item) => item.day === day
    );

    if (!selectedDay) return false;

    return selectedDay.enabled;

}

export function isWithinBusinessHours(
    schedule,
    day,
    time
) {

    const selectedDay = schedule.find(
        (item) => item.day === day
    );

    if (!selectedDay || !selectedDay.enabled) {

        return false;

    }

    return (
        time >= selectedDay.start &&
        time < selectedDay.end
    );

}

export function isTimeTaken(
    reservations,
    professional,
    date,
    time
) {

    return reservations.some(
        (reservation) =>
            reservation.professional === professional &&
            reservation.date === date &&
            reservation.time === time &&
            reservation.status !== "Cancelada"
    );

}

export function canCreateReservation({
    reservations,
    schedule,
    professional,
    date,
    day,
    time,
}) {

    // NEGOCIO CERRADO
    if (!isBusinessOpen(schedule, day)) {

        return {
            success: false,
            message:
                "El negocio está cerrado ese día.",
        };

    }

    // FUERA DE HORARIO
    if (
        !isWithinBusinessHours(
            schedule,
            day,
            time
        )
    ) {

        return {
            success: false,
            message:
                "Horario fuera de disponibilidad.",
        };

    }

    // HORA OCUPADA
    if (
        isTimeTaken(
            reservations,
            professional,
            date,
            time
        )
    ) {

        return {
            success: false,
            message:
                "El profesional ya tiene una reserva en ese horario.",
        };

    }

    return {
        success: true,
    };

}