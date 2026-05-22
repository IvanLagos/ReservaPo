import { useState } from "react";
import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import businesses from "../data/businesses";

import schedules from "../data/schedules";

import {
    canCreateReservation,
} from "../utils/businessRules";

function Booking() {

    const navigate = useNavigate();

    const { businessId, serviceIndex } =
        useParams();

    const business = businesses.find(
        (b) => b.id === Number(businessId)
    );

    const service =
        business?.services[Number(serviceIndex)];

    const [selectedProfessional, setSelectedProfessional] =
        useState("Sofía");

    const [selectedDate, setSelectedDate] =
        useState("2026-05-03");

    const [selectedHour, setSelectedHour] =
        useState("09:00");

    const [errorMessage, setErrorMessage] =
        useState("");

    const [successMessage, setSuccessMessage] =
        useState("");

    if (!business || !service) {

        return (
            <div className="bg-black min-h-screen flex items-center justify-center text-white">

                Reserva no encontrada.

            </div>
        );
    }

    // PROFESSIONALS
    const professionals = [
        "Sofía",
        "Daniel",
        "Camila",
    ];

    // DATES
    const dates = [
        "2026-05-03",
        "2026-05-04",
        "2026-05-05",
        "2026-05-06",
    ];

    // HOURS
    const hours = [
        "08:00",
        "08:45",
        "09:30",
        "10:15",
        "11:00",
        "11:45",
        "12:30",
        "13:15",
        "14:00",
        "14:45",
        "15:30",
        "16:15",
        "17:00",
        "17:45",
        "18:30",
        "19:15",
    ];

    // GET DAY NAME
    const getDayName = (dateString) => {

        const date =
            new Date(dateString);

        const days = [
            "Domingo",
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sábado",
        ];

        return days[date.getDay()];

    };

    // HANDLE RESERVATION
    const handleReservation = () => {

        const existingReservations =
            JSON.parse(
                localStorage.getItem(
                    "reservations"
                )
            ) || [];

        const selectedDay =
            getDayName(selectedDate);

        // VALIDATE BUSINESS RULES
        const validation =
            canCreateReservation({
                reservations:
                    existingReservations,

                schedule:
                    schedules,

                professional:
                    selectedProfessional,

                date:
                    selectedDate,

                day:
                    selectedDay,

                time:
                    selectedHour,
            });

        // ERROR
        if (!validation.success) {

            setErrorMessage(
                validation.message
            );

            setTimeout(() => {

                setErrorMessage("");

            }, 4000);

            return;

        }

        // CREATE RESERVATION
        const reservation = {
            id: Date.now(),

            business:
                business.name,

            service:
                service.name,

            professional:
                selectedProfessional,

            date:
                selectedDate,

            time:
                selectedHour,

            image:
                business.image,

            price:
                service.price,

            status:
                "Pendiente",

            paymentStatus:
                "Pendiente",
        };

        localStorage.setItem(
            "reservations",
            JSON.stringify([
                ...existingReservations,
                reservation,
            ])
        );

        setSuccessMessage(
            "Reserva realizada correctamente ✨"
        );

        setTimeout(() => {

            navigate("/my-reservations");

        }, 1500);

    };

    // FILTER AVAILABLE HOURS
    const availableHours =
        hours.filter((hour) => {

            const existingReservations =
                JSON.parse(
                    localStorage.getItem(
                        "reservations"
                    )
                ) || [];

            const validation =
                canCreateReservation({
                    reservations:
                        existingReservations,

                    schedule:
                        schedules,

                    professional:
                        selectedProfessional,

                    date:
                        selectedDate,

                    day:
                        getDayName(
                            selectedDate
                        ),

                    time:
                        hour,
                });

            return validation.success;

        });

    return (
        <div className="bg-black min-h-screen text-white overflow-hidden relative isolate">

            {/* ERROR MESSAGE */}
            {errorMessage && (

                <div
                    className="
                        fixed
                        bottom-6
                        right-6
                        z-[9999]
                        bg-red-500
                        text-white
                        px-6
                        py-4
                        rounded-2xl
                        shadow-2xl
                        max-w-[350px]
                    "
                >

                    ❌ {errorMessage}

                </div>

            )}

            {/* SUCCESS MESSAGE */}
            {successMessage && (

                <div
                    className="
                        fixed
                        bottom-6
                        right-6
                        z-[9999]
                        bg-green-500
                        text-white
                        px-6
                        py-4
                        rounded-2xl
                        shadow-2xl
                        max-w-[350px]
                    "
                >

                    ✅ {successMessage}

                </div>

            )}

            {/* GLOW */}
            <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-violet-600 opacity-20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-600 opacity-20 blur-[120px] rounded-full pointer-events-none"></div>

            <Navbar />

            <section className="pt-36 px-6 pb-20 relative z-10">

                <div className="max-w-4xl mx-auto">

                    {/* MODAL */}
                    <div className="bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-2xl p-8 shadow-2xl relative">

                        {/* CLOSE */}
                        <Link
                            to={`/business/${business.id}`}
                            className="absolute top-6 right-6 text-zinc-500 hover:text-white text-2xl transition"
                        >

                            ✕

                        </Link>

                        <h1 className="text-3xl font-semibold">

                            Nueva reserva

                        </h1>

                        {/* TOP */}
                        <div className="mt-10 grid md:grid-cols-[220px_1fr] gap-8">

                            {/* IMAGE */}
                            <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden">

                                <img
                                    src={business.image}
                                    alt={business.name}
                                    className="w-full h-full object-cover"
                                />

                            </div>

                            {/* INFO */}
                            <div>

                                <h2 className="text-4xl font-semibold">

                                    {business.name}

                                </h2>

                                <div className="mt-6 bg-black/30 border border-white/10 rounded-2xl px-5 py-4 flex items-center justify-between">

                                    <span className="text-zinc-300">

                                        {service.name}

                                    </span>

                                    <span className="text-violet-400 font-semibold text-xl">

                                        {service.price}

                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* CONTENT */}
                        <div className="mt-10 bg-black/20 border border-white/10 rounded-[2rem] p-8">

                            {/* PROFESSIONALS */}
                            <div>

                                <h3 className="text-zinc-400 uppercase text-sm tracking-widest">

                                    Equipo

                                </h3>

                                <div className="mt-4 flex flex-wrap gap-3">

                                    {professionals.map(
                                        (
                                            professional
                                        ) => (

                                            <button
                                                key={
                                                    professional
                                                }
                                                onClick={() =>
                                                    setSelectedProfessional(
                                                        professional
                                                    )
                                                }
                                                className={`
                                                    px-5
                                                    py-3
                                                    rounded-2xl
                                                    border
                                                    transition
                                                    ${
                                                        selectedProfessional ===
                                                        professional
                                                            ? "bg-violet-500 border-violet-400 text-white"
                                                            : "bg-white/5 border-white/10 hover:bg-white/10"
                                                    }
                                                `}
                                            >

                                                {
                                                    professional
                                                }

                                            </button>

                                        )
                                    )}

                                </div>

                            </div>

                            {/* DATES */}
                            <div className="mt-10">

                                <h3 className="text-zinc-400 uppercase text-sm tracking-widest">

                                    Días disponibles

                                </h3>

                                <div className="mt-4 flex flex-wrap gap-3">

                                    {dates.map(
                                        (date) => (

                                            <button
                                                key={
                                                    date
                                                }
                                                onClick={() =>
                                                    setSelectedDate(
                                                        date
                                                    )
                                                }
                                                className={`
                                                    px-5
                                                    py-3
                                                    rounded-2xl
                                                    border
                                                    transition
                                                    ${
                                                        selectedDate ===
                                                        date
                                                            ? "bg-violet-500 border-violet-400 text-white"
                                                            : "bg-white/5 border-white/10 hover:bg-white/10"
                                                    }
                                                `}
                                            >

                                                {
                                                    date
                                                }

                                            </button>

                                        )
                                    )}

                                </div>

                            </div>

                            {/* HOURS */}
                            <div className="mt-10">

                                <h3 className="text-zinc-400 uppercase text-sm tracking-widest">

                                    Horas disponibles

                                </h3>

                                <div className="mt-4 flex flex-wrap gap-3">

                                    {availableHours.length ===
                                    0 ? (

                                        <div className="text-red-400">

                                            No hay horarios disponibles.

                                        </div>

                                    ) : (

                                        availableHours.map(
                                            (
                                                hour
                                            ) => (

                                                <button
                                                    key={
                                                        hour
                                                    }
                                                    onClick={() =>
                                                        setSelectedHour(
                                                            hour
                                                        )
                                                    }
                                                    className={`
                                                        px-5
                                                        py-3
                                                        rounded-2xl
                                                        border
                                                        transition
                                                        ${
                                                            selectedHour ===
                                                            hour
                                                                ? "bg-violet-500 border-violet-400 text-white"
                                                                : "bg-white/5 border-white/10 hover:bg-white/10"
                                                        }
                                                    `}
                                                >

                                                    {
                                                        hour
                                                    }

                                                </button>

                                            )
                                        )

                                    )}

                                </div>

                            </div>

                            {/* BUTTON */}
                            <button
                                onClick={
                                    handleReservation
                                }
                                className="mt-12 w-full bg-white text-black hover:bg-zinc-200 py-5 rounded-2xl font-semibold transition text-lg"
                            >

                                Reservar

                            </button>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Booking;