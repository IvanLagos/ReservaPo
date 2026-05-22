import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 overflow-hidden relative">

            {/* GLOW */}
            <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-violet-600 opacity-20 blur-[120px] rounded-full"></div>

            <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-600 opacity-20 blur-[120px] rounded-full"></div>

            {/* CARD */}
            <div className="relative w-full max-w-5xl grid lg:grid-cols-2 items-stretch bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[2rem] overflow-hidden shadow-2xl z-10">

                {/* LEFT */}
                <div className="hidden lg:flex flex-col justify-between p-14 bg-gradient-to-br from-violet-600 to-fuchsia-600">

                    <div>

                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-2xl border border-white/20">

                            ✦

                        </div>

                        <h2 className="mt-10 text-5xl font-semibold leading-tight">

                            Bienvenido de vuelta

                        </h2>

                        <p className="mt-6 text-white/80 text-lg leading-relaxed">

                            Accede a tu cuenta y reserva servicios premium de belleza y bienestar.

                        </p>

                    </div>

                    <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-md">

                        <p className="text-lg leading-relaxed text-white/90">

                            “ReservaPo hizo que reservar servicios fuera muchísimo más simple.”

                        </p>

                        <div className="mt-5 flex items-center gap-4">

                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop"
                                alt="User"
                                className="w-14 h-14 rounded-2xl object-cover"
                            />

                            <div>

                                <h4 className="font-medium">

                                    Camila Rojas

                                </h4>

                                <p className="text-white/70 text-sm">

                                    Cliente frecuente

                                </p>

                            </div>

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

                            Iniciar sesión

                        </h1>

                        <p className="mt-4 text-zinc-400">

                            Ingresa a tu cuenta para continuar.

                        </p>

                        {/* FORM */}
                        <form
                            className="mt-10 space-y-6"
                            onSubmit={(e) => {

                                e.preventDefault();

                                /*
                                    LOGIN FALSO
                                */

                                const fakeUser = {
                                    name: "Ivan",
                                    role: "client",  // <-----CAMBIAR ENTRE "client" y "business" PARA VER DE DIFERENTE PERSPECTIVA LA PAGINA.
                                };

                                login(fakeUser);

                                if (fakeUser.role === "business") {

                                    navigate("/business-dashboard");

                                } else {

                                    navigate("/services");

                                }

                            }}
                        >

                            {/* EMAIL */}
                            <div>

                                <label className="block text-sm text-zinc-400 mb-3">

                                    Correo electrónico

                                </label>

                                <input
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-violet-500 transition"
                                />

                            </div>

                            {/* PASSWORD */}
                            <div>

                                <div className="flex items-center justify-between mb-3">

                                    <label className="text-sm text-zinc-400">

                                        Contraseña

                                    </label>

                                    <button
                                        type="button"
                                        className="text-sm text-violet-400 hover:text-violet-300 transition"
                                    >

                                        ¿Olvidaste tu contraseña?

                                    </button>

                                </div>

                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-violet-500 transition"
                                />

                            </div>

                            {/* REMEMBER */}
                            <div className="flex items-center gap-3">

                                <input
                                    type="checkbox"
                                    className="w-5 h-5 rounded border-white/10 bg-zinc-900"
                                />

                                <span className="text-zinc-400 text-sm">

                                    Recordar sesión

                                </span>

                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                className="w-full bg-white text-black hover:bg-zinc-200 py-4 rounded-2xl font-medium transition shadow-lg"
                            >

                                Entrar

                            </button>

                        </form>

                        {/* REGISTER */}
                        <p className="mt-8 text-zinc-400 text-center">

                            ¿No tienes cuenta?

                            <Link
                                to="/register"
                                className="text-white hover:text-violet-400 transition ml-2"
                            >

                                Crear cuenta

                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;