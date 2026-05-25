import { useEffect, useState } from "react";

const API_URL = "https://reservapo.onrender.com";

const DEFAULT_SCHEDULE = [
    {
        day_of_week: 1,
        day_label: "Lunes",
        is_open: true,
        open_time: "09:00",
        close_time: "20:00",
    },
    {
        day_of_week: 2,
        day_label: "Martes",
        is_open: true,
        open_time: "09:00",
        close_time: "20:00",
    },
    {
        day_of_week: 3,
        day_label: "Miércoles",
        is_open: true,
        open_time: "09:00",
        close_time: "20:00",
    },
    {
        day_of_week: 4,
        day_label: "Jueves",
        is_open: true,
        open_time: "09:00",
        close_time: "20:00",
    },
    {
        day_of_week: 5,
        day_label: "Viernes",
        is_open: true,
        open_time: "09:00",
        close_time: "20:00",
    },
    {
        day_of_week: 6,
        day_label: "Sábado",
        is_open: true,
        open_time: "10:00",
        close_time: "16:00",
    },
    {
        day_of_week: 0,
        day_label: "Domingo",
        is_open: false,
        open_time: "09:00",
        close_time: "20:00",
    },
];

function ScheduleManager({
    reservations = [],
    settings,
    setSettings,
}) {
    const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const upcomingReservations = reservations.filter(
        (reservation) =>
            String(reservation.status || "").toLowerCase() !== "cancelled" &&
            String(reservation.status || "").toLowerCase() !== "cancelada"
    );

    useEffect(() => {
        const loadSchedule = async () => {
            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                const response = await fetch(`${API_URL}/business/schedule`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "No se pudieron cargar los horarios"
                    );
                }

                if (Array.isArray(data.schedule) && data.schedule.length > 0) {
                    setSchedule(data.schedule);
                } else {
                    setSchedule(DEFAULT_SCHEDULE);
                }
            } catch (error) {
                setError(error.message);
                setSchedule(DEFAULT_SCHEDULE);
            } finally {
                setLoading(false);
            }
        };

        loadSchedule();
    }, []);

    const toggleDay = (index) => {
        const updated = [...schedule];

        updated[index] = {
            ...updated[index],
            is_open: !updated[index].is_open,
        };

        setSchedule(updated);
    };

    const updateTime = (index, field, value) => {
        const updated = [...schedule];

        updated[index] = {
            ...updated[index],
            [field]: value,
        };

        setSchedule(updated);
    };

    const updateSetting = (key, value) => {
        if (!setSettings) {
            return;
        }

        setSettings({
            ...settings,
            [key]: value,
        });
    };

    const saveSchedule = async () => {
        try {
            setSaving(true);
            setMessage("");
            setError("");

            const invalidSchedule = schedule.find((item) => {
                if (!item.is_open) {
                    return false;
                }

                return item.open_time >= item.close_time;
            });

            if (invalidSchedule) {
                throw new Error(
                    `El horario de ${invalidSchedule.day_label} es inválido. La apertura debe ser antes del cierre.`
                );
            }

            const token = localStorage.getItem("token");

            const response = await fetch(`${API_URL}/business/schedule`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    schedule,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "No se pudieron guardar los horarios"
                );
            }

            setMessage("Horarios guardados correctamente en Neon.");

            setTimeout(() => {
                setMessage("");
            }, 3000);
        } catch (error) {
            setError(error.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-5 py-2 rounded-full text-sm">
                            ⏰ Gestión de horarios
                        </div>

                        <h2 className="mt-5 text-3xl font-semibold">
                            Configuración semanal
                        </h2>

                        <p className="mt-3 text-zinc-400 max-w-2xl">
                            Define los horarios reales de atención del negocio.
                            Estos horarios se guardan en Neon y se reflejan
                            automáticamente cuando un cliente intenta reservar.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        {message && (
                            <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-5 py-4 rounded-2xl text-sm">
                                {message}
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-300 px-5 py-4 rounded-2xl text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={saveSchedule}
                            disabled={saving || loading}
                            className="bg-white text-black hover:bg-zinc-200 px-6 py-4 rounded-2xl transition font-medium disabled:opacity-50"
                        >
                            {saving ? "Guardando..." : "Guardar cambios"}
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 text-zinc-400">
                    Cargando horarios...
                </div>
            ) : (
                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl overflow-x-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 min-w-[900px]">
                        {schedule.map((item, index) => (
                            <div
                                key={item.day_of_week}
                                className={
                                    `rounded-[2rem] border p-6 transition-all duration-300 ` +
                                    (item.is_open
                                        ? "bg-violet-500/10 border-violet-500/20"
                                        : "bg-black/30 border-white/10")
                                }
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-xl font-semibold">
                                            {item.day_label}
                                        </h3>

                                        <p className="mt-2 text-zinc-400 text-sm">
                                            {item.is_open
                                                ? "Horario activo"
                                                : "Día cerrado"}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => toggleDay(index)}
                                        className={
                                            `w-14 h-8 rounded-full relative transition-all duration-300 ` +
                                            (item.is_open
                                                ? "bg-violet-500"
                                                : "bg-zinc-700")
                                        }
                                    >
                                        <div
                                            className={
                                                `absolute top-1 w-6 h-6 rounded-full bg-white transition-all duration-300 ` +
                                                (item.is_open
                                                    ? "left-7"
                                                    : "left-1")
                                            }
                                        ></div>
                                    </button>
                                </div>

                                <div className="mt-8 space-y-5">
                                    <div>
                                        <label className="text-zinc-500 text-sm">
                                            Apertura
                                        </label>

                                        <input
                                            type="time"
                                            value={item.open_time}
                                            disabled={!item.is_open}
                                            onChange={(e) =>
                                                updateTime(
                                                    index,
                                                    "open_time",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-2 w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 outline-none disabled:opacity-40"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-zinc-500 text-sm">
                                            Cierre
                                        </label>

                                        <input
                                            type="time"
                                            value={item.close_time}
                                            disabled={!item.is_open}
                                            onChange={(e) =>
                                                updateTime(
                                                    index,
                                                    "close_time",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-2 w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 outline-none disabled:opacity-40"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8">
                                    {item.is_open ? (
                                        <div className="bg-green-500/10 border border-green-500/20 text-green-400 rounded-2xl px-4 py-3 text-sm text-center">
                                            Disponible para reservas
                                        </div>
                                    ) : (
                                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl px-4 py-3 text-sm text-center">
                                            Negocio cerrado
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="grid xl:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
                    <h2 className="text-2xl font-semibold">
                        Configuración de reservas
                    </h2>

                    <p className="mt-3 text-zinc-400">
                        Esta sección aún puede seguir guardándose localmente
                        mientras luego la conectamos a Neon como configuración
                        avanzada del negocio.
                    </p>

                    <div className="mt-8 grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-zinc-400 text-sm">
                                Duración mínima de reserva
                            </label>

                            <select
                                value={
                                    settings?.minimumReservationTime ||
                                    "15 minutos"
                                }
                                onChange={(e) =>
                                    updateSetting(
                                        "minimumReservationTime",
                                        e.target.value
                                    )
                                }
                                className="mt-2 w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-4 outline-none"
                            >
                                <option>15 minutos</option>
                                <option>30 minutos</option>
                                <option>45 minutos</option>
                                <option>60 minutos</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-zinc-400 text-sm">
                                Tiempo de anticipación mínimo
                            </label>

                            <select
                                value={settings?.minimumAdvanceTime || "2 horas"}
                                onChange={(e) =>
                                    updateSetting(
                                        "minimumAdvanceTime",
                                        e.target.value
                                    )
                                }
                                className="mt-2 w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-4 outline-none"
                            >
                                <option>1 hora</option>
                                <option>2 horas</option>
                                <option>4 horas</option>
                                <option>24 horas</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
                    <h2 className="text-2xl font-semibold">
                        Reservas activas próximas
                    </h2>

                    <p className="mt-3 text-zinc-400">
                        Vista rápida para revisar carga de agenda.
                    </p>

                    <div className="mt-8 space-y-4 max-h-[420px] overflow-y-auto pr-2">
                        {upcomingReservations.length === 0 ? (
                            <div className="bg-black/30 border border-white/10 rounded-2xl p-6 text-zinc-400">
                                No hay reservas activas.
                            </div>
                        ) : (
                            upcomingReservations.slice(0, 8).map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-black/30 border border-white/10 rounded-2xl p-5"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <h3 className="font-semibold">
                                                {item.client_name || "Cliente"}
                                            </h3>

                                            <p className="mt-1 text-zinc-400 text-sm">
                                                {item.service}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p>{item.date}</p>

                                            <p className="mt-1 text-violet-300">
                                                {String(item.time || "").slice(
                                                    0,
                                                    5
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScheduleManager;