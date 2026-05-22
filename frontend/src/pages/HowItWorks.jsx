import Navbar from "../components/Navbar";

function HowItWorks() {

    const steps = [
        {
            number: "01",
            title: "Explora servicios",
            description:
                "Descubre barberías, peluquerías, centros de uñas y profesionales premium cerca de ti.",
        },
        {
            number: "02",
            title: "Elige un profesional",
            description:
                "Compara precios, reseñas, experiencia y disponibilidad en tiempo real.",
        },
        {
            number: "03",
            title: "Reserva fácilmente",
            description:
                "Selecciona fecha, horario y confirma tu reserva en segundos.",
        },
        {
            number: "04",
            title: "Disfruta la experiencia",
            description:
                "Asiste a tu reserva y vive una experiencia premium personalizada.",
        },
    ];

    const features = [
        {
            icon: "⚡",
            title: "Reservas instantáneas",
            description:
                "Agenda servicios de forma rápida y moderna desde cualquier dispositivo.",
        },
        {
            icon: "⭐",
            title: "Profesionales verificados",
            description:
                "Solo mostramos especialistas y negocios cuidadosamente seleccionados.",
        },
        {
            icon: "📍",
            title: "Encuentra lugares cercanos",
            description:
                "Busca negocios según distancia, categoría y reputación.",
        },
        {
            icon: "💎",
            title: "Experiencia premium",
            description:
                "Diseñamos una plataforma elegante, rápida y fácil de usar.",
        },
    ];

    return (
        <div className="bg-black min-h-screen text-white overflow-x-hidden">

            {/* GLOW */}
            <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-violet-600 opacity-20 blur-[120px] rounded-full"></div>

            <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-600 opacity-20 blur-[120px] rounded-full"></div>

            <Navbar />

            {/* STEPS */}
            <section className="mt-40 px-6 relative z-10">

                <div className="max-w-7xl mx-auto">

                    <div className="text-center max-w-3xl mx-auto">

                        <h2 className="text-5xl font-semibold">

                            Reserva en 4 pasos

                        </h2>

                        <p className="mt-1 text-zinc-400 text-lg">

                            Diseñamos una experiencia intuitiva y moderna para clientes y profesionales.

                        </p>

                    </div>

                    <div className="mt-20 grid md:grid-cols-2 xl:grid-cols-4 gap-8">

                        {steps.map((step, index) => (

                            <div
                                key={index}
                                className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl hover:border-violet-500/40 transition"
                            >

                                <p className="text-violet-400 text-5xl font-semibold">

                                    {step.number}

                                </p>

                                <h3 className="mt-8 text-2xl font-semibold">

                                    {step.title}

                                </h3>

                                <p className="mt-5 text-zinc-400 leading-relaxed">

                                    {step.description}

                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* FEATURES */}
            <section className="mt-40 px-6 pb-24 relative z-10">

                <div className="max-w-7xl mx-auto">

                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* LEFT */}
                        <div>

                            <h2 className="text-5xl font-semibold leading-tight">

                                Diseñado para clientes y negocios modernos

                            </h2>

                            <p className="mt-8 text-zinc-400 text-lg leading-relaxed">

                                ReservaPo combina diseño premium, rapidez y facilidad
                                para entregar una experiencia elegante y profesional.

                            </p>

                            <div className="mt-10 flex gap-4 flex-wrap">

                                <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">

                                    +500 reservas

                                </div>

                                <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">

                                    +120 profesionales

                                </div>

                                <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl">

                                    ⭐ 4.9 promedio

                                </div>

                            </div>

                        </div>

                        {/* RIGHT */}
                        <div className="grid sm:grid-cols-2 gap-6">

                            {features.map((feature, index) => (

                                <div
                                    key={index}
                                    className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl hover:border-violet-500/40 transition"
                                >

                                    <div className="text-5xl">

                                        {feature.icon}

                                    </div>

                                    <h3 className="mt-8 text-2xl font-semibold">

                                        {feature.title}

                                    </h3>

                                    <p className="mt-5 text-zinc-400 leading-relaxed">

                                        {feature.description}

                                    </p>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default HowItWorks;