import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_URL = "https://reservapo.onrender.com";

const getTodayString = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const generateAvailableDates = () => {
    const today = new Date();

    return Array.from({ length: 14 }, (_, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() + index);

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    });
};

const generateAvailableHours = () => {
    const hours = [];
    const startHour = 8;
    const endHour = 20;
    const intervalMinutes = 45;

    const current = new Date();
    current.setHours(startHour, 0, 0, 0);

    const end = new Date();
    end.setHours(endHour, 0, 0, 0);

    while (current < end) {
        const hour = String(current.getHours()).padStart(2, "0");
        const minutes = String(current.getMinutes()).padStart(2, "0");

        hours.push(`${hour}:${minutes}`);

        current.setMinutes(current.getMinutes() + intervalMinutes);
    }

    return hours;
};

function Booking() {
    const navigate = useNavigate();

    const { businessId, serviceId, serviceIndex, reservationId } = useParams();

    const isRebooking = Boolean(reservationId);

    const [business, setBusiness] = useState(null);
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [professionals, setProfessionals] = useState([]);
    const [occupiedHours, setOccupiedHours] = useState([]);
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [selectedDate, setSelectedDate] = useState(getTodayString());
    const [selectedHour, setSelectedHour] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const dates = useMemo(() => generateAvailableDates(), []);
    const hours = useMemo(() => generateAvailableHours(), []);

    const normalizeHour = (hour) => {
        return hour?.toString().slice(0, 5);
    };

    const isToday = (date) => {
        return date === getTodayString();
    };

    const isPastHour = (hour) => {
        if (!isToday(selectedDate)) {
            return false;
        }

        const now = new Date();
        const [hourValue, minuteValue] = hour.split(":").map(Number);

        const compared = new Date();
        compared.setHours(hourValue, minuteValue, 0, 0);

        return compared <= now;
    };

    const normalizedOccupiedHours = useMemo(() => {
        return occupiedHours.map((hour) => normalizeHour(hour));
    }, [occupiedHours]);

    const availableHours = useMemo(() => {
        const filtered = hours.filter((hour) => {
            const isOccupied = normalizedOccupiedHours.includes(hour);
            const isPast = isPastHour(hour);

            return !isOccupied && !isPast;
        });

        if (isRebooking && selectedHour && !filtered.includes(selectedHour)) {
            filtered.push(selectedHour);
        }

        return filtered.sort();
    }, [
        hours,
        normalizedOccupiedHours,
        selectedDate,
        selectedHour,
        isRebooking,
    ]);

    useEffect(() => {
        async function loadBusiness() {
            try {
                setLoading(true);
                setErrorMessage("");

                const response = await fetch(`${API_URL}/businesses`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "No se pudo cargar el negocio"
                    );
                }

                const selectedBusiness = (data.businesses || []).find(
                    (item) => Number(item.id) === Number(businessId)
                );

                if (!selectedBusiness) {
                    throw new Error("Negocio no encontrado");
                }

                const services = selectedBusiness.services || [];

                let selectedService = null;

                if (serviceId) {
                    selectedService = services.find(
                        (item) => Number(item.id) === Number(serviceId)
                    );
                }

                if (!selectedService && serviceIndex !== undefined) {
                    selectedService = services[Number(serviceIndex)];
                }

                if (!selectedService && services.length > 0) {
                    selectedService = services[0];
                }

                if (!selectedService) {
                    selectedService = {
                        id: null,
                        name: "Servicio general",
                        description: "Servicio general del negocio.",
                        price: 15000,
                        duration_minutes: 45,
                    };
                }

                setBusiness(selectedBusiness);
                setService(selectedService);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadBusiness();
    }, [businessId, serviceId, serviceIndex]);

    useEffect(() => {
        async function loadProfessionals() {
            try {
                const response = await fetch(
                    `${API_URL}/professionals/${businessId}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.error || "No se pudieron cargar profesionales"
                    );
                }

                const professionalsList = data.professionals || [];

                setProfessionals(professionalsList);

                if (professionalsList.length > 0) {
                    setSelectedProfessional((current) => {
                        return current || professionalsList[0].id;
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }

        loadProfessionals();
    }, [businessId]);

    useEffect(() => {
        async function loadReservation() {
            if (!isRebooking) {
                return;
            }

            try {
                const token = localStorage.getItem("token");

                const response = await fetch(`${API_URL}/reservations`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                const reservation = data.reservations?.find(
                    (item) => Number(item.id) === Number(reservationId)
                );

                if (!reservation) {
                    throw new Error("Reserva no encontrada");
                }

                setSelectedProfessional(reservation.professional_id);
                setSelectedDate(reservation.reservation_date);
                setSelectedHour(normalizeHour(reservation.reservation_time));
            } catch (error) {
                console.log(error);
            }
        }

        loadReservation();
    }, [isRebooking, reservationId]);

    useEffect(() => {
        async function loadOccupiedHours() {
            if (!selectedProfessional || !selectedDate) {
                return;
            }

            try {
                const params = new URLSearchParams({
                    business_id: businessId,
                    professional_id: selectedProfessional,
                    reservation_date: selectedDate,
                });

                const response = await fetch(
                    `${API_URL}/reservations/occupied?${params.toString()}`
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error);
                }

                setOccupiedHours(data.occupiedHours || []);
            } catch (error) {
                console.log(error);
                setOccupiedHours([]);
            }
        }

        loadOccupiedHours();
    }, [businessId, selectedProfessional, selectedDate]);

    const showError = (message) => {
        setErrorMessage(message);

        setTimeout(() => {
            setErrorMessage("");
        }, 4000);
    };

    const handleReservation = async () => {
        try {
            setSaving(true);
            setErrorMessage("");
            setSuccessMessage("");

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            if (!selectedProfessional) {
                throw new Error("Debes seleccionar un profesional");
            }

            if (!selectedDate) {
                throw new Error("Debes seleccionar una fecha");
            }

            if (!selectedHour) {
                throw new Error("Debes seleccionar una hora");
            }

            const endpoint = isRebooking
                ? `${API_URL}/reservations/${reservationId}`
                : `${API_URL}/reservations`;

            const method = isRebooking ? "PUT" : "POST";

            const body = {
                business_id: Number(businessId),
                professional_id: Number(selectedProfessional),
                service: service.name,
                reservation_date: selectedDate,
                reservation_time: selectedHour,
                status: "Pendiente",
            };

            if (service?.id) {
                body.service_id = Number(service.id);
            }

            const response = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "No se pudo guardar la reserva"
                );
            }

            setSuccessMessage(
                isRebooking
                    ? "Reserva reagendada correctamente ✨"
                    : "Reserva realizada correctamente ✨"
            );

            setTimeout(() => {
                navigate("/my-reservations");
            }, 1500);
        } catch (error) {
            showError(error.message);
        } finally {
            setSaving(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(`${dateString}T00:00:00`);

        return date.toLocaleDateString("es-CL", {
            weekday: "short",
            day: "2-digit",
            month: "short",
        });
    };

    const formatPrice = (price) => {
        if (typeof price === "string" && price.includes("$")) {
            return price;
        }

        return `$${Number(price || 0).toLocaleString("es-CL")}`;
    };

    if (loading) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center text-white">
                Cargando reserva...
            </div>
        );
    }

    if (!business || !service) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center text-white">
                Reserva no encontrada.
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen text-white overflow-x-hidden">
            {errorMessage && (
                <div className="fixed bottom-6 right-6 z-[9999] bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl max-w-[350px]">
                    ❌ {errorMessage}
                </div>
            )}

            {successMessage && (
                <div className="fixed bottom-6 right-6 z-[9999] bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl max-w-[350px]">
                    ✅ {successMessage}
                </div>
            )}

            <Navbar />

            <section className="pt-36 px-6 pb-20">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-2xl p-8 shadow-2xl relative">
                        <Link
                            to={`/business/${business.id}`}
                            className="absolute top-6 right-6 text-zinc-500 hover:text-white text-2xl transition"
                        >
                            ✕
                        </Link>

                        <h1 className="text-3xl font-semibold">
                            {isRebooking
                                ? "Reagendar reserva"
                                : "Nueva reserva"}
                        </h1>

                        <div className="mt-6 bg-black/30 border border-white/10 rounded-2xl p-5">
                            <p className="text-zinc-500 text-sm">
                                Servicio seleccionado
                            </p>

                            <h2 className="mt-2 text-2xl font-semibold">
                                {service.name}
                            </h2>

                            {service.description && (
                                <p className="mt-3 text-zinc-400">
                                    {service.description}
                                </p>
                            )}

                            <div className="mt-5 flex flex-wrap gap-3">
                                <div className="bg-violet-500/10 border border-violet-500/20 text-violet-300 px-4 py-2 rounded-xl text-sm">
                                    {formatPrice(service.raw_price || service.price)}
                                </div>

                                <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm">
                                    {service.duration_minutes || 45} min
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-zinc-400 uppercase text-sm tracking-widest">
                                Profesionales
                            </h3>

                            <div className="mt-4 flex flex-wrap gap-3">
                                {professionals.length === 0 ? (
                                    <p className="text-zinc-500">
                                        Este negocio aún no tiene profesionales disponibles.
                                    </p>
                                ) : (
                                    professionals.map((professional) => (
                                        <button
                                            key={professional.id}
                                            onClick={() =>
                                                setSelectedProfessional(
                                                    professional.id
                                                )
                                            }
                                            className={`px-5 py-3 rounded-2xl border transition ${
                                                selectedProfessional ===
                                                professional.id
                                                    ? "bg-violet-500 border-violet-400 text-white"
                                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                                            }`}
                                        >
                                            {professional.name}
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-zinc-400 uppercase text-sm tracking-widest">
                                Días disponibles
                            </h3>

                            <div className="mt-4 flex flex-wrap gap-3">
                                {dates.map((date) => (
                                    <button
                                        key={date}
                                        onClick={() => {
                                            setSelectedDate(date);
                                            setSelectedHour("");
                                        }}
                                        className={`px-5 py-3 rounded-2xl border transition ${
                                            selectedDate === date
                                                ? "bg-violet-500 border-violet-400 text-white"
                                                : "bg-white/5 border-white/10 hover:bg-white/10"
                                        }`}
                                    >
                                        {formatDate(date)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-zinc-400 uppercase text-sm tracking-widest">
                                Horas disponibles
                            </h3>

                            <div className="mt-4 flex flex-wrap gap-3">
                                {availableHours.length === 0 ? (
                                    <p className="text-zinc-500">
                                        No hay horas disponibles para este día.
                                    </p>
                                ) : (
                                    availableHours.map((hour) => (
                                        <button
                                            key={hour}
                                            onClick={() =>
                                                setSelectedHour(hour)
                                            }
                                            className={`px-5 py-3 rounded-2xl border transition ${
                                                selectedHour === hour
                                                    ? "bg-violet-500 border-violet-400 text-white"
                                                    : "bg-white/5 border-white/10 hover:bg-white/10"
                                            }`}
                                        >
                                            {hour}
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleReservation}
                            disabled={
                                saving ||
                                !selectedHour ||
                                !selectedProfessional ||
                                professionals.length === 0
                            }
                            className="mt-12 w-full bg-white text-black hover:bg-zinc-200 py-5 rounded-2xl font-semibold transition text-lg disabled:opacity-50"
                        >
                            {saving
                                ? "Guardando..."
                                : isRebooking
                                ? "Guardar cambios"
                                : "Reservar"}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Booking;