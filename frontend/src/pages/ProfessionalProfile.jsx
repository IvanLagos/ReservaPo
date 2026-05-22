import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import professionals from "../data/professionals";
import { Link } from "react-router-dom";

function ProfessionalProfile() {

    const { id } = useParams();

    const professional = professionals.find(
        (p) => p.id === Number(id)
    );

    if (!professional) {

        return (
            <div className="bg-black min-h-screen text-white flex items-center justify-center">

                Profesional no encontrado.

            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen text-white overflow-x-hidden">

            {/* GLOW */}
            <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-violet-600 opacity-20 blur-[120px] rounded-full"></div>

            <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-600 opacity-20 blur-[120px] rounded-full"></div>

            <Navbar />

            <section className="pt-40 px-6 pb-24 relative z-10">

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                    {/* IMAGE */}
                    <div>

                        <img
                            src={professional.image}
                            alt={professional.name}
                            className="w-full h-[700px] object-cover rounded-[3rem]"
                        />

                    </div>

                    {/* INFO */}
                    <div>

                        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-5 py-2 rounded-full text-sm">

                            ⭐ {professional.rating}

                        </div>

                        <h1 className="mt-8 text-6xl font-semibold tracking-tight">

                            {professional.name}

                        </h1>

                        <p className="mt-6 text-violet-400 text-xl">

                            {professional.specialty}

                        </p>

                        <p className="mt-8 text-zinc-400 text-lg leading-relaxed">

                            {professional.description}

                        </p>

                        <div className="mt-10 space-y-5">

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

                                <p className="text-zinc-500 text-sm">

                                    Experiencia

                                </p>

                                <h3 className="mt-2 text-2xl font-semibold">

                                    {professional.experience}

                                </h3>

                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

                                <p className="text-zinc-500 text-sm">

                                    Negocio asociado

                                </p>

                                <h3 className="mt-2 text-2xl font-semibold">

                                    {professional.business}

                                </h3>

                            </div>

                        </div>

                        <Link
                            to="/professionals"
                            className="mt-12 inline-flex bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-2xl transition font-medium"
                        >
                            Volver
                        </Link>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default ProfessionalProfile;