import bcrypt from "bcrypt";
import { pool } from "./consultas.js";

const DEFAULT_PASSWORD = "ReservaPo123";

const businesses = [
    {
        businessName: "ReservaPo Studio",
        keepExistingOwner: true,
        category: "Barbería",
        city: "Santiago",
        description: "Negocio de prueba",
        image_url: "",
        professionals: [
            {
                name: "Sofía",
                specialty: "Barbera Profesional",
                phone: "",
                image_url: "",
            },
            {
                name: "Daniel",
                specialty: "Barbero Profesional",
                phone: "",
                image_url: "",
            },
            {
                name: "Camila",
                specialty: "Barbera Profesional",
                phone: "",
                image_url: "",
            },
        ],
    },
    {
        userName: "Luxury Barber Admin",
        email: "luxury@reservapo.cl",
        businessName: "Luxury Barber",
        category: "Barbería",
        city: "Santiago",
        description: "Barbería premium especializada en cortes modernos, barba y cuidado masculino.",
        image_url: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=1200&auto=format&fit=crop",
        professionals: [
            {
                name: "Sebastián Morales",
                specialty: "Barbero Premium",
                phone: "+56911111111",
                image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
            },
            {
                name: "Cristóbal Muñoz",
                specialty: "Barbero Clásico",
                phone: "+56911111112",
                image_url: "https://images.unsplash.com/photo-1500649297466-74794c70acfc?q=80&w=1200&auto=format&fit=crop",
            },
        ],
    },
    {
        userName: "Glow Beauty Studio Admin",
        email: "glow@reservapo.cl",
        businessName: "Glow Beauty Studio",
        category: "Peluquería",
        city: "Santiago",
        description: "Estudio de belleza especializado en coloración premium y tratamientos capilares.",
        image_url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format&fit=crop",
        professionals: [
            {
                name: "Camila Rojas",
                specialty: "Colorista Profesional",
                phone: "+56911111113",
                image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
            },
        ],
    },
    {
        userName: "Nails Boutique Admin",
        email: "nails@reservapo.cl",
        businessName: "Nails Boutique",
        category: "Uñas",
        city: "Santiago",
        description: "Boutique de uñas con manicure premium, nail art y diseños personalizados.",
        image_url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200&auto=format&fit=crop",
        professionals: [
            {
                name: "Valentina Pérez",
                specialty: "Especialista en uñas",
                phone: "+56911111114",
                image_url: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1200&auto=format&fit=crop",
            },
            {
                name: "Ignacia Soto",
                specialty: "Manicurista Profesional",
                phone: "+56911111115",
                image_url: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?q=80&w=1200&auto=format&fit=crop",
            },
        ],
    },
    {
        userName: "Relax Spa Admin",
        email: "relax@reservapo.cl",
        businessName: "Relax Spa",
        category: "Masajes",
        city: "Santiago",
        description: "Spa de relajación, masoterapia y bienestar corporal.",
        image_url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop",
        professionals: [
            {
                name: "Martín González",
                specialty: "Masoterapeuta",
                phone: "+56911111116",
                image_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
            },
            {
                name: "Benjamín Navarro",
                specialty: "Especialista en Masajes",
                phone: "+56911111117",
                image_url: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=1200&auto=format&fit=crop",
            },
        ],
    },
    {
        userName: "Skin Glow Clinic Admin",
        email: "skin@reservapo.cl",
        businessName: "Skin Glow Clinic",
        category: "Skincare",
        city: "Santiago",
        description: "Clínica estética enfocada en tratamientos faciales y cuidado avanzado de la piel.",
        image_url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop",
        professionals: [
            {
                name: "Fernanda Castillo",
                specialty: "Especialista en Skincare",
                phone: "+56911111118",
                image_url: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?q=80&w=1200&auto=format&fit=crop",
            },
        ],
    },
    {
        userName: "Elite Men Admin",
        email: "elite@reservapo.cl",
        businessName: "Elite Men",
        category: "Barbería",
        city: "Santiago",
        description: "Barbería masculina con cortes clásicos y modernos.",
        image_url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200&auto=format&fit=crop",
        professionals: [
            {
                name: "Diego Fuentes",
                specialty: "Barbero Profesional",
                phone: "+56911111119",
                image_url: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=1200&auto=format&fit=crop",
            },
        ],
    },
    {
        userName: "Lashes Studio Admin",
        email: "lashes@reservapo.cl",
        businessName: "Lashes Studio",
        category: "Pestañas",
        city: "Santiago",
        description: "Estudio especializado en extensiones de pestañas y lifting.",
        image_url: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=1200&auto=format&fit=crop",
        professionals: [
            {
                name: "Josefa Herrera",
                specialty: "Lash Artist",
                phone: "+56911111120",
                image_url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
            },
        ],
    },
    {
        userName: "Urban Hair Admin",
        email: "urban@reservapo.cl",
        businessName: "Urban Hair",
        category: "Peluquería",
        city: "Santiago",
        description: "Peluquería urbana especializada en estilos modernos y coloración.",
        image_url: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop",
        professionals: [
            {
                name: "Tomás Reyes",
                specialty: "Peluquero Senior",
                phone: "+56911111121",
                image_url: "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=1200&auto=format&fit=crop",
            },
        ],
    },
    {
        userName: "Beauty Brows Admin",
        email: "brows@reservapo.cl",
        businessName: "Beauty Brows",
        category: "Cejas",
        city: "Santiago",
        description: "Estudio profesional de diseño, perfilado y cuidado de cejas.",
        image_url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop",
        professionals: [
            {
                name: "Florencia Vega",
                specialty: "Especialista en Cejas",
                phone: "+56911111122",
                image_url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
            },
        ],
    },
    {
        userName: "Beauty Glam Admin",
        email: "glam@reservapo.cl",
        businessName: "Beauty Glam",
        category: "Maquillaje",
        city: "Santiago",
        description: "Estudio de maquillaje social, novias y editorial.",
        image_url: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1200&auto=format&fit=crop",
        professionals: [
            {
                name: "Antonia Silva",
                specialty: "Makeup Artist",
                phone: "+56911111123",
                image_url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1200&auto=format&fit=crop",
            },
        ],
    },
    {
        userName: "Smooth Skin Center Admin",
        email: "smooth@reservapo.cl",
        businessName: "Smooth Skin Center",
        category: "Depilación",
        city: "Santiago",
        description: "Centro especializado en depilación láser y cuidado de la piel.",
        image_url: "https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?q=80&w=1200&auto=format&fit=crop",
        professionals: [
            {
                name: "Catalina López",
                specialty: "Especialista en Depilación",
                phone: "+56911111124",
                image_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
            },
        ],
    },
];

const seed = async () => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);

        for (const item of businesses) {
            let userId = null;

            if (!item.keepExistingOwner) {
                const userExists = await client.query(
                    `
                    SELECT id
                    FROM users
                    WHERE email = $1
                    LIMIT 1
                    `,
                    [item.email]
                );

                if (userExists.rows.length > 0) {
                    userId = userExists.rows[0].id;
                } else {
                    const userCreated = await client.query(
                        `
                        INSERT INTO users
                        (name, email, password, role)
                        VALUES ($1, $2, $3, $4)
                        RETURNING id
                        `,
                        [
                            item.userName,
                            item.email,
                            hashedPassword,
                            "business",
                        ]
                    );

                    userId = userCreated.rows[0].id;
                }
            }

            const businessExists = await client.query(
                `
                SELECT id, user_id
                FROM businesses
                WHERE name = $1
                LIMIT 1
                `,
                [item.businessName]
            );

            let businessId;

            if (businessExists.rows.length > 0) {
                businessId = businessExists.rows[0].id;

                if (item.keepExistingOwner) {
                    await client.query(
                        `
                        UPDATE businesses
                        SET
                            category = $1,
                            city = $2,
                            description = $3,
                            image_url = COALESCE(NULLIF(image_url, ''), $4)
                        WHERE id = $5
                        `,
                        [
                            item.category,
                            item.city,
                            item.description,
                            item.image_url,
                            businessId,
                        ]
                    );
                } else {
                    await client.query(
                        `
                        UPDATE businesses
                        SET
                            user_id = $1,
                            category = $2,
                            city = $3,
                            description = $4,
                            image_url = $5
                        WHERE id = $6
                        `,
                        [
                            userId,
                            item.category,
                            item.city,
                            item.description,
                            item.image_url,
                            businessId,
                        ]
                    );
                }
            } else {
                if (item.keepExistingOwner) {
                    console.log(
                        `No se creó ${item.businessName} porque debe existir previamente con su dueño actual.`
                    );
                    continue;
                }

                const businessCreated = await client.query(
                    `
                    INSERT INTO businesses
                    (user_id, name, category, city, description, image_url)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING id
                    `,
                    [
                        userId,
                        item.businessName,
                        item.category,
                        item.city,
                        item.description,
                        item.image_url,
                    ]
                );

                businessId = businessCreated.rows[0].id;
            }

            for (const professional of item.professionals) {
                const professionalExists = await client.query(
                    `
                    SELECT id
                    FROM professionals
                    WHERE business_id = $1
                    AND LOWER(name) = LOWER($2)
                    LIMIT 1
                    `,
                    [businessId, professional.name]
                );

                if (professionalExists.rows.length > 0) {
                    await client.query(
                        `
                        UPDATE professionals
                        SET
                            specialty = $1,
                            phone = COALESCE(NULLIF(phone, ''), $2),
                            image_url = COALESCE(NULLIF(image_url, ''), $3)
                        WHERE id = $4
                        `,
                        [
                            professional.specialty,
                            professional.phone,
                            professional.image_url,
                            professionalExists.rows[0].id,
                        ]
                    );
                } else {
                    await client.query(
                        `
                        INSERT INTO professionals
                        (business_id, name, specialty, phone, image_url)
                        VALUES ($1, $2, $3, $4, $5)
                        `,
                        [
                            businessId,
                            professional.name,
                            professional.specialty,
                            professional.phone,
                            professional.image_url,
                        ]
                    );
                }
            }
        }

        await client.query("COMMIT");

        console.log("Seed ejecutado correctamente.");
        console.log("Password de usuarios business nuevos:", DEFAULT_PASSWORD);
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Error ejecutando seed:", error);
    } finally {
        client.release();
        await pool.end();
    }
};

seed();