import { Link } from "react-router-dom";

function Hero() {

  return (
    <section className="relative min-h-screen pt-30 pb-24 px-6">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT */}
        <div>

          <h1 className="text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight">

            Reserva experiencias

            <span className="block text-zinc-400">

              de belleza premium

            </span>

          </h1>

          <p className="mt-8 text-zinc-400 text-lg leading-relaxed max-w-xl">

            Descubre barberías, peluquerías, uñas y estética en una experiencia elegante, rápida y moderna.

          </p>

          <div className="mt-10">

            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-3 flex flex-col md:flex-row gap-3 shadow-2xl">

              <input
                type="text"
                placeholder="Buscar servicios o negocios..."
                className="flex-1 bg-transparent px-4 py-3 outline-none text-white placeholder:text-zinc-500"
              />

              <button className="bg-white text-black hover:bg-zinc-200 px-7 py-3 rounded-2xl transition font-medium">

                Buscar

              </button>


            </div>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">

              <Link to="/services"
                className="bg-violet-600 hover:bg-violet-500 px-7 py-4 rounded-2xl transition font-medium shadow-lg shadow-violet-500/30">

                Explorar servicios</Link>

              <Link
                to="/join-professionals"
                className="border border-white/10 bg-white/5 hover:bg-white/10 px-7 py-4 rounded-2xl transition">
              

                Únete como profesional

              </Link>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="relative">

          <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">

            <img
              src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1400&auto=format&fit=crop"
              alt="Beauty"
              className="w-full h-[650px] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;