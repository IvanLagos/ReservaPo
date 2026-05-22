import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import businessReservations from "../data/businessReservations";

function ExportReservations() {

    const [statusFilter, setStatusFilter] = useState("Todos");

    const [search, setSearch] = useState("");

    const filteredReservations = useMemo(() => {

        return businessReservations.filter((reservation) => {

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

    }, [statusFilter, search]);

    const exportCSV = () => {

        const headers = [
            "Cliente",
            "Teléfono",
            "Email",
            "Servicio",
            "Profesional",
            "Fecha",
            "Hora",
            "Estado",
            "Pago",
            "Precio",
        ];

        const rows = filteredReservations.map((reservation) => [
            reservation.client.name,
            reservation.client.phone,
            reservation.client.email,
            reservation.service.name,
            reservation.professional,
            reservation.reservationDate,
            reservation.reservationTime,
            reservation.status,
            reservation.paymentStatus,
            reservation.service.price,
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map((row) => row.join(",")),
        ].join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.setAttribute(
            "download",
            "reservas-exportadas.csv"
        );

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

    };

    const getStatusStyles = (status) => {

        switch (status) {

            case "Confirmada":
                return `
                    bg-green-500/10
                    border-green-500/20
                    text-green-400
                `;

            case "Pendiente":
                return `
                    bg-yellow-500/10
                    border-yellow-500/20
                    text-yellow-400
                `;

            case "Cancelada":
                return `
                    bg-red-500/10
                    border-red-500/20
                    text-red-400
                `;

            default:
                return `
                    bg-white/5
                    border-white/10
                    text-white
                `;
        }

    };

    const getPaymentStyles = (status) => {

        switch (status) {

            case "Pagado":
                return `
                    bg-green-500/10
                    border-green-500/20
                    text-green-400
                `;

            case "Pendiente":
                return `
                    bg-yellow-500/10
                    border-yellow-500/20
                    text-yellow-400
                `;

            case "Reembolsado":
                return `
                    bg-red-500/10
                    border-red-500/20
                    text-red-400
                `;

            default:
                return `
                    bg-white/5
                    border-white/10
                    text-white
                `;
        }

    };

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden relative isolate">

            {/* GLOWS */}
            <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] bg-violet-600 opacity-20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-600 opacity-20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <Navbar />

            <section className="pt-32 px-6 pb-20">

                <div className="max-w-7xl mx-auto">

                    {/* HEADER */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                        <div>

                            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-5 py-2 rounded-full text-sm">

                                📤 Exportación de reservas

                            </div>

                            <h1 className="mt-6 text-5xl font-semibold tracking-tight">

                                Exportar reservas

                            </h1>

                            <p className="mt-4 text-zinc-400 max-w-2xl leading-relaxed">

                                Descarga reservas filtradas en formato CSV para
                                análisis, respaldo o administración.

                            </p>

                        </div>

                        <button
                            onClick={exportCSV}
                            className="bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-2xl transition font-medium"
                        >

                            Descargar CSV

                        </button>

                    </div>

                    {/* FILTERS */}
                    <div className="mt-10 bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl">

                        <div className="flex flex-col lg:flex-row gap-5">

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar reservas..."
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

                    {/* TABLE */}
                    <div className="mt-10 bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-xl">

                        {/* TABLE HEADER */}
                        <div className="hidden xl:grid grid-cols-6 gap-4 px-8 py-6 border-b border-white/10 text-zinc-500 text-sm">

                            <div>Cliente</div>
                            <div>Servicio</div>
                            <div>Profesional</div>
                            <div>Fecha</div>
                            <div>Estado</div>
                            <div>Pago</div>

                        </div>

                        {/* ROWS */}
                        <div>

                            {filteredReservations.map((reservation) => (

                                <div
                                    key={reservation.id}
                                    className="grid xl:grid-cols-6 gap-6 px-8 py-8 border-b border-white/5 items-center hover:bg-white/[0.03] transition"
                                >

                                    {/* CLIENT */}
                                    <div>

                                        <h3 className="font-semibold">

                                            {reservation.client.name}

                                        </h3>

                                        <p className="mt-2 text-zinc-500 text-sm">

                                            {reservation.client.phone}

                                        </p>

                                    </div>

                                    {/* SERVICE */}
                                    <div>

                                        {reservation.service.name}

                                    </div>

                                    {/* PROFESSIONAL */}
                                    <div className="text-zinc-400">

                                        {reservation.professional}

                                    </div>

                                    {/* DATE */}
                                    <div>

                                        <div>

                                            {reservation.reservationDate}

                                        </div>

                                        <div className="mt-1 text-zinc-500 text-sm">

                                            {reservation.reservationTime}

                                        </div>

                                    </div>

                                    {/* STATUS */}
                                    <div>

                                        <div
                                            className={
                                                `
                                                    inline-flex
                                                    px-4
                                                    py-2
                                                    rounded-xl
                                                    text-sm
                                                    border
                                                ` +
                                                getStatusStyles(
                                                    reservation.status
                                                )
                                            }
                                        >

                                            {reservation.status}

                                        </div>

                                    </div>

                                    {/* PAYMENT */}
                                    <div>

                                        <div
                                            className={
                                                `
                                                    inline-flex
                                                    px-4
                                                    py-2
                                                    rounded-xl
                                                    text-sm
                                                    border
                                                ` +
                                                getPaymentStyles(
                                                    reservation.paymentStatus
                                                )
                                            }
                                        >

                                            {reservation.paymentStatus}

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default ExportReservations;