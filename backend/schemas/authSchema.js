import { z }
from "zod";

// REGISTER
export const registerSchema =
    z.object({

        name:
            z.string()
                .min(
                    3,
                    "Nombre muy corto"
                ),

        email:
            z.email(
                "Email inválido"
            ),

        password:
            z.string()
                .min(
                    6,
                    "La contraseña debe tener mínimo 6 caracteres"
                ),

        role:
            z.enum(
                [
                    "client",
                    "business",
                    "admin",
                ],
                {
                    error:
                        "Role inválido",
                }
            ),

    });

// LOGIN
export const loginSchema =
    z.object({

        email:
            z.email(
                "Email inválido"
            ),

        password:
            z.string()
                .min(
                    6,
                    "Contraseña inválida"
                ),

    });