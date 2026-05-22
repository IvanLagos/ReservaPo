const professionals = [
  {
    id: 1,
    name: "Camila Rojas",
    specialty: "Colorista Profesional",
    rating: "4.9",
    experience: "8 años de experiencia",
    business: "Glow Beauty Studio",
    businessId: 2,
    description:
      "Especialista en coloración premium, balayage y tratamientos capilares modernos.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 2,
    name: "Sebastián Morales",
    specialty: "Barbero Premium",
    rating: "4.8",
    experience: "6 años de experiencia",
    business: "Luxury Barber",
    businessId: 1,
    description:
      "Experto en cortes modernos, perfilado y cuidado masculino premium.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 3,
    name: "Valentina Pérez",
    specialty: "Especialista en uñas",
    rating: "5.0",
    experience: "5 años de experiencia",
    business: "Nails Boutique",
    businessId: 4,
    description: "Diseños exclusivos de uñas, nail art y manicure profesional.",
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 4,
    name: "Martín González",
    specialty: "Masoterapeuta",
    rating: "4.7",
    experience: "10 años de experiencia",
    business: "Relax Spa",
    businessId: 3,
    description:
      "Especialista en relajación, masoterapia y bienestar corporal.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 5,
    name: "Fernanda Castillo",
    specialty: "Especialista en Skincare",
    rating: "4.9",
    experience: "7 años de experiencia",
    business: "Skin Glow Clinic",
    businessId: 5,
    description:
      "Tratamientos faciales avanzados y cuidado profundo de la piel.",
    image:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 6,
    name: "Diego Fuentes",
    specialty: "Barbero Profesional",
    rating: "4.8",
    experience: "4 años de experiencia",
    business: "Elite Men",
    businessId: 6,
    description: "Cortes clásicos y modernos con enfoque premium.",
    image:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 7,
    name: "Josefa Herrera",
    specialty: "Lash Artist",
    rating: "5.0",
    experience: "6 años de experiencia",
    business: "Lashes Studio",
    businessId: 7,
    description: "Especialista en extensiones de pestañas y lifting.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 8,
    name: "Tomás Reyes",
    specialty: "Peluquero Senior",
    rating: "4.7",
    experience: "9 años de experiencia",
    business: "Urban Hair",
    businessId: 8,
    description: "Especialista en estilos urbanos y coloración moderna.",
    image:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 9,
    name: "Ignacia Soto",
    specialty: "Manicurista Profesional",
    rating: "4.9",
    experience: "5 años de experiencia",
    business: "Nails Boutique",
    businessId: 4,
    description: "Especialista en manicure premium y nail art.",
    image:
      "https://images.unsplash.com/photo-1506863530036-1efeddceb993?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 10,
    name: "Benjamín Navarro",
    specialty: "Especialista en Masajes",
    rating: "4.8",
    experience: "11 años de experiencia",
    business: "Relax Spa",
    businessId: 3,
    description: "Masajes relajantes y terapias musculares avanzadas.",
    image:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 11,
    name: "Florencia Vega",
    specialty: "Especialista en Cejas",
    rating: "4.9",
    experience: "4 años de experiencia",
    business: "Beauty Brows",
    businessId: 9,
    description: "Diseño y perfilado de cejas profesional.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 12,
    name: "Cristóbal Muñoz",
    specialty: "Barbero Clásico",
    rating: "4.6",
    experience: "7 años de experiencia",
    business: "Luxury Barber",
    businessId: 1,
    description: "Especialista en estilos clásicos y barba.",
    image:
    "https://images.unsplash.com/photo-1500649297466-74794c70acfc?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 13,
    name: "Antonia Silva",
    specialty: "Makeup Artist",
    rating: "5.0",
    experience: "8 años de experiencia",
    business: "Beauty Glam",
    businessId: 10,
    description: "Maquillaje social, novias y editorial.",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 14,
    name: "Catalina López",
    specialty: "Especialista en Depilación",
    rating: "4.8",
    experience: "5 años de experiencia",
    business: "Smooth Skin Center",
    businessId: 11,
    description: "Depilación láser y cuidado de la piel.",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
  },
];

export default professionals;
