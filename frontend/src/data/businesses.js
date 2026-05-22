const businesses = [
  {
    id: 1,
    name: "Luxury Barber",
    category: "Barbería",
    rating: "4.8",
    reviews: "320 reseñas",
    description:
      "Barbería premium especializada en cortes modernos, perfilado y cuidado masculino.",
    image:
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1400&auto=format&fit=crop",
    address: "Santiago Centro, Chile",
    phone: "+56 9 1234 5678",
    schedule: "Lunes a Sábado · 10:00 - 21:00",
    services: [
      {
        name: "Corte de cabello",
        price: "$12.990",
      },
      {
        name: "Perfilado de barba",
        price: "$8.990",
      },
      {
        name: "Corte + Barba",
        price: "$18.990",
      },
    ],
  },

  {
    id: 2,
    name: "Glow Beauty Studio",
    category: "Peluquería",
    rating: "4.9",
    reviews: "510 reseñas",
    description:
      "Especialistas en coloración premium, balayage y tratamientos capilares.",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1400&auto=format&fit=crop",
    address: "Providencia, Chile",
    phone: "+56 9 8888 7777",
    schedule: "Lunes a Domingo · 09:00 - 20:00",
    services: [
      {
        name: "Balayage",
        price: "$89.990",
      },
      {
        name: "Tratamiento capilar",
        price: "$39.990",
      },
    ],
  },

  {
    id: 3,
    name: "Relax Spa",
    category: "Masajes",
    rating: "4.7",
    reviews: "210 reseñas",
    description:
      "Centro de relajación y bienestar corporal con atención premium.",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1400&auto=format&fit=crop",
    address: "Las Condes, Chile",
    phone: "+56 9 5555 2222",
    schedule: "Lunes a Sábado · 11:00 - 22:00",
    services: [
      {
        name: "Masaje relajante",
        price: "$29.990",
      },
      {
        name: "Spa premium",
        price: "$54.990",
      },
    ],
  },

  {
    id: 4,
    name: "Nails Boutique",
    category: "Uñas",
    rating: "5.0",
    reviews: "410 reseñas",
    description:
      "Especialistas en manicure premium, nail art y cuidado de uñas.",
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1400&auto=format&fit=crop",
    address: "Ñuñoa, Chile",
    phone: "+56 9 4444 9999",
    schedule: "Lunes a Domingo · 10:00 - 20:00",
    services: [
      {
        name: "Manicure premium",
        price: "$18.990",
      },
      {
        name: "Nail Art",
        price: "$24.990",
      },
    ],
  },

  {
    id: 5,
    name: "SkinGlow Center",
    category: "Skincare",
    rating: "4.9",
    reviews: "270 reseñas",
    description: "Tratamientos faciales premium y cuidado avanzado de la piel.",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1400&auto=format&fit=crop",
    address: "Vitacura, Chile",
    phone: "+56 9 1111 2222",
    schedule: "Lunes a Sábado · 09:00 - 19:00",
    services: [
      {
        name: "Limpieza facial",
        price: "$34.990",
      },
      {
        name: "Hidratación premium",
        price: "$49.990",
      },
    ],
  },

  {
    id: 6,
    name: "Premium Hair",
    category: "Peluquería",
    rating: "4.8",
    reviews: "180 reseñas",
    description:
      "Peluquería moderna especializada en tendencias y estilismo premium.",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1400&auto=format&fit=crop",
    address: "Providencia, Chile",
    phone: "+56 9 7777 5555",
    schedule: "Lunes a Domingo · 11:00 - 21:00",
    services: [
      {
        name: "Corte premium",
        price: "$19.990",
      },
      {
        name: "Peinado profesional",
        price: "$29.990",
      },
    ],
  },

  {
    id: 7,
    name: "Golden Nails",
    category: "Uñas",
    rating: "4.9",
    reviews: "390 reseñas",
    description:
      "Diseños exclusivos, esmaltado permanente y manicure artística.",
    image:
      "https://images.unsplash.com/photo-1610992015732-2449b76344bc?q=80&w=1400&auto=format&fit=crop",
    address: "Maipú, Chile",
    phone: "+56 9 6666 4444",
    schedule: "Lunes a Sábado · 10:00 - 20:00",
    services: [
      {
        name: "Esmaltado permanente",
        price: "$16.990",
      },
      {
        name: "Diseño Nail Art",
        price: "$22.990",
      },
    ],
  },

  {
    id: 8,
    name: "Urban Barber Club",
    category: "Barbería",
    rating: "4.6",
    reviews: "260 reseñas",
    description:
      "Barbería urbana moderna con estilo clásico y atención personalizada.",
    image:
      "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=1400&auto=format&fit=crop",
    address: "San Miguel, Chile",
    phone: "+56 9 1212 7878",
    schedule: "Lunes a Domingo · 12:00 - 22:00",
    services: [
      {
        name: "Fade premium",
        price: "$14.990",
      },
      {
        name: "Barba + Toallas calientes",
        price: "$19.990",
      },
    ],
  },

  {
    id: 9,
    name: "Zen Wellness",
    category: "Masajes",
    rating: "4.8",
    reviews: "340 reseñas",
    description: "Experiencias de relajación premium y bienestar integral.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1400&auto=format&fit=crop",
    address: "La Reina, Chile",
    phone: "+56 9 3434 5656",
    schedule: "Lunes a Sábado · 09:00 - 23:00",
    services: [
      {
        name: "Masaje descontracturante",
        price: "$39.990",
      },
      {
        name: "Experiencia zen",
        price: "$69.990",
      },
    ],
  },

  {
    id: 10,
    name: "Aura Beauty",
    category: "Peluquería",
    rating: "5.0",
    reviews: "620 reseñas",
    description:
      "Centro de belleza premium especializado en imagen femenina y estilismo moderno.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400&auto=format&fit=crop",
    address: "Las Condes, Chile",
    phone: "+56 9 9090 3030",
    schedule: "Lunes a Domingo · 10:00 - 22:00",
    services: [
      {
        name: "Coloración premium",
        price: "$79.990",
      },
      {
        name: "Alisado brasileño",
        price: "$119.990",
      },
    ],
  },

  {
    id: 11,
    name: "Elite Men Studio",
    category: "Barbería",
    rating: "4.9",
    reviews: "470 reseñas",
    description:
      "Experiencia masculina premium con cortes modernos y tratamientos exclusivos.",
    image:
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1400&auto=format&fit=crop",
    address: "Providencia, Chile",
    phone: "+56 9 4545 7878",
    schedule: "Lunes a Domingo · 11:00 - 23:00",
    services: [
      {
        name: "Corte ejecutivo",
        price: "$21.990",
      },
      {
        name: "Experiencia premium",
        price: "$39.990",
      },
    ],
  },

  {
    id: 12,
    name: "Velvet Spa & Beauty",
    category: "Skincare",
    rating: "5.0",
    reviews: "710 reseñas",
    description:
      "Centro de skincare y bienestar enfocado en experiencias de lujo y relajación.",
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1400&auto=format&fit=crop",
    address: "Vitacura, Chile",
    phone: "+56 9 6767 1212",
    schedule: "Lunes a Domingo · 09:00 - 21:00",
    services: [
      {
        name: "Tratamiento facial luxury",
        price: "$89.990",
      },
      {
        name: "Spa completo",
        price: "$129.990",
      },
    ],
  },
  
];

export default businesses;
