import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

const API_URL = "https://reservapo.onrender.com";

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fallbackImage =
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1";

  useEffect(() => {
    async function loadReservations() {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        if (!token) {
          setReservations([]);
          return;
        }

        const response = await fetch(`${API_URL}/reservations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Error obteniendo reservas");
        }

        setReservations(data.reservations || []);
      } catch (error) {
        console.log(error);
        setReservations([]);
        setErrorMessage(error.message);

        setTimeout(() => {
          setErrorMessage("");
        }, 4000);
      } finally {
        setLoading(false);
      }
    }

    loadReservations();
  }, []);

  const showSuccess = (message) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  };

  const showError = (message) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  async function handleCancelReservation(id) {
    const confirmed = window.confirm(
      "¿Seguro que quieres cancelar esta reserva?"
    );

    if (!confirmed) return;

    try {
      setCancellingId(id);

      const token = localStorage.getItem("token");

      if (!token) {
        showError("Debes iniciar sesión nuevamente");
        return;
      }

      const response = await fetch(`${API_URL}/reservations/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo cancelar la reserva");
      }

      setReservations((prev) =>
        prev.map((reservation) =>
          reservation.id === id
            ? {
                ...reservation,
                status: "cancelled",
              }
            : reservation
        )
      );

      showSuccess("Reserva cancelada correctamente");
    } catch (error) {
      showError(error.message);
    } finally {
      setCancellingId(null);
    }
  }

  function getStatusBadge(status) {
    const normalized = status?.toLowerCase();

    if (normalized === "cancelled") {
      return (
        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm">
          ✖ Cancelada
        </div>
      );
    }

    if (normalized === "confirmed" || normalized === "confirmada") {
      return (
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">
          ✔ Confirmada
        </div>
      );
    }

    return (
      <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm">
        ⏳ Pendiente
      </div>
    );
  }

  function formatDate(date) {
    if (!date) return "Sin fecha";

    return new Date(date).toLocaleDateString("es-CL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function formatTime(time) {
    if (!time) return "Sin hora";

    return time.toString().slice(0, 5);
  }

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden relative isolate">
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

      <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] bg-violet-600 opacity-20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-600 opacity-20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <Navbar />

      <section className="pt-32 px-6 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-5 py-2 rounded-full text-sm">
                Panel cliente
              </div>

              <h1 className="mt-8 text-5xl md:text-6xl font-semibold tracking-tight">
                Mis reservas
              </h1>

              <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-2xl">
                Revisa tus reservas, cancela citas, reagenda horarios y mantén
                tu agenda actualizada.
              </p>
            </div>

            <Link
              to="/services"
              className="bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-2xl transition font-medium w-fit"
            >
              Explorar servicios
            </Link>
          </div>

          {loading && (
            <div className="mt-20 text-center text-zinc-400 text-xl">
              Cargando reservas...
            </div>
          )}

          {!loading && reservations.length === 0 && (
            <div className="mt-20 bg-white/5 border border-white/10 rounded-[3rem] p-10 lg:p-20 backdrop-blur-xl text-center">
              <div className="w-28 h-28 mx-auto rounded-[2rem] bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-5xl shadow-2xl shadow-violet-500/30">
                📅
              </div>

              <h2 className="mt-10 text-4xl font-semibold">
                Aún no tienes reservas
              </h2>

              <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-2xl mx-auto">
                Cuando reserves un servicio, podrás visualizar aquí todos los
                detalles de tus próximas citas.
              </p>

              <Link
                to="/services"
                className="mt-10 inline-flex bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-2xl transition font-medium"
              >
                Reservar ahora
              </Link>
            </div>
          )}

          {!loading && reservations.length > 0 && (
            <div className="mt-16 grid gap-8">
              {reservations.map((reservation) => {
                const isCancelled =
                  reservation.status?.toLowerCase() === "cancelled";

                return (
                  <div
                    key={reservation.id}
                    className={`bg-white/5 border rounded-[2rem] backdrop-blur-xl overflow-hidden transition ${
                      isCancelled
                        ? "border-red-500/20 opacity-70"
                        : "border-white/10"
                    }`}
                  >
                    <div className="grid lg:grid-cols-[320px_1fr]">
                      <div className="relative h-[280px] lg:h-full bg-black overflow-hidden">
                        <img
                          src={fallbackImage}
                          alt="Reserva"
                          className="absolute inset-0 w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                        <div className="absolute bottom-5 left-5 right-5">
                          {getStatusBadge(reservation.status)}
                        </div>
                      </div>

                      <div className="p-8 flex flex-col justify-between">
                        <div>
                          <h2 className="text-4xl font-semibold">
                            {reservation.business_name || "Negocio"}
                          </h2>

                          <p className="mt-4 text-zinc-400 text-lg">
                            {reservation.service || "Servicio reservado"}
                          </p>

                          <div className="mt-10 grid md:grid-cols-3 gap-5">
                            <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                              <p className="text-zinc-500 text-sm">
                                Profesional
                              </p>

                              <h3 className="mt-2 text-xl font-semibold">
                                {reservation.professional_name ||
                                  "Sin profesional"}
                              </h3>
                            </div>

                            <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                              <p className="text-zinc-500 text-sm">
                                Fecha
                              </p>

                              <h3 className="mt-2 text-xl font-semibold">
                                {formatDate(reservation.reservation_date)}
                              </h3>
                            </div>

                            <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                              <p className="text-zinc-500 text-sm">
                                Hora
                              </p>

                              <h3 className="mt-2 text-xl font-semibold">
                                {formatTime(reservation.reservation_time)}
                              </h3>
                            </div>
                          </div>

                          <div className="mt-10 bg-black/30 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold">
                              Política de cambios
                            </h3>

                            <p className="mt-4 text-zinc-400 leading-relaxed">
                              Puedes cancelar o reagendar tu reserva. Al
                              cancelar, la hora queda liberada automáticamente
                              para que otra persona pueda tomarla.
                            </p>
                          </div>
                        </div>

                        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                          <div>
                            <p className="text-zinc-500 text-sm">
                              Estado actual
                            </p>

                            <h3
                              className={`mt-2 text-3xl font-semibold ${
                                isCancelled
                                  ? "text-red-400"
                                  : "text-violet-400"
                              }`}
                            >
                              {isCancelled
                                ? "Cancelada"
                                : reservation.status || "Pendiente"}
                            </h3>
                          </div>

                          <div className="flex flex-wrap gap-4">
                            {!isCancelled && (
                              <Link
                                to={`/rebook/${reservation.id}/${reservation.business_id}/0`}
                                className="bg-violet-500/10 border border-violet-500/20 text-violet-300 hover:bg-violet-500/20 px-6 py-3 rounded-2xl transition"
                              >
                                Reagendar
                              </Link>
                            )}

                            {!isCancelled ? (
                              <button
                                onClick={() =>
                                  handleCancelReservation(reservation.id)
                                }
                                disabled={cancellingId === reservation.id}
                                className="bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 px-6 py-3 rounded-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {cancellingId === reservation.id
                                  ? "Cancelando..."
                                  : "Cancelar reserva"}
                              </button>
                            ) : (
                              <button
                                disabled
                                className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-3 rounded-2xl cursor-not-allowed"
                              >
                                Reserva cancelada
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default MyReservations;