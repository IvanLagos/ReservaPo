import { useMemo, useState } from "react";
import businessReservations from "../data/businessReservations";

function ReservationsManager() {

    const [statusFilter, setStatusFilter] = useState("Todos");

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [reservations, setReservations] = useState(() => {

        const manualReservations = JSON.parse(
            localStorage.getItem("manualReservations")
        ) || [];

        return [
            ...manualReservations,
            ...businessReservations,
        ];

    });

    const [newReservation, setNewReservation] = useState({
        client: "",
        phone: "",
        service: "",
        professional: "",
        date: "",
        time: "",
    });

    // FILTER
    const filteredReservations = useMemo(() => {

        return reservations.filter((reservation) => {

            const matchesStatus =
                statusFilter === "Todos" ||
                reservation.status === statusFilter;

            const searchLower = search.toLowerCase();

            const matchesSearch =
                reservation.client.name
                    .toLowerCase()
                    .includes(searchLower) ||

                reservation.service.name
                    .toLowerCase()
                    .includes(searchLower) ||

                reservation.professional
                    .toLowerCase()
                    .includes(searchLower);

            return matchesStatus && matchesSearch;

        });

    }, [reservations, statusFilter, search]);

    // UPDATE STATUS
    const updateStatus = (id, newStatus) => {

        const updated = reservations.map((reservation) => {

            if (reservation.id === id) {

                return {
                    ...reservation,
                    status: newStatus,
                };

            }

            return reservation;

        });

        setReservations(updated);

        const manualOnly = updated.filter(
            (reservation) => reservation.id > 1000
        );

        localStorage.setItem(
            "manualReservations",
            JSON.stringify(manualOnly)
        );

    };

    // DELETE
    const deleteReservation = (id) => {

        const confirmDelete = window.confirm(
            "¿Seguro que deseas eliminar esta reserva?"
        );

        if (!confirmDelete) return;

        const updated = reservations.filter(
            (reservation) => reservation.id !== id
        );

        setReservations(updated);

        const manualOnly = updated.filter(
            (reservation) => reservation.id > 1000
        );

        localStorage.setItem(
            "manualReservations",
            JSON.stringify(manualOnly)
        );

    };

    // CREATE RESERVATION
    const createReservation = () => {

        if (
            !newReservation.client ||
            !newReservation.phone ||
            !newReservation.service ||
            !newReservation.professional ||
            !newReservation.date ||
            !newReservation.time
        ) {

            alert("Completa todos los campos.");

            return;

        }

        const reservation = {

            id: Date.now(),

            businessId: 1,

            businessName: "Mi Negocio",

            client: {
                name: newReservation.client,
                phone: newReservation.phone,
                email: "manual@reservation.com",
            },

            professional: newReservation.professional,

            service: {
                name: newReservation.service,
                duration: 60,
                price: "$0",
            },

            reservationDate: newReservation.date,

            reservationTime: newReservation.time,

            status: "Confirmada",

            paymentStatus: "Pendiente",

            notes: "Reserva manual",

            createdAt: new Date().toISOString(),

        };

        const updatedReservations = [
            reservation,
            ...reservations,
        ];

        setReservations(updatedReservations);

        const manualOnly = updatedReservations.filter(
            (reservation) => reservation.id > 1000
        );

        localStorage.setItem(
            "manualReservations",
            JSON.stringify(manualOnly)
        );

        setShowModal(false);

        setNewReservation({
            client: "",
            phone: "",
            service: "",
            professional: "",
            date: "",
            time: "",
        });

    };

    // STATUS STYLES
    const getStatusStyles = (status) => {

        switch (status) {

            case "Confirmada":
                return `
                    bg-green-500/10
                    border
                    border-green-500/20
                    text-green-400
                `;

            case "Pendiente":
                return `
                    bg-yellow-500/10
                    border
                    border-yellow-500/20
                    text-yellow-400
                `;

            case "Cancelada":
                return `
                    bg-red-500/10
                    border
                    border-red-500/20
                    text-red-400
                `;

            default:
                return `
                    bg-white/5
                    border
                    border-white/10
                    text-white
                `;
        }

    };

    return (
        <div className="space-y-8">

            {/* HEADER */}
            <div
                className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-[2rem]
                    p-8
                    backdrop-blur-xl
                "
            >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    <div>

                        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-5 py-2 rounded-full text-sm">

                            📅 Gestión de reservas

                        </div>

                        <h2 className="mt-5 text-3xl font-semibold">

                            Reservas del negocio

                        </h2>

                        <p className="mt-3 text-zinc-400 max-w-2xl">

                            Administra reservas, confirma clientes y crea
                            reservas manuales.

                        </p>

                    </div>

                    <div className="flex flex-wrap gap-4">

                        <a
                            href="/export-reservations"
                            className="
                                bg-white
                                text-black
                                hover:bg-zinc-200
                                px-6
                                py-4
                                rounded-2xl
                                transition
                                font-medium
                                inline-flex
                                items-center
                                justify-center
                            "
                        >

                            Exportar reservas

                        </a>

                        <button
                            onClick={() => setShowModal(true)}
                            className="
                                bg-violet-500
                                hover:bg-violet-400
                                text-white
                                px-6
                                py-4
                                rounded-2xl
                                transition
                                font-medium
                            "
                        >

                            + Nueva reserva

                        </button>

                    </div>

                </div>

            </div>

            {/* FILTERS */}
            <div
                className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-[2rem]
                    p-6
                    backdrop-blur-xl
                "
            >

                <div className="flex flex-col xl:flex-row gap-5">

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar cliente, servicio o profesional..."
                        className="
                            flex-1
                            bg-black/30
                            border
                            border-white/10
                            rounded-2xl
                            px-5
                            py-4
                            outline-none
                            placeholder:text-zinc-500
                        "
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="
                            bg-black/30
                            border
                            border-white/10
                            rounded-2xl
                            px-5
                            py-4
                            outline-none
                            min-w-[220px]
                        "
                    >

                        <option>Todos</option>
                        <option>Confirmada</option>
                        <option>Pendiente</option>
                        <option>Cancelada</option>

                    </select>

                </div>

            </div>

            {/* TABLE */}
            <div
                className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-[2rem]
                    backdrop-blur-xl
                    overflow-hidden
                "
            >

                {/* TABLE HEADER */}
                <div
                    className="
                        hidden
                        xl:grid
                        grid-cols-7
                        gap-4
                        px-8
                        py-6
                        border-b
                        border-white/10
                        text-zinc-500
                        text-sm
                    "
                >

                    <div>Cliente</div>
                    <div>Teléfono</div>
                    <div>Servicio</div>
                    <div>Profesional</div>
                    <div>Fecha</div>
                    <div>Estado</div>
                    <div>Acciones</div>

                </div>

                {/* ROWS */}
                <div>

                    {filteredReservations.map((reservation) => (

                        <div
                            key={reservation.id}
                            className="
                                grid
                                xl:grid-cols-7
                                gap-6
                                px-8
                                py-8
                                border-b
                                border-white/5
                                items-center
                                hover:bg-white/[0.03]
                                transition
                            "
                        >

                            <div>

                                <h3 className="font-semibold">

                                    {reservation.client.name}

                                </h3>

                            </div>

                            <div className="text-zinc-400">

                                {reservation.client.phone}

                            </div>

                            <div>

                                {reservation.service.name}

                            </div>

                            <div className="text-zinc-400">

                                {reservation.professional}

                            </div>

                            <div>

                                <div>

                                    {reservation.reservationDate}

                                </div>

                                <div className="mt-1 text-zinc-500 text-sm">

                                    {reservation.reservationTime}

                                </div>

                            </div>

                            <div>

                                <div
                                    className={
                                        `
                                            inline-flex
                                            px-4
                                            py-2
                                            rounded-xl
                                            text-sm
                                        ` +
                                        getStatusStyles(
                                            reservation.status
                                        )
                                    }
                                >

                                    {reservation.status}

                                </div>

                            </div>

                            <div className="flex flex-wrap gap-3">

                                {reservation.status !== "Confirmada" && (

                                    <button
                                        onClick={() =>
                                            updateStatus(
                                                reservation.id,
                                                "Confirmada"
                                            )
                                        }
                                        className="
                                            bg-green-500/10
                                            border
                                            border-green-500/20
                                            text-green-400
                                            hover:bg-green-500/20
                                            px-4
                                            py-2
                                            rounded-xl
                                            transition
                                            text-sm
                                        "
                                    >

                                        Confirmar

                                    </button>

                                )}

                                {reservation.status !== "Cancelada" && (

                                    <button
                                        onClick={() =>
                                            updateStatus(
                                                reservation.id,
                                                "Cancelada"
                                            )
                                        }
                                        className="
                                            bg-yellow-500/10
                                            border
                                            border-yellow-500/20
                                            text-yellow-400
                                            hover:bg-yellow-500/20
                                            px-4
                                            py-2
                                            rounded-xl
                                            transition
                                            text-sm
                                        "
                                    >

                                        Cancelar

                                    </button>

                                )}

                                <button
                                    onClick={() =>
                                        deleteReservation(
                                            reservation.id
                                        )
                                    }
                                    className="
                                        bg-red-500/10
                                        border
                                        border-red-500/20
                                        text-red-400
                                        hover:bg-red-500/20
                                        px-4
                                        py-2
                                        rounded-xl
                                        transition
                                        text-sm
                                    "
                                >

                                    Eliminar

                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

            {/* MODAL */}
            {showModal && (

                <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-md flex items-center justify-center px-6">

                    <div className="w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-[2rem] p-8">

                        <div className="flex items-center justify-between gap-4">

                            <div>

                                <h2 className="text-3xl font-semibold">

                                    Nueva reserva

                                </h2>

                                <p className="mt-2 text-zinc-400">

                                    Crea una reserva manualmente.

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
                                placeholder="Nombre cliente"
                                value={newReservation.client}
                                onChange={(e) =>
                                    setNewReservation({
                                        ...newReservation,
                                        client: e.target.value,
                                    })
                                }
                                className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                            />

                            <input
                                type="text"
                                placeholder="Teléfono"
                                value={newReservation.phone}
                                onChange={(e) =>
                                    setNewReservation({
                                        ...newReservation,
                                        phone: e.target.value,
                                    })
                                }
                                className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                            />

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

                            <input
                                type="text"
                                placeholder="Profesional"
                                value={newReservation.professional}
                                onChange={(e) =>
                                    setNewReservation({
                                        ...newReservation,
                                        professional: e.target.value,
                                    })
                                }
                                className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                            />

                            <input
                                type="date"
                                value={newReservation.date}
                                onChange={(e) =>
                                    setNewReservation({
                                        ...newReservation,
                                        date: e.target.value,
                                    })
                                }
                                className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                            />

                            <input
                                type="time"
                                value={newReservation.time}
                                onChange={(e) =>
                                    setNewReservation({
                                        ...newReservation,
                                        time: e.target.value,
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
                                className="bg-violet-500 hover:bg-violet-400 px-8 py-4 rounded-2xl transition font-medium"
                            >

                                Crear reserva

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default ReservationsManager;