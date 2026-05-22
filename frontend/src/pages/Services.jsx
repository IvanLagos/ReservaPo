import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import businesses from "../data/businesses";

function Services() {

    const [distanceOpen, setDistanceOpen] = useState(false);

    const [selectedDistance, setSelectedDistance] = useState("Cerca de mí");

    const [selectedCategory, setSelectedCategory] = useState("Todos");

    const [search, setSearch] = useState("");

    const categories = [
        "Todos",
        "Barbería",
        "Peluquería",
        "Uñas",
        "Masajes",
        "Skincare",
    ];

    const filteredBusinesses = useMemo(() => {

        return businesses.filter((business) => {

            const matchesCategory =
                selectedCategory === "Todos" ||
                business.category === selectedCategory;

            const searchLower = search.toLowerCase();

            const matchesSearch =
                business.name.toLowerCase().includes(searchLower) ||
                business.category.toLowerCase().includes(searchLower) ||
                business.description.toLowerCase().includes(searchLower) ||
                (
                    Array.isArray(business.services) &&
                    business.services.some((service) =>
                        service.name
                            .toLowerCase()
                            .includes(searchLower)
                    )
                );

            return matchesCategory && matchesSearch;

        });

    }, [selectedCategory, search]);

    return (
        <div className="bg-black text-white overflow-x-hidden relative isolate min-h-screen">

            {/* GLOW */}
            <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] bg-violet-600 opacity-20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-600 opacity-20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <Navbar />

            {/* HEADER */}
            <section className="pt-32 px-6 relative">

                <div className="max-w-7xl mx-auto overflow-visible">

                    <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">

                        Explorar servicios

                    </h1>

                    <p className="mt-5 text-zinc-400 text-lg max-w-2xl leading-relaxed">

                        Descubre los mejores profesionales y centros de belleza cerca de ti.

                    </p>

                    {/* SEARCH */}
                    <div className="mt-10 relative z-[9999] overflow-visible">

                        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-3 flex flex-col md:flex-row gap-3 shadow-2xl">

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar barberías, peluquerías, uñas, servicios..."
                                className="flex-1 bg-transparent px-4 py-3 outline-none text-white placeholder:text-zinc-500"
                            />

                            <button className="bg-white text-black hover:bg-zinc-200 px-7 py-3 rounded-2xl transition font-medium">

                                Buscar

                            </button>

                        </div>

                        {/* SEARCH RESULTS */}
                        {search.length > 0 && (

                            <div className="absolute left-0 top-full mt-3 w-full bg-zinc-900/95 border border-white/10 rounded-3xl backdrop-blur-2xl shadow-2xl z-[99999] overflow-visible">

                                {filteredBusinesses.length > 0 ? (

                                    filteredBusinesses.slice(0, 5).map((business) => (

                                        <Link
                                            key={business.id}
                                            to={"/business/" + business.id}
                                            className="flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition border-b border-white/5 last:border-none"
                                        >

                                            <img
                                                src={business.image}
                                                alt={business.name}
                                                className="w-16 h-16 rounded-2xl object-cover"
                                            />

                                            <div>

                                                <h3 className="font-semibold text-lg">

                                                    {business.name}

                                                </h3>

                                                <p className="text-zinc-400 text-sm mt-1">

                                                    {business.category}

                                                </p>

                                            </div>

                                        </Link>

                                    ))

                                ) : (

                                    <div className="px-6 py-5 text-zinc-400">

                                        No se encontraron negocios.

                                    </div>

                                )}

                            </div>

                        )}

                    </div>

                    {/* FILTERS */}
                    <div className="mt-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                        {/* LEFT FILTERS */}
                        <div className="flex flex-wrap gap-3">

                            {categories.map((category) => (

                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={
                                        "px-5 py-2 rounded-full transition whitespace-nowrap border " +
                                        (
                                            selectedCategory === category
                                                ? "bg-white text-black border-white"
                                                : "bg-white/5 border-white/10 hover:border-violet-500 hover:bg-white/10"
                                        )
                                    }
                                >

                                    {category}

                                </button>

                            ))}

                        </div>

                        {/* RIGHT DISTANCE */}
                        <div className="flex items-center gap-4">

                            <span className="text-zinc-400 text-sm whitespace-nowrap">

                                Distancia:

                            </span>

                            <div className="relative">

                                {/* BUTTON */}
                                <button
                                    onClick={() => setDistanceOpen(!distanceOpen)}
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        bg-white/5
                                        border
                                        border-white/10
                                        hover:border-violet-500
                                        hover:bg-white/10
                                        px-5
                                        py-3
                                        rounded-2xl
                                        transition
                                        backdrop-blur-xl
                                    "
                                >

                                    <span className="text-zinc-300">

                                        {selectedDistance}

                                    </span>

                                    <span
                                        className={
                                            "text-zinc-500 text-sm transition-transform duration-300 " +
                                            (distanceOpen ? "rotate-180" : "")
                                        }
                                    >

                                        ▼

                                    </span>

                                </button>

                                {/* DROPDOWN */}
                                {distanceOpen && (

                                    <div
                                        className="
                                            absolute
                                            top-16
                                            right-0
                                            w-56
                                            bg-zinc-900/95
                                            backdrop-blur-2xl
                                            border
                                            border-white/10
                                            rounded-2xl
                                            shadow-2xl
                                            z-50
                                        "
                                    >

                                        {[
                                            "Cerca de mí",
                                            "Hasta 5 km",
                                            "Hasta 10 km",
                                            "Hasta 20 km",
                                            "Hasta 50 km",
                                        ].map((distance) => (

                                            <button
                                                key={distance}
                                                onClick={() => {
                                                    setSelectedDistance(distance);
                                                    setDistanceOpen(false);
                                                }}
                                                className="
                                                    w-full
                                                    text-left
                                                    px-5
                                                    py-4
                                                    hover:bg-white/5
                                                    transition
                                                    text-zinc-300
                                                "
                                            >

                                                {distance}

                                            </button>

                                        ))}

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* RESULTS INFO */}
            <section className="px-6 pt-10 relative z-0">

                <div className="max-w-7xl mx-auto flex items-center justify-between gap-5 flex-wrap">

                    <p className="text-zinc-400 text-lg">

                        {filteredBusinesses.length} negocios encontrados

                    </p>

                    {selectedCategory !== "Todos" && (

                        <div className="bg-violet-500/10 border border-violet-500/20 text-violet-300 px-5 py-2 rounded-full text-sm">

                            Categoría: {selectedCategory}

                        </div>

                    )}

                </div>

            </section>

            {/* SERVICES GRID */}
            <section className="px-6 py-16 relative z-0 overflow-visible">

                <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                    {filteredBusinesses.map((business) => (

                        <Link
                            to={"/business/" + business.id}
                            key={business.id}
                            className="
                                bg-white/5
                                border
                                border-white/10
                                rounded-[2rem]
                                backdrop-blur-xl
                                shadow-2xl
                                block
                                group
                                hover:border-violet-500/40
                                transition-all
                                duration-300
                            "
                        >

                            {/* IMAGE */}
                            <div className="relative h-[280px] rounded-t-[2rem] overflow-hidden bg-black">

                                <img
                                    src={business.image}
                                    alt={business.name}
                                    className="
                                        absolute
                                        inset-0
                                        w-full
                                        h-full
                                        object-cover
                                        scale-[1.02]
                                        group-hover:scale-[1.08]
                                        transition-transform
                                        duration-700
                                        ease-out
                                        transform-gpu
                                        will-change-transform
                                    "
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                {/* CATEGORY */}
                                <div className="absolute top-5 left-5 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-sm border border-white/10">

                                    {business.category}

                                </div>

                                {/* RATING */}
                                <div className="absolute top-5 right-5 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-sm border border-white/10 text-yellow-400">

                                    ⭐ {business.rating}

                                </div>

                            </div>

                            {/* CONTENT */}
                            <div className="p-6">

                                <h3 className="text-2xl font-semibold">

                                    {business.name}

                                </h3>

                                <p className="mt-3 text-zinc-400 leading-relaxed">

                                    {business.description}

                                </p>

                                <div className="mt-5 flex items-center gap-2 text-sm text-zinc-500">

                                    📍 {business.address}

                                </div>

                                {/* SERVICES */}
                                <div className="mt-6 flex flex-wrap gap-2">

                                    {Array.isArray(business.services) &&
                                        business.services.slice(0, 3).map((service) => (

                                            <div
                                                key={service.name}
                                                className="bg-black/40 border border-white/10 px-3 py-2 rounded-xl text-sm text-zinc-300"
                                            >

                                                {service.name}

                                            </div>

                                        ))}

                                </div>

                                {/* FOOTER */}
                                <div className="mt-8 flex items-center justify-between">

                                    <div className="text-zinc-500 text-sm">

                                        {business.services?.length || 0} servicios

                                    </div>

                                    <div className="bg-white text-black px-5 py-2 rounded-2xl font-medium group-hover:bg-zinc-200 transition">

                                        Ver negocio

                                    </div>

                                </div>

                            </div>

                        </Link>

                    ))}

                </div>

                {/* EMPTY RESULTS */}
                {filteredBusinesses.length === 0 && (

                    <div className="max-w-4xl mx-auto mt-10 bg-white/5 border border-white/10 rounded-[3rem] p-14 text-center backdrop-blur-xl">

                        <div className="text-6xl">

                            🔎

                        </div>

                        <h2 className="mt-8 text-4xl font-semibold">

                            No encontramos resultados

                        </h2>

                        <p className="mt-5 text-zinc-400 text-lg leading-relaxed">

                            Intenta buscar otra categoría o servicio.

                        </p>

                    </div>

                )}

            </section>

        </div>
    );
}

export default Services;