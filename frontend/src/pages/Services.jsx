import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_URL = "https://reservapo.onrender.com";

function Services() {
  const navigate = useNavigate();

  const [businesses, setBusinesses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [loading, setLoading] = useState(true);

  const fallbackImage =
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1";

  const categories = [
    "Todos",
    "barberia",
    "peluqueria",
    "spa",
    "uñas",
    "maquillaje",
  ];

  const normalizeText = (text) => {
    return text
      ?.toString()
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  useEffect(() => {
    async function loadBusinesses() {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/businesses`);

        if (!response.ok) {
          throw new Error("No se pudieron cargar los negocios");
        }

        const data = await response.json();

        setBusinesses(data.businesses || []);
      } catch (error) {
        console.log(error);
        setBusinesses([]);
      } finally {
        setLoading(false);
      }
    }

    loadBusinesses();
  }, []);

  const filteredBusinesses =
    selectedCategory === "Todos"
      ? businesses
      : businesses.filter(
          (business) =>
            normalizeText(business.category) ===
            normalizeText(selectedCategory)
        );

  return (
    <main className="bg-black min-h-dvh text-white overflow-x-hidden overflow-y-visible relative isolate">
      <div className="fixed top-[-250px] left-[-250px] w-[600px] h-[600px] bg-violet-600 opacity-20 blur-[140px] rounded-full pointer-events-none -z-10"></div>

      <div className="fixed bottom-[-250px] right-[-250px] w-[600px] h-[600px] bg-fuchsia-600 opacity-20 blur-[140px] rounded-full pointer-events-none -z-10"></div>

      <Navbar />

      <section className="pt-36 px-6 pb-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-5 py-2 rounded-full text-sm mb-8">
            ✨ Reserva fácil, rápida y segura
          </div>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight">
            Encuentra tu próximo servicio
          </h1>

          <p className="mt-6 text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Explora barberías, peluquerías, spas y negocios de belleza
            disponibles en ReservaPo.
          </p>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-[2rem] p-4 md:p-6 backdrop-blur-xl">
            <div className="flex gap-3 flex-wrap justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-white text-black px-5 py-3 rounded-2xl font-medium transition"
                      : "bg-black/40 border border-white/10 text-zinc-300 px-5 py-3 rounded-2xl hover:bg-white/10 transition"
                  }
                >
                  {category === "barberia"
                    ? "Barbería"
                    : category === "peluqueria"
                    ? "Peluquería"
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden animate-pulse"
                >
                  <div className="h-64 bg-white/10"></div>

                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-white/10 rounded-xl w-3/4"></div>
                    <div className="h-4 bg-white/10 rounded-xl w-full"></div>
                    <div className="h-4 bg-white/10 rounded-xl w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBusinesses.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-12 text-center">
              <h2 className="text-3xl font-semibold">
                No hay negocios disponibles
              </h2>

              <p className="text-zinc-400 mt-4">
                Prueba seleccionando otra categoría.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredBusinesses.map((business) => (
                <article
                  key={business.id}
                  onClick={() => navigate(`/business/${business.id}`)}
                  className="group bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden cursor-pointer hover:border-violet-500/50 hover:-translate-y-1 transition duration-300 backdrop-blur-xl"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={business.image_url || fallbackImage}
                      alt={business.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => {
                        e.currentTarget.src = fallbackImage;
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    <div className="absolute top-5 left-5">
                      <span className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm text-white">
                        {business.category || "Sin categoría"}
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5">
                      <h2 className="text-3xl font-semibold">
                        {business.name}
                      </h2>

                      <p className="text-zinc-300 mt-2 line-clamp-2">
                        {business.description ||
                          "Sin descripción disponible."}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-zinc-500 text-sm">Ubicación</p>

                      <p className="text-zinc-300 mt-1">
                        {business.city || "Sin ciudad"}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/business/${business.id}`);
                      }}
                      className="bg-white text-black px-5 py-3 rounded-2xl hover:bg-zinc-200 transition font-medium"
                    >
                      Ver negocio
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Services;