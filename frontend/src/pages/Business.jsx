import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import businesses from "../data/businesses";

function Business() {

    const { id } = useParams();

    const navigate = useNavigate();

    const business = businesses.find(
        (b) => b.id === Number(id)
    );

    const { user } = useAuth();

    const userRole = user?.role?.toLowerCase();

    const isClient = userRole === "client";

    const isBusiness = userRole === "business";

    if (!business) {

        return (
            <div className="bg-black min-h-screen text-white flex items-center justify-center">

                Negocio no encontrado.

            </div>
        );
    }

    const handleReservation = (serviceIndex) => {

        if (!user) {

            navigate("/login");

            return;

        }

        if (isBusiness) {

            navigate("/business-dashboard");

            return;

        }

        navigate(`/booking/${business.id}/${serviceIndex}`);

    };

    return (
        <div className="bg-black min-h-screen text-white overflow-x-hidden relative isolate">

            {/* GLOW */}
            <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-violet-600 opacity-20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-600 opacity-20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <Navbar />

            <section className="pt-36 px-6 pb-20">

                <div className="max-w-7xl mx-auto">

                    <div className="mt-10 grid xl:grid-cols-[320px_1fr_320px] gap-8">

                        {/* LEFT */}
                        <div className="space-y-6">

                            <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-xl">

                                <img
                                    src={business.image}
                                    alt={business.name}
                                    className="w-full h-[320px] object-cover"
                                />

                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl">

                                <h3 className="text-2xl font-semibold">

                                    Información

                                </h3>

                                <div className="mt-6 space-y-5 text-zinc-300">

                                    <div>

                                        <p className="text-zinc-500 text-sm">

                                            Dirección

                                        </p>

                                        <p className="mt-1">

                                            {business.address}

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-zinc-500 text-sm">

                                            Teléfono

                                        </p>

                                        <p className="mt-1">

                                            {business.phone}

                                        </p>

                                    </div>

                                    <div>

                                        <p className="text-zinc-500 text-sm">

                                            Horario

                                        </p>

                                        <p className="mt-1">

                                            {business.schedule}

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* CENTER */}
                        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">

                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                                <div>

                                    <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-4 py-2 rounded-full text-sm">

                                        ✨ Negocio verificado

                                    </div>

                                    <h1 className="mt-6 text-5xl font-semibold tracking-tight">

                                        {business.name}

                                    </h1>

                                    <p className="mt-4 text-zinc-400 max-w-2xl leading-relaxed">

                                        {business.description}

                                    </p>

                                </div>

                                <div className="bg-black/40 border border-white/10 rounded-3xl px-6 py-5 text-center">

                                    <p className="text-yellow-400 text-3xl">

                                        ⭐ {business.rating}

                                    </p>

                                    <p className="mt-2 text-zinc-400 text-sm">

                                        {business.reviews}

                                    </p>

                                </div>

                            </div>

                            {/* SERVICES */}
                            <div className="mt-12">

                                <div className="flex items-center justify-between">

                                    <h2 className="text-3xl font-semibold">

                                        Servicios

                                    </h2>

                                    <p className="text-zinc-500">

                                        {business.services.length} disponibles

                                    </p>

                                </div>

                                <div className="mt-8 space-y-4">

                                    {business.services.map((service, index) => (

                                        <div
                                            key={index}
                                            className="bg-black/30 border border-white/10 rounded-3xl p-6 hover:border-violet-500/40 transition"
                                        >

                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                                <div>

                                                    <h3 className="text-2xl font-medium">

                                                        {service.name}

                                                    </h3>

                                                    <p className="mt-2 text-zinc-400">

                                                        Reserva rápida y sencilla.

                                                    </p>

                                                </div>

                                                <div className="flex items-center gap-4">

                                                    <span className="text-2xl font-semibold text-violet-400">

                                                        {service.price}

                                                    </span>

                                                    {isClient ? (

                                                        <button
                                                            onClick={() =>
                                                                handleReservation(index)
                                                            }
                                                            className="bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-2xl transition font-medium"
                                                        >

                                                            Reservar

                                                        </button>

                                                    ) : isBusiness ? (

                                                        <button
                                                            onClick={() =>
                                                                navigate("/business-dashboard")
                                                            }
                                                            className="bg-violet-500 hover:bg-violet-400 text-white px-6 py-3 rounded-2xl transition font-medium"
                                                        >

                                                            Ver reservas

                                                        </button>

                                                    ) : (

                                                        <button
                                                            onClick={() =>
                                                                navigate("/login")
                                                            }
                                                            className="bg-white/10 border border-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl transition font-medium"
                                                        >

                                                            Iniciar sesión

                                                        </button>

                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>

                        {/* RIGHT */}
                        <div className="space-y-6">

                            <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[2rem] p-8 shadow-2xl shadow-violet-500/20">

                                <p className="text-sm uppercase tracking-widest text-white/70">

                                    Promoción exclusiva

                                </p>

                                <h2 className="mt-5 text-4xl font-semibold leading-tight">

                                    20% OFF

                                </h2>

                                <p className="mt-5 text-white/80 leading-relaxed">

                                    En tu primera reserva utilizando ReservaPo.

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Business;