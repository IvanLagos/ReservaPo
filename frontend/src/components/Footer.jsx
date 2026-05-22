import { Link } from "react-router-dom";

function Footer() {

    return (
        <footer className="relative mt-32 border-t border-white/10 bg-black overflow-hidden">

            {/* GLOW */}
            <div className="absolute top-[-120px] left-[10%] w-[300px] h-[300px] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="absolute bottom-[-120px] right-[10%] w-[300px] h-[300px] bg-fuchsia-600/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

                {/* TOP */}
                <div className="grid lg:grid-cols-4 gap-14">

                    {/* BRAND */}
                    <div>

                        <Link
                            to="/"
                            className="inline-flex items-center gap-3"
                        >

                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-2xl shadow-2xl shadow-violet-500/20">

                                ✦

                            </div>

                            <div>

                                <h2 className="text-2xl font-semibold tracking-tight">

                                    ReservaPo

                                </h2>

                                <p className="text-sm text-zinc-500">

                                    Beauty Marketplace

                                </p>

                            </div>

                        </Link>

                        <p className="mt-6 text-zinc-400 leading-relaxed max-w-sm">

                            Plataforma moderna para descubrir y reservar
                            servicios de belleza, barbería, spa, uñas,
                            skincare y mucho más.

                        </p>

                    </div>

                    {/* LINKS */}
                    <div>

                        <h3 className="text-lg font-semibold">

                            Navegación

                        </h3>

                        <div className="mt-6 flex flex-col gap-4 text-zinc-400">

                            <Link
                                to="/"
                                className="hover:text-white transition"
                            >

                                Inicio

                            </Link>

                            <Link
                                to="/services"
                                className="hover:text-white transition"
                            >

                                Servicios

                            </Link>

                            <Link
                                to="/professionals"
                                className="hover:text-white transition"
                            >

                                Profesionales

                            </Link>

                            <Link
                                to="/how-it-works"
                                className="hover:text-white transition"
                            >

                                Cómo funciona

                            </Link>

                        </div>

                    </div>

                    {/* BUSINESS */}
                    <div>

                        <h3 className="text-lg font-semibold">

                            Negocios

                        </h3>

                        <div className="mt-6 flex flex-col gap-4 text-zinc-400">

                            <Link
                                to="/join-professionals"
                                className="hover:text-white transition"
                            >

                                Unir mi negocio

                            </Link>

                            <Link
                                to="/login"
                                className="hover:text-white transition"
                            >

                                Panel empresa

                            </Link>

                            <Link
                                to="/register"
                                className="hover:text-white transition"
                            >

                                Crear cuenta

                            </Link>

                        </div>

                    </div>

                    {/* CONTACT */}
                    <div>

                        <h3 className="text-lg font-semibold">

                            Contacto

                        </h3>

                        <div className="mt-6 flex flex-col gap-4 text-zinc-400">

                            <a
                                href="mailto:escarlattotienda@gmail.com"
                                className="hover:text-white transition"
                            >

                                escarlattotienda@gmail.com

                            </a>

                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-white transition"
                            >

                                Instagram

                            </a>

                            <a
                                href="https://wa.me/56900000000"
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-white transition"
                            >

                                WhatsApp

                            </a>

                        </div>

                    </div>

                </div>

                {/* BOTTOM */}
                <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">

                    <p className="text-zinc-500 text-sm text-center md:text-left">

                        © 2026 ReservaPo. Todos los derechos reservados.

                    </p>

                    <div className="flex items-center gap-6 text-sm text-zinc-500">

                        <button className="hover:text-white transition">

                            Privacidad

                        </button>

                        <button className="hover:text-white transition">

                            Términos

                        </button>

                        <button className="hover:text-white transition">

                            Soporte

                        </button>

                    </div>

                </div>

            </div>

        </footer>
    );
}

export default Footer;