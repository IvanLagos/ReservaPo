import { pool } from "../consultas.js";

// FIND USER BY EMAIL
export const findUserByEmail = async (email) => {
    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
        `,
        [email]
    );

    return result.rows[0];
};

// CREATE USER
export const createUser = async (
    name,
    email,
    password,
    role
) => {
    const result = await pool.query(
        `
        INSERT INTO users
        (
            name,
            email,
            password,
            role
        )
        VALUES
        (
            $1,
            $2,
            $3,
            $4
        )
        RETURNING
        id,
        name,
        email,
        role
        `,
        [
            name,
            email,
            password,
            role,
        ]
    );

    return result.rows[0];
};

// CREATE CLIENT PROFILE
export const createClientProfile = async (
    userId,
    fullName,
    phone
) => {
    const result = await pool.query(
        `
        INSERT INTO client_profiles
        (
            user_id,
            full_name,
            phone,
            avatar_url
        )
        VALUES
        (
            $1,
            $2,
            $3,
            $4
        )
        ON CONFLICT (user_id)
        DO UPDATE SET
            full_name = EXCLUDED.full_name,
            phone = EXCLUDED.phone,
            updated_at = CURRENT_TIMESTAMP
        RETURNING *
        `,
        [
            userId,
            fullName,
            phone || "",
            "",
        ]
    );

    return result.rows[0];
};