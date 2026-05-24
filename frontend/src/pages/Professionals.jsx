import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_URL = "https://reservapo.onrender.com";

function Professionals() {
    const [professionals, setProfessionals] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getProfessionals = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(`${API_URL}/professionals`);

                if (!response.ok) {
                    throw new Error("No se pudieron cargar los profesionales");
                }

                const data = await response.json();

                setProfessionals(data.professionals || []);
            } catch (error) {
                console.error(error);
                setError("No pudimos cargar los profesionales.");
            } finally {
                setLoading(false);
            }
        };

        getProfessionals();
    }, []);

    const getProfessionalCategory = (professional) => {
        if (professional.business_category) {
            return professional.business_category;
        }

        const lower = professional.specialty?.toLowerCase() || "";

        if (lower.includes("barber") || lower.includes("barbero")) {
            return "Barbería";
        }

        if (
            lower.includes("peluquer") ||
            lower.includes("cabello") ||
            lower.includes("colorista") ||
            lower.includes("estilista")
        ) {
            return "Peluquería";
        }

        if (
            lower.includes("uñas") ||
            lower.includes("manicure") ||
            lower.includes("nail")
        ) {
            return "Uñas";
        }

        if (
            lower.includes("masaje") ||
            lower.includes("spa") ||
            lower.includes("relajación")
        ) {
            return "Masajes";
        }

        if (
            lower.includes("skin") ||
            lower.includes("facial") ||
            lower.includes("skincare")
        ) {
            return "Skincare";
        }

        if (lower.includes("pestaña") || lower.includes("lashes")) {
            return "Pestañas";
        }

        if (lower.includes("cejas") || lower.includes("brows")) {
            return "Cejas";
        }

        if (lower.includes("maquill") || lower.includes("makeup")) {
            return "Maquillaje";
        }

        if (lower.includes("depil")) {
            return "Depilación";
        }

        return "Otros";
    };

    const categories = useMemo(() => {
        const extractedCategories = professionals.map((professional) =>
            getProfessionalCategory(professional)
        );

        return ["Todos", ...new Set(extractedCategories)];
    }, [professionals]);

    const filteredProfessionals = useMemo(() => {
        return professionals.filter((professional) => {
            const professionalCategory = getProfessionalCategory(professional);

            const matchesCategory =
                selectedCategory === "Todos" ||
                professionalCategory === selectedCategory;

            const searchLower = search.toLowerCase();

            const matchesSearch =
                professional.name?.toLowerCase().includes(searchLower) ||
                professional.specialty?.toLowerCase().includes(searchLower) ||
                professional.business?.toLowerCase().includes(searchLower) ||
                professional.experience?.toLowerCase().includes(searchLower);

            return matchesCategory && matchesSearch;
        });
    }, [professionals, selectedCategory, search]);

    return (
        <div className="bg-black text-white overflow-x-hidden relative isolate min-h-screen">
            <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] bg-violet-600 opacity-20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
            <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-600 opacity-20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <Navbar />

            <section className="pt-32 px-6 pb-20 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-5 py-2 rounded-full text-sm">
                            ✨ Profesionales destacados
                        </div>

                        <h1 className="mt-8 text-5xl md:text-7xl font-semibold tracking-tight leading-tight">
                            Encuentra especialistas premium
                        </h1>

                        <p className="mt-8 text-zinc-400 text-lg leading-relaxed">
                            Descubre profesionales verificados cerca de ti.
                        </p>
                    </div>

                    <div className="mt-14 max-w-3xl mx-auto relative z-[9999]">
                        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-3 flex flex-col md:flex-row gap-3 shadow-2xl">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar profesionales..."
                                className="flex-1 bg-transparent px-4 py-3 outline-none text-white placeholder:text-zinc-500"
                            />

                            <button className="bg-white text-black hover:bg-zinc-200 px-7 py-3 rounded-2xl transition font-medium">
                                Buscar
                            </button>
                        </div>
                    </div>

                    <div className="mt-16 flex flex-wrap justify-center gap-4 overflow-x-auto pb-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={
                                    "px-6 py-3 rounded-2xl transition whitespace-nowrap border " +
                                    (selectedCategory === category
                                        ? "bg-white text-black border-white"
                                        : "bg-white/5 border-white/10 hover:border-violet-500 hover:bg-white/10")
                                }
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {loading && (
                        <div className="max-w-4xl mx-auto mt-16 bg-white/5 border border-white/10 rounded-[3rem] p-14 text-center backdrop-blur-xl">
                            <div className="text-6xl">⏳</div>
                            <h2 className="mt-8 text-4xl font-semibold">
                                Cargando profesionales
                            </h2>
                            <p className="mt-5 text-zinc-400 text-lg">
                                Estamos obteniendo los datos reales desde el backend.
                            </p>
                        </div>
                    )}

                    {error && !loading && (
                        <div className="max-w-4xl mx-auto mt-16 bg-red-500/10 border border-red-500/20 rounded-[3rem] p-14 text-center backdrop-blur-xl">
                            <div className="text-6xl">⚠️</div>
                            <h2 className="mt-8 text-4xl font-semibold">
                                Error al cargar
                            </h2>
                            <p className="mt-5 text-red-300 text-lg">
                                {error}
                            </p>
                        </div>
                    )}

                    {!loading && !error && (
                        <>
                            <div className="mt-10 flex items-center justify-center">
                                <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-zinc-300">
                                    {filteredProfessionals.length} profesionales encontrados
                                </div>
                            </div>

                            <div className="mt-16 grid md:grid-cols-2 xl:grid-cols-4 gap-8">
                                {filteredProfessionals.map((professional) => {
                                    const image =
                                        professional.image_url ||
                                        professional.business_image_url ||
                                        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop";

                                    return (
                                        <div
                                            key={professional.id}
                                            className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-xl hover:border-violet-500/40 transition group"
                                        >
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src={image}
                                                    alt={professional.name}
                                                    className="w-full h-[320px] object-cover group-hover:scale-105 transition duration-500"
                                                />

                                                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-2xl text-sm border border-white/10">
                                                    ⭐ {professional.rating || "4.9"}
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <p className="text-violet-400 text-sm">
                                                    {getProfessionalCategory(professional)}
                                                </p>

                                                <h2 className="mt-3 text-2xl font-semibold">
                                                    {professional.name}
                                                </h2>

                                                <p className="mt-3 text-zinc-400">
                                                    {professional.specialty}
                                                </p>

                                                <p className="mt-3 text-zinc-500 text-sm">
                                                    {professional.experience || "Profesional verificado"}
                                                </p>

                                                <p className="mt-2 text-zinc-500 text-sm">
                                                    {professional.business || "Negocio no asignado"}
                                                </p>

                                                <div className="mt-8 flex flex-col gap-3">
                                                    <Link
                                                        to={"/professional/" + professional.id}
                                                        className="w-full bg-white text-black hover:bg-zinc-200 py-3 rounded-2xl transition font-medium flex items-center justify-center"
                                                    >
                                                        Ver perfil
                                                    </Link>

                                                    <Link
                                                        to={"/business/" + professional.business_id}
                                                        className="w-full bg-white/5 border border-white/10 hover:bg-white/10 py-3 rounded-2xl transition font-medium flex items-center justify-center"
                                                    >
                                                        Ver negocio
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {filteredProfessionals.length === 0 && (
                                <div className="max-w-4xl mx-auto mt-16 bg-white/5 border border-white/10 rounded-[3rem] p-14 text-center backdrop-blur-xl">
                                    <div className="text-6xl">🔎</div>

                                    <h2 className="mt-8 text-4xl font-semibold">
                                        No encontramos profesionales
                                    </h2>

                                    <p className="mt-5 text-zinc-400 text-lg leading-relaxed">
                                        Intenta buscar otra categoría o nombre.
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Professionals;