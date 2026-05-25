import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_URL = "https://reservapo.onrender.com";

function ProfessionalProfile() {
    const { id } = useParams();

    const [professional, setProfessional] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfessional = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    `${API_URL}/professionals/profile/${id}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "Profesional no encontrado"
                    );
                }

                setProfessional(data.professional);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfessional();
    }, [id]);

    if (loading) {
        return (
            <div className="bg-black min-h-screen text-white flex items-center justify-center">
                Cargando profesional...
            </div>
        );
    }

    if (error || !professional) {
        return (
            <div className="bg-black min-h-screen text-white flex flex-col items-center justify-center gap-6 px-6 text-center">
                <h1 className="text-3xl font-semibold">
                    Profesional no encontrado
                </h1>

                <p className="text-zinc-400">
                    No pudimos cargar la información de este profesional.
                </p>

                <Link
                    to="/professionals"
                    className="bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-2xl transition font-medium"
                >
                    Volver a profesionales
                </Link>
            </div>
        );
    }

    const image =
        professional.image_url ||
        professional.business_image_url ||
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop";

    return (
        <div className="bg-black min-h-screen text-white overflow-x-hidden relative isolate">
            <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] bg-violet-600 opacity-20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-600 opacity-20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <Navbar />

            <section className="pt-40 px-6 pb-24 relative z-10">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <img
                            src={image}
                            alt={professional.name}
                            className="w-full h-[700px] object-cover rounded-[3rem]"
                        />
                    </div>

                    <div>
                        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-5 py-2 rounded-full text-sm">
                            ⭐ {professional.rating || "4.9"}
                        </div>

                        <h1 className="mt-8 text-5xl md:text-6xl font-semibold tracking-tight">
                            {professional.name}
                        </h1>

                        <p className="mt-6 text-violet-400 text-xl">
                            {professional.specialty}
                        </p>

                        <p className="mt-8 text-zinc-400 text-lg leading-relaxed">
                            {professional.description ||
                                "Profesional verificado disponible para reservas dentro de ReservaPo."}
                        </p>

                        <div className="mt-10 space-y-5">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                <p className="text-zinc-500 text-sm">
                                    Experiencia
                                </p>

                                <h3 className="mt-2 text-2xl font-semibold">
                                    {professional.experience ||
                                        "Profesional verificado"}
                                </h3>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                <p className="text-zinc-500 text-sm">
                                    Negocio asociado
                                </p>

                                <h3 className="mt-2 text-2xl font-semibold">
                                    {professional.business ||
                                        "Negocio no asignado"}
                                </h3>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                <p className="text-zinc-500 text-sm">
                                    Categoría
                                </p>

                                <h3 className="mt-2 text-2xl font-semibold">
                                    {professional.business_category ||
                                        "Sin categoría"}
                                </h3>
                            </div>
                        </div>

                        <div className="mt-12 flex flex-wrap gap-4">
                            <Link
                                to="/professionals"
                                className="inline-flex bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-2xl transition font-medium"
                            >
                                Volver
                            </Link>

                            {professional.business_id && (
                                <Link
                                    to={`/business/${professional.business_id}`}
                                    className="inline-flex bg-white/5 border border-white/10 hover:bg-white/10 px-8 py-4 rounded-2xl transition font-medium"
                                >
                                    Ver negocio
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProfessionalProfile;