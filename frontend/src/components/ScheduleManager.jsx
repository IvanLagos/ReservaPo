import { useState } from "react";

function ScheduleManager({
    business,
    reservations = [],
    settings,
    setSettings,
}) {
    const [schedule, setSchedule] = useState([
        {
            day: "Lunes",
            enabled: true,
            start: "09:00",
            end: "20:00",
        },
        {
            day: "Martes",
            enabled: true,
            start: "09:00",
            end: "20:00",
        },
        {
            day: "Miércoles",
            enabled: true,
            start: "09:00",
            end: "20:00",
        },
        {
            day: "Jueves",
            enabled: true,
            start: "09:00",
            end: "20:00",
        },
        {
            day: "Viernes",
            enabled: true,
            start: "09:00",
            end: "20:00",
        },
        {
            day: "Sábado",
            enabled: true,
            start: "10:00",
            end: "16:00",
        },
        {
            day: "Domingo",
            enabled: false,
            start: "09:00",
            end: "20:00",
        },
    ]);

    const [savedMessage, setSavedMessage] = useState("");

    const upcomingReservations = reservations.filter(
        (reservation) =>
            String(reservation.status || "").toLowerCase() !== "cancelled"
    );

    function toggleDay(index) {
        const updated = [...schedule];

        updated[index] = {
            ...updated[index],
            enabled: !updated[index].enabled,
        };

        setSchedule(updated);
    }

    function updateTime(index, field, value) {
        const updated = [...schedule];

        updated[index] = {
            ...updated[index],
            [field]: value,
        };

        setSchedule(updated);
    }

    function updateSetting(key, value) {
        setSettings({
            ...settings,
            [key]: value,
        });
    }

    function saveSchedule() {
        localStorage.setItem(
            `businessSchedule-${business?.id || "default"}`,
            JSON.stringify(schedule)
        );

        setSavedMessage("Horarios guardados localmente.");

        setTimeout(() => {
            setSavedMessage("");
        }, 2500);
    }

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
                            Define los horarios visibles del negocio. Por ahora
                            quedan guardados localmente hasta crear la tabla
                            real de horarios en Neon.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        {savedMessage && (
                            <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-5 py-4 rounded-2xl text-sm">
                                {savedMessage}
                            </div>
                        )}

                        <button
                            onClick={saveSchedule}
                            className="bg-white text-black hover:bg-zinc-200 px-6 py-4 rounded-2xl transition font-medium"
                        >
                            Guardar cambios
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl overflow-x-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 min-w-[900px]">
                    {schedule.map((item, index) => (
                        <div
                            key={item.day}
                            className={
                                `rounded-[2rem] border p-6 transition-all duration-300 ` +
                                (item.enabled
                                    ? "bg-violet-500/10 border-violet-500/20"
                                    : "bg-black/30 border-white/10")
                            }
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-xl font-semibold">
                                        {item.day}
                                    </h3>

                                    <p className="mt-2 text-zinc-400 text-sm">
                                        {item.enabled
                                            ? "Horario activo"
                                            : "Día cerrado"}
                                    </p>
                                </div>

                                <button
                                    onClick={() => toggleDay(index)}
                                    className={
                                        `w-14 h-8 rounded-full relative transition-all duration-300 ` +
                                        (item.enabled
                                            ? "bg-violet-500"
                                            : "bg-zinc-700")
                                    }
                                >
                                    <div
                                        className={
                                            `absolute top-1 w-6 h-6 rounded-full bg-white transition-all duration-300 ` +
                                            (item.enabled
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
                                        value={item.start}
                                        disabled={!item.enabled}
                                        onChange={(e) =>
                                            updateTime(
                                                index,
                                                "start",
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
                                        value={item.end}
                                        disabled={!item.enabled}
                                        onChange={(e) =>
                                            updateTime(
                                                index,
                                                "end",
                                                e.target.value
                                            )
                                        }
                                        className="mt-2 w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 outline-none disabled:opacity-40"
                                    />
                                </div>
                            </div>

                            <div className="mt-8">
                                {item.enabled ? (
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

            <div className="grid xl:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
                    <h2 className="text-2xl font-semibold">
                        Configuración de reservas
                    </h2>

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
                                value={
                                    settings?.minimumAdvanceTime || "1 hora"
                                }
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