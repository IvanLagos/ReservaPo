import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { user, logout } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);

    const userRole = user?.role?.toLowerCase();

    const isClient = userRole === "client";

    const isBusiness = userRole === "business";

    return (
        <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">

            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

                {/* LOGO */}
                <Link
                    to={isBusiness ? "/business-dashboard" : "/"}
                    className="flex items-center gap-3"
                >

                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">

                        ✦

                    </div>

                    <span className="text-2xl font-semibold tracking-tight">

                        ReservaPo

                    </span>

                </Link>

                {/* DESKTOP MENU */}
                <div className="hidden lg:flex items-center gap-10 text-zinc-300">

                    {/* CLIENT MENU */}
                    {isClient && (

                        <>

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

                            <Link
                                to="/my-reservations"
                                className="hover:text-white transition"
                            >

                                Mis reservas

                            </Link>

                        </>

                    )}

                    {/* BUSINESS MENU */}
                    {isBusiness && null}

                    {/* PUBLIC MENU */}
                    {!user && (

                        <>

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

                        </>

                    )}

                </div>

                {/* DESKTOP BUTTONS */}
                <div className="hidden lg:flex items-center gap-3">

                    {user ? (

                        <div className="flex items-center gap-4">

                            {/* USER BADGE */}
                            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl">

                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-semibold">

                                    {user.name?.charAt(0)}

                                </div>

                                <div>

                                    <p className="text-sm text-white">

                                        {user.name}

                                    </p>

                                    <p className="text-xs text-zinc-400 capitalize">

                                        {user.role}

                                    </p>

                                </div>

                            </div>

                            {/* LOGOUT */}
                            <button
                                onClick={logout}
                                className="px-5 py-2.5 rounded-2xl bg-white text-black hover:bg-zinc-200 transition font-medium"
                            >

                                Cerrar sesión

                            </button>

                        </div>

                    ) : (

                        <>

                            <Link
                                to="/register"
                                className="px-5 py-2.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                            >

                                Registrarse

                            </Link>

                            <Link
                                to="/login"
                                className="px-5 py-2.5 rounded-2xl bg-white text-black hover:bg-zinc-200 transition font-medium"
                            >

                                Iniciar sesión

                            </Link>

                        </>

                    )}

                </div>

                {/* MOBILE BUTTON */}
                <button
                    className="lg:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >

                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={
                                menuOpen
                                    ? "M6 18L18 6M6 6l12 12"
                                    : "M4 6h16M4 12h16M4 18h16"
                            }
                        />

                    </svg>

                </button>

            </div>

            {/* MOBILE MENU */}
            {menuOpen && (

                <div className="lg:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl px-6 py-6">

                    <div className="flex flex-col gap-5 text-zinc-300">

                        {/* CLIENT */}
                        {isClient && (

                            <>

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

                                <Link
                                    to="/my-reservations"
                                    className="hover:text-white transition"
                                >

                                    Mis reservas

                                </Link>

                            </>

                        )}

                        {/* BUSINESS MENU */}
                        {isBusiness && null}

                        {/* PUBLIC */}
                        {!user && (

                            <>

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

                            </>

                        )}

                        {/* AUTH */}
                        <div className="flex flex-col gap-3 pt-5">

                            {user ? (

                                <>

                                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl">

                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-semibold">

                                            {user.name?.charAt(0)}

                                        </div>

                                        <div>

                                            <p className="text-sm text-white">

                                                {user.name}

                                            </p>

                                            <p className="text-xs text-zinc-400 capitalize">

                                                {user.role}

                                            </p>

                                        </div>

                                    </div>

                                    <button
                                        onClick={logout}
                                        className="px-5 py-2.5 rounded-2xl bg-white text-black hover:bg-zinc-200 transition font-medium"
                                    >

                                        Cerrar sesión

                                    </button>

                                </>

                            ) : (

                                <>

                                    <Link
                                        to="/register"
                                        className="px-5 py-2.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
                                    >

                                        Registrarse

                                    </Link>

                                    <Link
                                        to="/login"
                                        className="px-5 py-2.5 rounded-2xl bg-white text-black hover:bg-zinc-200 transition font-medium"
                                    >

                                        Iniciar sesión

                                    </Link>

                                </>

                            )}

                        </div>

                    </div>

                </div>

            )}

        </nav>
    );
}

export default Navbar;