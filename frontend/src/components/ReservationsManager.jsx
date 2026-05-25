import { useMemo, useState } from "react";

const API_URL = "https://reservapo.onrender.com";

function ReservationsManager({
    business,
    reservations = [],
    professionals = [],
    refreshDashboard,
    updateReservationStatus,
}) {
    const [statusFilter, setStatusFilter] = useState("Todos");
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [creatingReservation, setCreatingReservation] = useState(false);
    const [loadingReservationId, setLoadingReservationId] = useState(null);

    const [newReservation, setNewReservation] = useState({
        service: "",
        professional_id: "",
        reservation_date: "",
        reservation_time: "",
    });

    const token = localStorage.getItem("token");

    const normalizeStatus = (status) => {
        const value = String(status || "").toLowerCase();

        if (value === "confirmed" || value === "confirmada") {
            return "Confirmada";
        }

        if (value === "cancelled" || value === "cancelada") {
            return "Cancelada";
        }

        return "Pendiente";
    };

    const filteredReservations = useMemo(() => {
        return reservations.filter((reservation) => {
            const normalized = normalizeStatus(reservation.status);

            const matchesStatus =
                statusFilter === "Todos" || normalized === statusFilter;

            const searchLower = search.toLowerCase();

            const matchesSearch =
                reservation.client_name?.toLowerCase().includes(searchLower) ||
                reservation.service?.toLowerCase().includes(searchLower) ||
                reservation.professional_name?.toLowerCase().includes(searchLower);

            return matchesStatus && matchesSearch;
        });
    }, [reservations, statusFilter, search]);

    const getStatusStyles = (status) => {
        switch (normalizeStatus(status)) {
            case "Confirmada":
                return "bg-green-500/10 border border-green-500/20 text-green-400";

            case "Pendiente":
                return "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400";

            case "Cancelada":
                return "bg-red-500/10 border border-red-500/20 text-red-400";

            default:
                return "bg-white/5 border border-white/10 text-white";
        }
    };

    async function handleStatusUpdate(reservationId, status) {
        try {
            if (status === "cancelled") {
                const confirmed = window.confirm(
                    "¿Seguro que deseas cancelar esta reserva?"
                );

                if (!confirmed) return;
            }

            setLoadingReservationId(reservationId);

            await updateReservationStatus(reservationId, status);
            await refreshDashboard();
        } catch (error) {
            alert(error.message);
        } finally {
            setLoadingReservationId(null);
        }
    }

    async function createReservation() {
        try {
            setCreatingReservation(true);

            if (!business?.id) {
                alert("No se encontró el negocio asociado.");
                return;
            }

            if (
                !newReservation.service ||
                !newReservation.professional_id ||
                !newReservation.reservation_date ||
                !newReservation.reservation_time
            ) {
                alert("Completa todos los campos.");
                return;
            }

            const response = await fetch(`${API_URL}/reservations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    business_id: business.id,
                    professional_id: Number(newReservation.professional_id),
                    service: newReservation.service,
                    reservation_date: newReservation.reservation_date,
                    reservation_time: newReservation.reservation_time,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Error creando reserva");
            }

            setShowModal(false);

            setNewReservation({
                service: "",
                professional_id: "",
                reservation_date: "",
                reservation_time: "",
            });

            await refreshDashboard();
        } catch (error) {
            alert(error.message);
        } finally {
            setCreatingReservation(false);
        }
    }

    return (
        <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-5 py-2 rounded-full text-sm">
                            📅 Gestión de reservas
                        </div>

                        <h2 className="mt-5 text-3xl font-semibold">
                            Reservas del negocio
                        </h2>

                        <p className="mt-3 text-zinc-400 max-w-2xl">
                            Acepta, cancela y administra las reservas reales de tus clientes.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-violet-500 hover:bg-violet-400 text-white px-6 py-4 rounded-2xl transition font-medium"
                    >
                        + Nueva reserva
                    </button>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl">
                <div className="flex flex-col xl:flex-row gap-5">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar cliente, servicio o profesional..."
                        className="flex-1 bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none placeholder:text-zinc-500"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none min-w-[220px]"
                    >
                        <option>Todos</option>
                        <option>Confirmada</option>
                        <option>Pendiente</option>
                        <option>Cancelada</option>
                    </select>
                </div>
            </div>

            <div className="space-y-5">
                {filteredReservations.length === 0 ? (
                    <div className="bg-white/5 border border-white/10 rounded-[2rem] p-10 text-zinc-400">
                        No se encontraron reservas.
                    </div>
                ) : (
                    filteredReservations.map((reservation) => {
                        const status = normalizeStatus(reservation.status);
                        const isLoading = loadingReservationId === reservation.id;

                        return (
                            <div
                                key={reservation.id}
                                className="bg-white/5 border border-white/10 rounded-[2rem] p-7 backdrop-blur-xl"
                            >
                                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
                                    <div className="space-y-3">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h3 className="text-2xl font-semibold">
                                                {reservation.client_name || "Cliente"}
                                            </h3>

                                            <div
                                                className={`inline-flex px-4 py-2 rounded-xl text-sm ${getStatusStyles(
                                                    reservation.status
                                                )}`}
                                            >
                                                {status}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-6 text-zinc-400">
                                            <div>💈 {reservation.service || "Servicio"}</div>

                                            <div>
                                                👤{" "}
                                                {reservation.professional_name ||
                                                    "Sin profesional"}
                                            </div>

                                            <div>
                                                📅{" "}
                                                {new Date(reservation.date).toLocaleDateString("es-CL", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                })}
                                            </div>

                                            <div>
                                                🕒{" "}
                                                {String(reservation.time || "").slice(0, 5)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {status === "Pendiente" && (
                                            <button
                                                disabled={isLoading}
                                                onClick={() =>
                                                    handleStatusUpdate(
                                                        reservation.id,
                                                        "confirmed"
                                                    )
                                                }
                                                className="bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-2xl transition font-medium disabled:opacity-50"
                                            >
                                                {isLoading
                                                    ? "Aceptando..."
                                                    : "Aceptar reserva"}
                                            </button>
                                        )}

                                        {status !== "Cancelada" && (
                                            <button
                                                disabled={isLoading}
                                                onClick={() =>
                                                    handleStatusUpdate(
                                                        reservation.id,
                                                        "cancelled"
                                                    )
                                                }
                                                className="bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 px-6 py-3 rounded-2xl transition font-medium disabled:opacity-50"
                                            >
                                                {isLoading ? "Cancelando..." : "Cancelar"}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-md flex items-center justify-center px-6">
                    <div className="w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-[2rem] p-8">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-3xl font-semibold">
                                    Nueva reserva
                                </h2>

                                <p className="mt-2 text-zinc-400">
                                    Crea una reserva manual conectada a Neon.
                                </p>
                            </div>

                            <button
                                onClick={() => setShowModal(false)}
                                className="text-zinc-400 hover:text-white text-3xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="mt-10 grid md:grid-cols-2 gap-5">
                            <input
                                type="text"
                                placeholder="Servicio"
                                value={newReservation.service}
                                onChange={(e) =>
                                    setNewReservation({
                                        ...newReservation,
                                        service: e.target.value,
                                    })
                                }
                                className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                            />

                            <select
                                value={newReservation.professional_id}
                                onChange={(e) =>
                                    setNewReservation({
                                        ...newReservation,
                                        professional_id: e.target.value,
                                    })
                                }
                                className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                            >
                                <option value="">Selecciona profesional</option>

                                {professionals.map((professional) => (
                                    <option
                                        key={professional.id}
                                        value={professional.id}
                                    >
                                        {professional.name}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="date"
                                value={newReservation.reservation_date}
                                onChange={(e) =>
                                    setNewReservation({
                                        ...newReservation,
                                        reservation_date: e.target.value,
                                    })
                                }
                                className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                            />

                            <input
                                type="time"
                                value={newReservation.reservation_time}
                                onChange={(e) =>
                                    setNewReservation({
                                        ...newReservation,
                                        reservation_time: e.target.value,
                                    })
                                }
                                className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                            />
                        </div>

                        <div className="mt-10 flex justify-end gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-4 rounded-2xl transition"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={createReservation}
                                disabled={creatingReservation}
                                className="bg-violet-500 hover:bg-violet-400 px-8 py-4 rounded-2xl transition font-medium disabled:opacity-50"
                            >
                                {creatingReservation ? "Creando..." : "Crear reserva"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReservationsManager;