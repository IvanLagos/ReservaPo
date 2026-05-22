const businessReservations = [
    {
        id: 1,
        businessId: 1,
        businessName: "Luxury Barber",

        client: {
            name: "Camila Rojas",
            phone: "+56 9 1234 5678",
            email: "camila@gmail.com",
        },

        professional: "Sebastián Morales",

        service: {
            name: "Corte + Barba",
            duration: 60,
            price: "$18.990",
        },

        reservationDate: "2026-05-20",
        reservationTime: "10:00",

        status: "Confirmada",

        paymentStatus: "Pagado",

        notes:
            "Cliente solicita degradado suave y perfilado natural.",

        createdAt: "2026-05-18T14:20:00",
    },

    {
        id: 2,
        businessId: 2,
        businessName: "Glow Beauty Studio",

        client: {
            name: "Fernanda Castillo",
            phone: "+56 9 8888 2222",
            email: "fernanda@gmail.com",
        },

        professional: "Camila Rojas",

        service: {
            name: "Balayage Premium",
            duration: 180,
            price: "$89.990",
        },

        reservationDate: "2026-05-20",
        reservationTime: "12:30",

        status: "Pendiente",

        paymentStatus: "Pendiente",

        notes:
            "Cliente quiere tonos fríos y aclarado suave.",

        createdAt: "2026-05-18T16:05:00",
    },

    {
        id: 3,
        businessId: 3,
        businessName: "Relax Spa",

        client: {
            name: "Martín González",
            phone: "+56 9 7777 1111",
            email: "martin@gmail.com",
        },

        professional: "Benjamín Navarro",

        service: {
            name: "Masaje Relajante",
            duration: 90,
            price: "$29.990",
        },

        reservationDate: "2026-05-20",
        reservationTime: "16:00",

        status: "Confirmada",

        paymentStatus: "Pagado",

        notes:
            "Cliente prefiere masaje de relajación profunda.",

        createdAt: "2026-05-18T18:40:00",
    },

    {
        id: 4,
        businessId: 4,
        businessName: "Nails Boutique",

        client: {
            name: "Valentina Pérez",
            phone: "+56 9 6666 5555",
            email: "valentina@gmail.com",
        },

        professional: "Ignacia Soto",

        service: {
            name: "Nail Art Premium",
            duration: 120,
            price: "$34.990",
        },

        reservationDate: "2026-05-21",
        reservationTime: "11:00",

        status: "Pendiente",

        paymentStatus: "Pendiente",

        notes:
            "Diseño personalizado color negro y dorado.",

        createdAt: "2026-05-19T09:10:00",
    },

    {
        id: 5,
        businessId: 5,
        businessName: "Skin Glow Clinic",

        client: {
            name: "Tomás Herrera",
            phone: "+56 9 4444 9999",
            email: "tomas@gmail.com",
        },

        professional: "Fernanda Castillo",

        service: {
            name: "Limpieza Facial",
            duration: 75,
            price: "$39.990",
        },

        reservationDate: "2026-05-21",
        reservationTime: "15:30",

        status: "Cancelada",

        paymentStatus: "Reembolsado",

        notes:
            "Cliente canceló por motivos personales.",

        createdAt: "2026-05-19T11:25:00",
    },

    {
        id: 6,
        businessId: 6,
        businessName: "Elite Men",

        client: {
            name: "Cristóbal Muñoz",
            phone: "+56 9 3333 7777",
            email: "cristobal@gmail.com",
        },

        professional: "Diego Fuentes",

        service: {
            name: "Corte Clásico",
            duration: 45,
            price: "$14.990",
        },

        reservationDate: "2026-05-22",
        reservationTime: "09:00",

        status: "Confirmada",

        paymentStatus: "Pagado",

        notes:
            "Cliente habitual.",

        createdAt: "2026-05-19T14:00:00",
    },

    {
        id: 7,
        businessId: 7,
        businessName: "Lashes Studio",

        client: {
            name: "Catalina López",
            phone: "+56 9 9999 0000",
            email: "catalina@gmail.com",
        },

        professional: "Josefa Herrera",

        service: {
            name: "Extensiones de pestañas",
            duration: 120,
            price: "$49.990",
        },

        reservationDate: "2026-05-22",
        reservationTime: "13:00",

        status: "Pendiente",

        paymentStatus: "Pendiente",

        notes:
            "Cliente quiere volumen natural.",

        createdAt: "2026-05-19T15:45:00",
    },

    {
        id: 8,
        businessId: 8,
        businessName: "Urban Hair",

        client: {
            name: "Sebastián Díaz",
            phone: "+56 9 2323 2323",
            email: "sebastian@gmail.com",
        },

        professional: "Tomás Reyes",

        service: {
            name: "Coloración completa",
            duration: 180,
            price: "$74.990",
        },

        reservationDate: "2026-05-23",
        reservationTime: "17:00",

        status: "Confirmada",

        paymentStatus: "Pagado",

        notes:
            "Cliente quiere cambio de look completo.",

        createdAt: "2026-05-19T17:20:00",
    },
];

export default businessReservations;