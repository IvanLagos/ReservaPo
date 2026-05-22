import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import BusinessSidebar from "../components/BusinessSidebar";
import DashboardStats from "../components/DashboardStats";
import ScheduleManager from "../components/ScheduleManager";
import ReservationsManager from "../components/ReservationsManager";
import ProfessionalsManager from "../components/ProfessionalsManager";

import businessSettingsData from "../data/businessSettings";

function BusinessDashboard() {

    const [activeTab, setActiveTab] = useState("dashboard");

    // SETTINGS
    const [settings, setSettings] =
        useState(() => {

            const saved =
                localStorage.getItem(
                    "businessSettings"
                );

            return saved
                ? JSON.parse(saved)
                : businessSettingsData;

        });

    // SAVE SETTINGS
    useEffect(() => {

        localStorage.setItem(
            "businessSettings",
            JSON.stringify(settings)
        );

    }, [settings]);

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden relative isolate">

            {/* GLOW */}
            <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] bg-violet-600 opacity-20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-600 opacity-20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <Navbar />

            <div className="flex pt-28 min-h-screen">

                {/* SIDEBAR */}
                <BusinessSidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                {/* MAIN */}
                <main className="flex-1 px-6 lg:px-10 pb-10">

                    {/* HEADER */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                        <div>

                            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-5 py-2 rounded-full text-sm">

                                🏪 Panel de negocio

                            </div>

                            <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">

                                Administración de tienda

                            </h1>

                            <p className="mt-4 text-zinc-400 max-w-2xl leading-relaxed">

                                Gestiona reservas, horarios,
                                clientes y profesionales
                                desde un solo lugar.

                            </p>

                        </div>

                        {/* ACTIONS */}
                        <div className="flex flex-wrap gap-4">

                            <button
                                onClick={() =>
                                    setActiveTab(
                                        "reservations"
                                    )
                                }
                                className="bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-2xl transition font-medium"
                            >

                                Ver reservas

                            </button>

                            <button
                                onClick={() =>
                                    setActiveTab(
                                        "schedule"
                                    )
                                }
                                className="bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-3 rounded-2xl transition font-medium"
                            >

                                Configurar horarios

                            </button>

                        </div>

                    </div>

                    {/* STATS */}
                    <div className="mt-10">

                        <DashboardStats />

                    </div>

                    {/* CONTENT */}
                    <div className="mt-10">

                        {activeTab ===
                            "dashboard" && (

                                <div className="grid xl:grid-cols-[1fr_420px] gap-8 items-start">

                                    {/* LEFT */}
                                    <div className="space-y-8 min-w-0">

                                        {/* RESERVATIONS */}
                                        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">

                                            <div className="flex items-center justify-between gap-4 flex-wrap">

                                                <div>

                                                    <h2 className="text-2xl font-semibold">

                                                        Próximas reservas

                                                    </h2>

                                                    <p className="mt-2 text-zinc-400">

                                                        Las próximas citas de tu negocio.

                                                    </p>

                                                </div>

                                                <button
                                                    onClick={() =>
                                                        setActiveTab(
                                                            "reservations"
                                                        )
                                                    }
                                                    className="bg-white text-black hover:bg-zinc-200 px-5 py-3 rounded-2xl transition font-medium"
                                                >

                                                    Ver todas

                                                </button>

                                            </div>

                                            <div className="mt-8 space-y-4">

                                                {[
                                                    {
                                                        client:
                                                            "Camila Rojas",
                                                        service:
                                                            "Balayage Premium",
                                                        time:
                                                            "10:00",
                                                        professional:
                                                            "Valentina",
                                                    },
                                                    {
                                                        client:
                                                            "Sebastián Morales",
                                                        service:
                                                            "Corte + Barba",
                                                        time:
                                                            "12:30",
                                                        professional:
                                                            "Daniel",
                                                    },
                                                    {
                                                        client:
                                                            "Fernanda Castillo",
                                                        service:
                                                            "Masaje Relajante",
                                                        time:
                                                            "16:00",
                                                        professional:
                                                            "Sofía",
                                                    },
                                                ].map(
                                                    (
                                                        reservation,
                                                        index
                                                    ) => (

                                                        <div
                                                            key={
                                                                index
                                                            }
                                                            className="bg-black/30 border border-white/10 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
                                                        >

                                                            <div>

                                                                <h3 className="text-lg font-semibold">

                                                                    {
                                                                        reservation.client
                                                                    }

                                                                </h3>

                                                                <p className="mt-2 text-zinc-400">

                                                                    {
                                                                        reservation.service
                                                                    }

                                                                </p>

                                                            </div>

                                                            <div className="flex items-center gap-6 flex-wrap">

                                                                <div>

                                                                    <p className="text-zinc-500 text-sm">

                                                                        Profesional

                                                                    </p>

                                                                    <p className="mt-1">

                                                                        {
                                                                            reservation.professional
                                                                        }

                                                                    </p>

                                                                </div>

                                                                <div>

                                                                    <p className="text-zinc-500 text-sm">

                                                                        Hora

                                                                    </p>

                                                                    <p className="mt-1">

                                                                        {
                                                                            reservation.time
                                                                        }

                                                                    </p>

                                                                </div>

                                                                <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-xl text-sm">

                                                                    Confirmada

                                                                </div>

                                                            </div>

                                                        </div>

                                                    )
                                                )}

                                            </div>

                                        </div>

                                        {/* SCHEDULE */}
                                        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">

                                            <div className="flex items-center justify-between gap-4 flex-wrap">

                                                <div>

                                                    <h2 className="text-2xl font-semibold">

                                                        Horarios activos

                                                    </h2>

                                                    <p className="mt-2 text-zinc-400">

                                                        Configuración actual de disponibilidad.

                                                    </p>

                                                </div>

                                                <button
                                                    onClick={() =>
                                                        setActiveTab(
                                                            "schedule"
                                                        )
                                                    }
                                                    className="bg-white/5 border border-white/10 hover:bg-white/10 px-5 py-3 rounded-2xl transition font-medium"
                                                >

                                                    Editar horarios

                                                </button>

                                            </div>

                                            <div className="mt-8 grid md:grid-cols-3 gap-4">

                                                {[
                                                    "Lunes",
                                                    "Martes",
                                                    "Miércoles",
                                                    "Jueves",
                                                    "Viernes",
                                                    "Sábado",
                                                ].map(
                                                    (
                                                        day
                                                    ) => (

                                                        <div
                                                            key={
                                                                day
                                                            }
                                                            className="bg-black/30 border border-white/10 rounded-2xl p-5"
                                                        >

                                                            <h3 className="font-semibold">

                                                                {
                                                                    day
                                                                }

                                                            </h3>

                                                            <p className="mt-3 text-zinc-400">

                                                                09:00 - 20:00

                                                            </p>

                                                        </div>

                                                    )
                                                )}

                                            </div>

                                        </div>

                                    </div>

                                    {/* RIGHT */}
                                    <div className="space-y-8 min-w-0">

                                        {/* BUSINESS INFO */}
                                        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">

                                            <h2 className="text-2xl font-semibold">

                                                Información del negocio

                                            </h2>

                                            <div className="mt-8 space-y-6">

                                                <div>

                                                    <p className="text-zinc-500 text-sm">

                                                        Nombre

                                                    </p>

                                                    <p className="mt-2">

                                                        Luxury Barber

                                                    </p>

                                                </div>

                                                <div>

                                                    <p className="text-zinc-500 text-sm">

                                                        Dirección

                                                    </p>

                                                    <p className="mt-2">

                                                        Santiago Centro, Chile

                                                    </p>

                                                </div>

                                                <div>

                                                    <p className="text-zinc-500 text-sm">

                                                        Teléfono

                                                    </p>

                                                    <p className="mt-2">

                                                        +56 9 1234 5678

                                                    </p>

                                                </div>

                                                <div>

                                                    <p className="text-zinc-500 text-sm">

                                                        Estado

                                                    </p>

                                                    <div className="mt-3 inline-flex bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-xl text-sm">

                                                        Negocio activo

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        {/* RULES */}
                                        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">

                                            <h2 className="text-2xl font-semibold">

                                                Reglas del negocio

                                            </h2>

                                            <div className="mt-8 space-y-5">

                                                {/* CANCELATIONS */}
                                                <div
                                                    className="
                                                        bg-black/30
                                                        border
                                                        border-white/10
                                                        rounded-2xl
                                                        p-6
                                                        flex
                                                        items-start
                                                        justify-between
                                                        gap-6
                                                    "
                                                >

                                                    <div className="flex-1 min-w-0">

                                                        <h3 className="font-semibold text-lg leading-tight">

                                                            Permitir cancelaciones

                                                        </h3>

                                                        <p className="mt-3 text-zinc-400 text-sm leading-relaxed">

                                                            Clientes pueden cancelar reservas.

                                                        </p>

                                                    </div>

                                                    <button
                                                        onClick={() =>
                                                            setSettings({
                                                                ...settings,
                                                                allowCancellations:
                                                                    !settings.allowCancellations,
                                                            })
                                                        }
                                                        className={`
                                                            min-w-[56px]
                                                            w-14
                                                            h-8
                                                            rounded-full
                                                            transition
                                                            relative
                                                            ${
                                                                settings.allowCancellations
                                                                    ? "bg-violet-500"
                                                                    : "bg-zinc-700"
                                                            }
                                                        `}
                                                    >

                                                        <div
                                                            className={`
                                                                absolute
                                                                top-1
                                                                w-6
                                                                h-6
                                                                bg-white
                                                                rounded-full
                                                                transition
                                                                ${
                                                                    settings.allowCancellations
                                                                        ? "right-1"
                                                                        : "left-1"
                                                                }
                                                            `}
                                                        ></div>

                                                    </button>

                                                </div>

                                                {/* AUTO CONFIRM */}
                                                <div
                                                    className="
                                                        bg-black/30
                                                        border
                                                        border-white/10
                                                        rounded-2xl
                                                        p-6
                                                        flex
                                                        items-start
                                                        justify-between
                                                        gap-6
                                                    "
                                                >

                                                    <div className="flex-1 min-w-0">

                                                        <h3 className="font-semibold text-lg leading-tight">

                                                            Confirmación automática

                                                        </h3>

                                                        <p className="mt-3 text-zinc-400 text-sm leading-relaxed">

                                                            Las reservas se aprueban automáticamente.

                                                        </p>

                                                    </div>

                                                    <button
                                                        onClick={() =>
                                                            setSettings({
                                                                ...settings,
                                                                autoConfirmReservations:
                                                                    !settings.autoConfirmReservations,
                                                            })
                                                        }
                                                        className={`
                                                            min-w-[56px]
                                                            w-14
                                                            h-8
                                                            rounded-full
                                                            transition
                                                            relative
                                                            ${
                                                                settings.autoConfirmReservations
                                                                    ? "bg-violet-500"
                                                                    : "bg-zinc-700"
                                                            }
                                                        `}
                                                    >

                                                        <div
                                                            className={`
                                                                absolute
                                                                top-1
                                                                w-6
                                                                h-6
                                                                bg-white
                                                                rounded-full
                                                                transition
                                                                ${
                                                                    settings.autoConfirmReservations
                                                                        ? "right-1"
                                                                        : "left-1"
                                                                }
                                                            `}
                                                        ></div>

                                                    </button>

                                                </div>

                                                {/* PUBLIC */}
                                                <div
                                                    className="
                                                        bg-black/30
                                                        border
                                                        border-white/10
                                                        rounded-2xl
                                                        p-6
                                                        flex
                                                        items-start
                                                        justify-between
                                                        gap-6
                                                    "
                                                >

                                                    <div className="flex-1 min-w-0">

                                                        <h3 className="font-semibold text-lg leading-tight">

                                                            Mostrar negocio públicamente

                                                        </h3>

                                                        <p className="mt-3 text-zinc-400 text-sm leading-relaxed">

                                                            Tu negocio aparecerá en búsquedas.

                                                        </p>

                                                    </div>

                                                    <button
                                                        onClick={() =>
                                                            setSettings({
                                                                ...settings,
                                                                publicBusiness:
                                                                    !settings.publicBusiness,
                                                            })
                                                        }
                                                        className={`
                                                            min-w-[56px]
                                                            w-14
                                                            h-8
                                                            rounded-full
                                                            transition
                                                            relative
                                                            ${
                                                                settings.publicBusiness
                                                                    ? "bg-violet-500"
                                                                    : "bg-zinc-700"
                                                            }
                                                        `}
                                                    >

                                                        <div
                                                            className={`
                                                                absolute
                                                                top-1
                                                                w-6
                                                                h-6
                                                                bg-white
                                                                rounded-full
                                                                transition
                                                                ${
                                                                    settings.publicBusiness
                                                                        ? "right-1"
                                                                        : "left-1"
                                                                }
                                                            `}
                                                        ></div>

                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )}

                        {/* RESERVATIONS */}
                        {activeTab ===
                            "reservations" && (
                                <ReservationsManager />
                            )}

                        {/* SCHEDULE */}
                        {activeTab ===
                            "schedule" && (
                                <ScheduleManager />
                            )}

                        {/* PROFESSIONALS */}
                        {activeTab ===
                            "professionals" && (
                                <ProfessionalsManager />
                            )}

                    </div>

                </main>

            </div>

        </div>
    );
}

export default BusinessDashboard;