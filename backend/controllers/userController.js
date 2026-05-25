import bcrypt from "bcrypt";
import { pool } from "../consultas.js";

export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                error: "Debes completar todos los campos",
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                error: "La nueva contraseña debe tener al menos 8 caracteres",
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                error: "Las contraseñas nuevas no coinciden",
            });
        }

        const result = await pool.query(
            `
            SELECT id, password
            FROM users
            WHERE id = $1
            LIMIT 1
            `,
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Usuario no encontrado",
            });
        }

        const user = result.rows[0];

        const validPassword = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!validPassword) {
            return res.status(401).json({
                error: "La contraseña actual es incorrecta",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await pool.query(
            `
            UPDATE users
            SET password = $1
            WHERE id = $2
            `,
            [hashedPassword, req.user.id]
        );

        res.json({
            message: "Contraseña actualizada correctamente",
        });
    } catch (error) {
        next(error);
    }
};