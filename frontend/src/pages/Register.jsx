import { Link } from "react-router-dom";

function Register() {

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-10 overflow-x-hidden relative">

            {/* GLOW */}
            <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-violet-600 opacity-20 blur-[120px] rounded-full"></div>

            <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-600 opacity-20 blur-[120px] rounded-full"></div>

            {/* CARD */}
            <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[2rem] overflow-hidden shadow-2xl">

                {/* LEFT */}
                <div className="hidden lg:flex flex-col justify-between p-14 bg-gradient-to-br from-violet-600 to-fuchsia-600">

                    <div>

                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl border border-white/20">

                            ✦

                        </div>

                        <h2 className="mt-10 text-5xl font-semibold leading-tight">

                            Únete a la nueva experiencia de reservas

                        </h2>

                        <p className="mt-6 text-white/80 text-lg leading-relaxed">

                            Descubre servicios premium de belleza, barbería y bienestar
                            en una plataforma moderna y elegante.

                        </p>

                    </div>

                    {/* FEATURES */}
                    <div className="space-y-5">

                        <div className="bg-white/10 border border-white/10 rounded-3xl p-5 backdrop-blur-md">

                            <h3 className="text-xl font-semibold">

                                📅 Reservas modernas

                            </h3>

                            <p className="mt-2 text-white/80">

                                Agenda servicios en segundos desde cualquier lugar.

                            </p>

                        </div>

                        <div className="bg-white/10 border border-white/10 rounded-3xl p-5 backdrop-blur-md">

                            <h3 className="text-xl font-semibold">

                                ⭐ Profesionales verificados

                            </h3>

                            <p className="mt-2 text-white/80">

                                Descubre especialistas premium y negocios destacados.

                            </p>

                        </div>

                    </div>

                </div>

                {/* RIGHT */}
                <div className="relative p-8 md:p-14">

                    {/* CLOSE */}
                    <Link
                        to="/"
                        className="absolute top-8 right-8 w-11 h-11 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition"
                    >

                        ✕

                    </Link>

                    <div className="max-w-md mx-auto">

                        <h1 className="text-4xl font-semibold tracking-tight">

                            Crear cuenta

                        </h1>

                        <p className="mt-4 text-zinc-400">

                            Comienza a reservar servicios premium en minutos.

                        </p>

                        {/* FORM */}
                        <form className="mt-10 space-y-6">

                            {/* NAME */}
                            <div>

                                <label className="block text-sm text-zinc-400 mb-3">

                                    Nombre completo

                                </label>

                                <input
                                    type="text"
                                    placeholder="Ingresa tu nombre"
                                    required
                                    minLength={3}
                                    maxLength={50}
                                    className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-violet-500 transition"
                                />

                            </div>

                            {/* EMAIL */}
                            <div>

                                <label className="block text-sm text-zinc-400 mb-3">

                                    Correo electrónico

                                </label>

                                <input
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    required
                                    className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-violet-500 transition"
                                />

                            </div>

                            {/* PHONE */}
                            <div>

                                <label className="block text-sm text-zinc-400 mb-3">

                                    Número telefónico

                                </label>

                                <input
                                    type="tel"
                                    placeholder="+56 9 1234 5678"
                                    required
                                    pattern="^\+?[0-9\s]{8,15}$"
                                    title="Ingresa un número telefónico válido"
                                    className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-violet-500 transition"
                                />

                            </div>

                            {/* PASSWORD */}
                            <div>

                                <label className="block text-sm text-zinc-400 mb-3">

                                    Contraseña

                                </label>

                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
                                    className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-violet-500 transition"
                                />

                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div>

                                <label className="block text-sm text-zinc-400 mb-3">

                                    Confirmar contraseña

                                </label>

                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
                                    className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-violet-500 transition"
                                />

                            </div>

                            {/* TERMS */}
                            <div className="flex items-start gap-3">

                                <input
                                    type="checkbox"
                                    required
                                    className="mt-1 w-5 h-5 rounded border-white/10 bg-zinc-900"
                                />

                                <p className="text-sm text-zinc-400 leading-relaxed">

                                    Acepto los términos y condiciones y la política de privacidad.

                                </p>

                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                className="w-full bg-white text-black hover:bg-zinc-200 py-4 rounded-2xl font-medium transition shadow-lg"
                            >

                                Crear cuenta

                            </button>

                        </form>

                        {/* LOGIN */}
                        <p className="mt-8 text-zinc-400 text-center">

                            ¿Ya tienes cuenta?

                            <Link
                                to="/login"
                                className="text-white hover:text-violet-400 transition ml-2"
                            >

                                Iniciar sesión

                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;