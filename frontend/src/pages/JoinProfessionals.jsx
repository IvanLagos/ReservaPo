import { Link } from "react-router-dom";
import { useState } from "react";
import emailjs from "@emailjs/browser";

import Navbar from "../components/Navbar";

function JoinProfessionals() {

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState({
        businessName: "",
        ownerName: "",
        category: "",
        city: "",
        phone: "",
        email: "",
        instagram: "",
        description: "",
    });

    const benefits = [
        {
            icon: "📅",
            title: "Más reservas",
            description:
                "Recibe nuevos clientes constantemente y aumenta tu visibilidad.",
        },
        {
            icon: "⭐",
            title: "Construye reputación",
            description:
                "Obtén reseñas reales y destaca frente a otros profesionales.",
        },
        {
            icon: "⚡",
            title: "Gestión moderna",
            description:
                "Administra reservas, horarios y servicios desde un solo lugar.",
        },
        {
            icon: "💎",
            title: "Imagen premium",
            description:
                "Forma parte de una plataforma elegante y profesional.",
        },
    ];

    const stats = [
        {
            value: "+500",
            label: "Reservas mensuales",
        },
        {
            value: "+120",
            label: "Profesionales activos",
        },
        {
            value: "4.9⭐",
            label: "Promedio clientes",
        },
    ];

    // SHOW ERROR
    const showError = (message) => {

        setErrorMessage(message);

        setTimeout(() => {

            setErrorMessage("");

        }, 4000);

    };

    // SEND EMAIL
    const sendApplication = async () => {

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const phoneRegex =
            /^[+]?[0-9\s()-]{8,20}$/;

        if (
            !formData.businessName ||
            !formData.ownerName ||
            !formData.category ||
            !formData.city ||
            !formData.phone ||
            !formData.email
        ) {

            showError(
                "Completa todos los campos obligatorios."
            );

            return;

        }

        if (!emailRegex.test(formData.email)) {

            showError(
                "Ingresa un correo electrónico válido."
            );

            return;

        }

        if (!phoneRegex.test(formData.phone)) {

            showError(
                "Ingresa un número telefónico válido."
            );

            return;

        }

        try {

            setLoading(true);

            setErrorMessage("");

            setSuccess(false);

            await emailjs.send(
                "service_d8yp5bi",
                "template_z7tk3af",
                {
                    business_name:
                        formData.businessName,

                    owner_name:
                        formData.ownerName,

                    category:
                        formData.category,

                    city:
                        formData.city,

                    phone:
                        formData.phone,

                    email:
                        formData.email,

                    instagram:
                        formData.instagram,

                    description:
                        formData.description,
                },
                "WyXV2_svqhSk7jYYi"
            );

            setSuccess(true);

            setTimeout(() => {

                setSuccess(false);

            }, 6000);

            setFormData({
                businessName: "",
                ownerName: "",
                category: "",
                city: "",
                phone: "",
                email: "",
                instagram: "",
                description: "",
            });

        } catch (error) {

            console.error(error);

            showError(
                "Ocurrió un error enviando la solicitud."
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="bg-black min-h-screen text-white overflow-hidden relative isolate">

            {/* FLOATING ERROR */}
            {errorMessage && (

                <div
                    className="
                        fixed
                        bottom-6
                        right-6
                        z-[9999]
                        bg-red-500
                        text-white
                        px-6
                        py-4
                        rounded-2xl
                        shadow-2xl
                        animate-pulse
                        max-w-[350px]
                    "
                >

                    ❌ {errorMessage}

                </div>

            )}

            {/* FLOATING SUCCESS */}
            {success && (

                <div
                    className="
                        fixed
                        bottom-6
                        right-6
                        z-[9999]
                        bg-green-500
                        text-white
                        px-6
                        py-4
                        rounded-2xl
                        shadow-2xl
                        max-w-[350px]
                    "
                >

                    ✅ Tu solicitud fue enviada correctamente.

                </div>

            )}

            {/* GLOW */}
            <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-violet-600 opacity-20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-600 opacity-20 blur-[120px] rounded-full pointer-events-none"></div>

            <Navbar />

            {/* HERO */}
            <section className="pt-40 px-6 relative z-10">

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

                    {/* LEFT */}
                    <div>

                        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-5 py-2 rounded-full text-sm">

                            ✨ Solicita unirte a ReservaPo

                        </div>

                        <h1 className="mt-10 text-5xl md:text-7xl font-semibold tracking-tight leading-tight">

                            Lleva tu negocio al siguiente nivel

                        </h1>

                        <p className="mt-8 text-zinc-400 text-lg leading-relaxed max-w-2xl">

                            ReservaPo selecciona cuidadosamente los negocios que
                            forman parte de la plataforma para mantener una
                            experiencia premium y confiable.

                        </p>

                        {/* STATS */}
                        <div className="mt-16 flex flex-wrap gap-5">

                            {stats.map((stat, index) => (

                                <div
                                    key={index}
                                    className="bg-white/5 border border-white/10 px-6 py-5 rounded-2xl backdrop-blur-xl"
                                >

                                    <h3 className="text-3xl font-semibold text-violet-400">

                                        {stat.value}

                                    </h3>

                                    <p className="mt-2 text-zinc-400 text-sm">

                                        {stat.label}

                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="relative">

                        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 backdrop-blur-xl">

                            <img
                                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1400&auto=format&fit=crop"
                                alt="Professional"
                                className="rounded-[2rem] h-[650px] w-full object-cover"
                            />

                            {/* FLOATING CARD */}
                            <div className="absolute bottom-12 left-12 right-12 bg-black/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-zinc-400 text-sm">

                                            Negocios seleccionados

                                        </p>

                                        <h3 className="mt-2 text-3xl font-semibold">

                                            Calidad premium

                                        </h3>

                                    </div>

                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-3xl shadow-2xl shadow-violet-500/30">

                                        💎

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* BENEFITS */}
            <section className="mt-40 px-6 relative z-10">

                <div className="max-w-7xl mx-auto">

                    <div className="text-center max-w-3xl mx-auto">

                        <h2 className="text-5xl font-semibold">

                            ¿Por qué unirte?

                        </h2>

                        <p className="mt-6 text-zinc-400 text-lg leading-relaxed">

                            Diseñamos herramientas pensadas para ayudarte a crecer profesionalmente.

                        </p>

                    </div>

                    <div className="mt-20 grid md:grid-cols-2 xl:grid-cols-4 gap-8">

                        {benefits.map((benefit, index) => (

                            <div
                                key={index}
                                className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl hover:border-violet-500/40 transition"
                            >

                                <div className="text-5xl">

                                    {benefit.icon}

                                </div>

                                <h3 className="mt-8 text-2xl font-semibold">

                                    {benefit.title}

                                </h3>

                                <p className="mt-5 text-zinc-400 leading-relaxed">

                                    {benefit.description}

                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* FORM */}
            <section className="mt-40 px-6 relative z-10 pb-32">

                <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-16 backdrop-blur-xl">

                    <div className="text-center">

                        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-5 py-2 rounded-full text-sm">

                            Solicitud de incorporación

                        </div>

                        <h2 className="mt-8 text-5xl font-semibold">

                            Solicita ingresar a ReservaPo

                        </h2>

                        <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">

                            Revisaremos tu negocio manualmente antes de aprobar
                            su incorporación a la plataforma.

                        </p>

                    </div>

                    {/* FORM GRID */}
                    <div className="mt-16 grid md:grid-cols-2 gap-6">

                        <div>
                            <p className="mb-3 text-sm text-zinc-400">
                                Nombre del negocio *
                            </p>

                            <input
                                type="text"
                                placeholder="Ej: Glow Beauty Studio"
                                value={formData.businessName}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        businessName: e.target.value,
                                    })
                                }
                                className="w-full bg-black/30 border border-white/10 rounded-2xl px-6 py-5 outline-none"
                            />
                        </div>

                        <div>
                            <p className="mb-3 text-sm text-zinc-400">
                                Nombre del dueño *
                            </p>

                            <input
                                type="text"
                                placeholder="Ej: Camila Rojas"
                                value={formData.ownerName}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        ownerName: e.target.value,
                                    })
                                }
                                className="w-full bg-black/30 border border-white/10 rounded-2xl px-6 py-5 outline-none"
                            />
                        </div>

                        <div>
                            <p className="mb-3 text-sm text-zinc-400">
                                Categoría *
                            </p>

                            <input
                                type="text"
                                placeholder="Ej: Barbería, Spa, Nails..."
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        category: e.target.value,
                                    })
                                }
                                className="w-full bg-black/30 border border-white/10 rounded-2xl px-6 py-5 outline-none"
                            />
                        </div>

                        <div>
                            <p className="mb-3 text-sm text-zinc-400">
                                Ciudad *
                            </p>

                            <input
                                type="text"
                                placeholder="Ej: Santiago"
                                value={formData.city}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        city: e.target.value,
                                    })
                                }
                                className="w-full bg-black/30 border border-white/10 rounded-2xl px-6 py-5 outline-none"
                            />
                        </div>

                        <div>
                            <p className="mb-3 text-sm text-zinc-400">
                                Teléfono *
                            </p>

                            <input
                                type="text"
                                placeholder="Ej: +56 9 1234 5678"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        phone: e.target.value,
                                    })
                                }
                                className="w-full bg-black/30 border border-white/10 rounded-2xl px-6 py-5 outline-none"
                            />
                        </div>

                        <div>
                            <p className="mb-3 text-sm text-zinc-400">
                                Correo electrónico *
                            </p>

                            <input
                                type="email"
                                placeholder="Ej: contacto@gmail.com"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full bg-black/30 border border-white/10 rounded-2xl px-6 py-5 outline-none"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <p className="mb-3 text-sm text-zinc-400">
                                Instagram
                            </p>

                            <input
                                type="text"
                                placeholder="Ej: @tu_negocio"
                                value={formData.instagram}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        instagram: e.target.value,
                                    })
                                }
                                className="w-full bg-black/30 border border-white/10 rounded-2xl px-6 py-5 outline-none"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <p className="mb-3 text-sm text-zinc-400">
                                Descripción del negocio
                            </p>

                            <textarea
                                placeholder="Cuéntanos sobre tu negocio..."
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                className="w-full min-h-[180px] bg-black/30 border border-white/10 rounded-2xl px-6 py-5 outline-none resize-none"
                            />
                        </div>

                    </div>

                    {/* BUTTONS */}
                    <div className="mt-12 flex flex-wrap justify-center gap-4">

                        <button
                            onClick={sendApplication}
                            disabled={loading}
                            className="
                                bg-white
                                text-black
                                hover:bg-zinc-200
                                px-8
                                py-4
                                rounded-2xl
                                transition
                                font-medium
                                disabled:opacity-50
                            "
                        >

                            {loading
                                ? "Enviando..."
                                : "Enviar solicitud"}

                        </button>

                        <Link
                            to="/services"
                            className="bg-white/5 border border-white/10 hover:bg-white/10 px-8 py-4 rounded-2xl transition"
                        >

                            Explorar plataforma

                        </Link>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default JoinProfessionals;