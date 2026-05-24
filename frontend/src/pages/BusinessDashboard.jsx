import { useEffect, useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import BusinessSidebar from "../components/BusinessSidebar";
import ScheduleManager from "../components/ScheduleManager";
import ReservationsManager from "../components/ReservationsManager";
import ProfessionalsManager from "../components/ProfessionalsManager";
import ServicesManager from "../components/ServicesManager";

import businessSettingsData from "../data/businessSettings";

const API_URL = "https://reservapo.onrender.com";

function BusinessDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");

    const [business, setBusiness] = useState(null);

    const [reservations, setReservations] = useState([]);

    const [professionals, setProfessionals] = useState([]);

    const [services, setServices] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [settings, setSettings] = useState(() => {
        const saved =
            localStorage.getItem(
                "businessSettings"
            );

        return saved
            ? JSON.parse(saved)
            : businessSettingsData;
    });

    useEffect(() => {
        localStorage.setItem(
            "businessSettings",
            JSON.stringify(settings)
        );
    }, [settings]);

    const fetchDashboard =
        async () => {
            try {
                setLoading(true);

                setError("");

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const response =
                    await fetch(
                        `${API_URL}/business/dashboard`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error ||
                            "Error cargando panel del negocio"
                    );
                }

                setBusiness(
                    data.business
                );

                setReservations(
                    data.reservations ||
                        []
                );

                setProfessionals(
                    data.professionals ||
                        []
                );

                setServices(
                    data.services ||
                        []
                );
            } catch (error) {
                setError(
                    error.message
                );
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        const loadDashboard =
            async () => {
                await fetchDashboard();
            };

        loadDashboard();
    }, []);

    const nextReservations =
        useMemo(() => {
            return reservations.slice(
                0,
                3
            );
        }, [reservations]);

    async function updateReservationStatus(
        reservationId,
        status
    ) {
        try {
            const token =
                localStorage.getItem(
                    "token"
                );

            const response =
                await fetch(
                    `${API_URL}/business/reservations/${reservationId}/status`,
                    {
                        method: "PATCH",

                        headers: {
                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${token}`,
                        },

                        body: JSON.stringify(
                            {
                                status,
                            }
                        ),
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                        "No se pudo actualizar la reserva"
                );
            }

            await fetchDashboard();
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden relative isolate">
            <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] bg-violet-600 opacity-20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-600 opacity-20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <Navbar />

            <div className="flex pt-28 min-h-screen">
                <BusinessSidebar
                    activeTab={
                        activeTab
                    }
                    setActiveTab={
                        setActiveTab
                    }
                    business={
                        business
                    }
                />

                <main className="flex-1 px-6 lg:px-10 pb-10">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-5 py-2 rounded-full text-sm">
                                🏪 Panel de negocio
                            </div>

                            <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
                                {business?.name ||
                                    "Administración de tienda"}
                            </h1>

                            <p className="mt-4 text-zinc-400 max-w-2xl leading-relaxed">
                                Gestiona reservas,
                                horarios,
                                clientes,
                                profesionales y
                                servicios desde
                                un solo lugar.
                            </p>
                        </div>

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
                                        "services"
                                    )
                                }
                                className="bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-3 rounded-2xl transition font-medium"
                            >
                                Gestionar
                                servicios
                            </button>
                        </div>
                    </div>

                    {loading && (
                        <div className="mt-10 bg-white/5 border border-white/10 rounded-[2rem] p-8 text-zinc-400">
                            Cargando panel
                            del negocio...
                        </div>
                    )}

                    {error && (
                        <div className="mt-10 bg-red-500/10 border border-red-500/20 text-red-300 rounded-[2rem] p-8">
                            {error}
                        </div>
                    )}

                    {!loading &&
                        !error && (
                            <div className="mt-10">
                                {activeTab ===
                                    "dashboard" && (
                                    <div className="grid xl:grid-cols-[1fr_420px] gap-8 items-start">
                                        <div className="space-y-8 min-w-0">
                                            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
                                                <div className="flex items-center justify-between gap-4 flex-wrap">
                                                    <div>
                                                        <h2 className="text-2xl font-semibold">
                                                            Próximas
                                                            reservas
                                                        </h2>

                                                        <p className="mt-2 text-zinc-400">
                                                            Las
                                                            próximas
                                                            citas
                                                            de tu
                                                            negocio.
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
                                                        Ver
                                                        todas
                                                    </button>
                                                </div>

                                                <div className="mt-8 space-y-4">
                                                    {nextReservations.length ===
                                                    0 ? (
                                                        <div className="bg-black/30 border border-white/10 rounded-2xl p-6 text-zinc-400">
                                                            Aún
                                                            no
                                                            tienes
                                                            reservas
                                                            para
                                                            este
                                                            negocio.
                                                        </div>
                                                    ) : (
                                                        nextReservations.map(
                                                            (
                                                                reservation
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        reservation.id
                                                                    }
                                                                    className="bg-black/30 border border-white/10 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
                                                                >
                                                                    <div>
                                                                        <h3 className="text-lg font-semibold">
                                                                            {reservation.client_name ||
                                                                                "Cliente"}
                                                                        </h3>

                                                                        <p className="mt-2 text-zinc-400">
                                                                            {reservation.service ||
                                                                                "Servicio"}
                                                                        </p>
                                                                    </div>

                                                                    <div className="flex items-center gap-6 flex-wrap">
                                                                        <div>
                                                                            <p className="text-zinc-500 text-sm">
                                                                                Profesional
                                                                            </p>

                                                                            <p className="mt-1">
                                                                                {reservation.professional_name ||
                                                                                    "Sin asignar"}
                                                                            </p>
                                                                        </div>

                                                                        <div>
                                                                            <p className="text-zinc-500 text-sm">
                                                                                Fecha
                                                                            </p>

                                                                            <p className="mt-1">
                                                                                {reservation.date}
                                                                            </p>
                                                                        </div>

                                                                        <div>
                                                                            <p className="text-zinc-500 text-sm">
                                                                                Hora
                                                                            </p>

                                                                            <p className="mt-1">
                                                                                {reservation.time}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
                                                <div className="flex items-center justify-between gap-4 flex-wrap">
                                                    <div>
                                                        <h2 className="text-2xl font-semibold">
                                                            Servicios
                                                            activos
                                                        </h2>

                                                        <p className="mt-2 text-zinc-400">
                                                            Servicios
                                                            disponibles
                                                            para
                                                            reservar.
                                                        </p>
                                                    </div>

                                                    <button
                                                        onClick={() =>
                                                            setActiveTab(
                                                                "services"
                                                            )
                                                        }
                                                        className="bg-white/5 border border-white/10 hover:bg-white/10 px-5 py-3 rounded-2xl transition font-medium"
                                                    >
                                                        Gestionar
                                                    </button>
                                                </div>

                                                <div className="mt-8 space-y-4">
                                                    {services.length ===
                                                    0 ? (
                                                        <div className="bg-black/30 border border-white/10 rounded-2xl p-6 text-zinc-400">
                                                            Aún
                                                            no
                                                            tienes
                                                            servicios
                                                            creados.
                                                        </div>
                                                    ) : (
                                                        services
                                                            .slice(
                                                                0,
                                                                3
                                                            )
                                                            .map(
                                                                (
                                                                    service
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            service.id
                                                                        }
                                                                        className="bg-black/30 border border-white/10 rounded-2xl p-5 flex items-center justify-between gap-5"
                                                                    >
                                                                        <div>
                                                                            <h3 className="font-semibold">
                                                                                {service.name}
                                                                            </h3>

                                                                            <p className="mt-2 text-zinc-400 text-sm">
                                                                                {service.category ||
                                                                                    "Sin categoría"}
                                                                            </p>
                                                                        </div>

                                                                        <div className="text-right">
                                                                            <p className="font-semibold">
                                                                                $
                                                                                {Number(
                                                                                    service.price ||
                                                                                        0
                                                                                ).toLocaleString(
                                                                                    "es-CL"
                                                                                )}
                                                                            </p>

                                                                            <p className="mt-1 text-zinc-500 text-sm">
                                                                                {
                                                                                    service.duration_minutes
                                                                                }{" "}
                                                                                min
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-8 min-w-0">
                                            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
                                                <h2 className="text-2xl font-semibold">
                                                    Información
                                                    del negocio
                                                </h2>

                                                <div className="mt-8 space-y-6">
                                                    <div>
                                                        <p className="text-zinc-500 text-sm">
                                                            Nombre
                                                        </p>

                                                        <p className="mt-2">
                                                            {business?.name ||
                                                                "Sin nombre"}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="text-zinc-500 text-sm">
                                                            Ciudad
                                                        </p>

                                                        <p className="mt-2">
                                                            {business?.city ||
                                                                "Sin ciudad"}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="text-zinc-500 text-sm">
                                                            Categoría
                                                        </p>

                                                        <p className="mt-2">
                                                            {business?.category ||
                                                                "Sin categoría"}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="text-zinc-500 text-sm">
                                                            Profesionales
                                                        </p>

                                                        <p className="mt-2">
                                                            {
                                                                professionals.length
                                                            }
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="text-zinc-500 text-sm">
                                                            Servicios
                                                        </p>

                                                        <p className="mt-2">
                                                            {
                                                                services.length
                                                            }
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="text-zinc-500 text-sm">
                                                            Estado
                                                        </p>

                                                        <div className="mt-3 inline-flex bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-xl text-sm">
                                                            Negocio
                                                            activo
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab ===
                                    "reservations" && (
                                    <ReservationsManager
                                        business={
                                            business
                                        }
                                        reservations={
                                            reservations
                                        }
                                        professionals={
                                            professionals
                                        }
                                        refreshDashboard={
                                            fetchDashboard
                                        }
                                        updateReservationStatus={
                                            updateReservationStatus
                                        }
                                    />
                                )}

                                {activeTab ===
                                    "schedule" && (
                                    <ScheduleManager
                                        business={
                                            business
                                        }
                                        reservations={
                                            reservations
                                        }
                                        settings={
                                            settings
                                        }
                                        setSettings={
                                            setSettings
                                        }
                                    />
                                )}

                                {activeTab ===
                                    "professionals" && (
                                    <ProfessionalsManager
                                        business={
                                            business
                                        }
                                        professionals={
                                            professionals
                                        }
                                        refreshDashboard={
                                            fetchDashboard
                                        }
                                    />
                                )}

                                {activeTab ===
                                    "services" && (
                                    <ServicesManager
                                        services={
                                            services
                                        }
                                        refreshDashboard={
                                            fetchDashboard
                                        }
                                    />
                                )}
                            </div>
                        )}
                </main>
            </div>
        </div>
    );
}

export default BusinessDashboard;