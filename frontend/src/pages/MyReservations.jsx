import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const API_URL = "https://reservapo.onrender.com";

function MyReservations() {
  const { token } = useAuth();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackImage =
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1";

  useEffect(() => {
    async function getReservations() {
      try {
        setLoading(true);

        const storedToken =
          token || localStorage.getItem("token");

        if (!storedToken) {
          setReservations([]);
          return;
        }

        const response = await fetch(`${API_URL}/reservations`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Error obteniendo reservas"
          );
        }

        setReservations(data.reservations || []);
      } catch (error) {
        console.log(error);
        setReservations([]);
      } finally {
        setLoading(false);
      }
    }

    getReservations();
  }, [token]);

  const handleRequestCancel = (id) => {
    const updatedReservations = reservations.map((reservation) => {
      if (reservation.id === id) {
        return {
          ...reservation,
          cancelRequested: true,
        };
      }

      return reservation;
    });

    setReservations(updatedReservations);
  };

  const handleRequestReschedule = (id) => {
    const updatedReservations = reservations.map((reservation) => {
      if (
        reservation.id === id &&
        !reservation.rescheduleRequested
      ) {
        return {
          ...reservation,
          rescheduleRequested: true,
        };
      }

      return reservation;
    });

    setReservations(updatedReservations);
  };

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden relative isolate">
      {/* GLOW */}
      <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] bg-violet-600 opacity-20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-600 opacity-20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <Navbar />

      <section className="pt-32 px-6 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-5 py-2 rounded-full text-sm">
                Panel cliente
              </div>

              <h1 className="mt-8 text-5xl md:text-6xl font-semibold tracking-tight">
                Mis reservas
              </h1>

              <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-2xl">
                Gestiona tus próximas reservas de manera responsable y profesional.
              </p>
            </div>

            <Link
              to="/services"
              className="bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-2xl transition font-medium w-fit"
            >
              Explorar servicios
            </Link>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="mt-20 text-center text-zinc-400 text-xl">
              Cargando reservas...
            </div>
          )}

          {/* EMPTY */}
          {!loading && reservations.length === 0 && (
            <div className="mt-20 bg-white/5 border border-white/10 rounded-[3rem] p-10 lg:p-20 backdrop-blur-xl text-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 rounded-[3rem]"></div>

              <div className="relative z-10">
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
            </div>
          )}

          {/* RESERVATIONS */}
          {!loading && reservations.length > 0 && (
            <div className="mt-16 grid gap-8">
              {reservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl overflow-hidden"
                >
                  <div className="grid lg:grid-cols-[320px_1fr]">
                    {/* IMAGE */}
                    <div className="relative h-[280px] lg:h-full bg-black overflow-hidden">
                      <img
                        src={fallbackImage}
                        alt="Reserva"
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-8 flex flex-col justify-between">
                      <div>
                        {/* STATUS */}
                        <div className="flex flex-wrap gap-3">
                          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm">
                            ✔ Reserva confirmada
                          </div>

                          {reservation.cancelRequested && (
                            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm">
                              ⚠ Solicitud de cancelación enviada
                            </div>
                          )}

                          {reservation.rescheduleRequested && (
                            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm">
                              ⏳ Solicitud de cambio enviada
                            </div>
                          )}
                        </div>

                        <h2 className="mt-6 text-4xl font-semibold">
                          {reservation.business_name ||
                            `Negocio #${reservation.business_id}`}
                        </h2>

                        <p className="mt-4 text-zinc-400 text-lg">
                          {reservation.service}
                        </p>

                        {/* INFO GRID */}
                        <div className="mt-10 grid md:grid-cols-3 gap-5">
                          <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                            <p className="text-zinc-500 text-sm">
                              Profesional
                            </p>

                            <h3 className="mt-2 text-xl font-semibold">
                              {reservation.professional_name ||
                                `#${reservation.professional_id}`}
                            </h3>
                          </div>

                          <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                            <p className="text-zinc-500 text-sm">
                              Fecha
                            </p>

                            <h3 className="mt-2 text-xl font-semibold">
                              {reservation.reservation_date}
                            </h3>
                          </div>

                          <div className="bg-black/30 border border-white/10 rounded-2xl p-5">
                            <p className="text-zinc-500 text-sm">
                              Hora
                            </p>

                            <h3 className="mt-2 text-xl font-semibold">
                              {reservation.reservation_time}
                            </h3>
                          </div>
                        </div>

                        {/* POLICY */}
                        <div className="mt-10 bg-black/30 border border-white/10 rounded-2xl p-6">
                          <h3 className="text-lg font-semibold">
                            Política de cambios
                          </h3>

                          <p className="mt-4 text-zinc-400 leading-relaxed">
                            Para proteger la agenda de los profesionales, las
                            solicitudes de cancelación y reagendamiento deben
                            realizarse con anticipación y serán revisadas por el
                            negocio correspondiente.
                          </p>
                        </div>
                      </div>

                      {/* FOOTER */}
                      <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                        <div>
                          <p className="text-zinc-500 text-sm">
                            Estado
                          </p>

                          <h3 className="mt-2 text-3xl font-semibold text-violet-400">
                            {reservation.status || "Pendiente"}
                          </h3>
                        </div>

                        <div className="flex gap-4 flex-wrap">
                          {!reservation.rescheduleRequested ? (
                            <button
                              onClick={() =>
                                handleRequestReschedule(reservation.id)
                              }
                              className="bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-3 rounded-2xl transition"
                            >
                              Solicitar cambio
                            </button>
                          ) : (
                            <button
                              disabled
                              className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 px-6 py-3 rounded-2xl cursor-not-allowed"
                            >
                              Cambio solicitado
                            </button>
                          )}

                          {!reservation.cancelRequested ? (
                            <button
                              onClick={() =>
                                handleRequestCancel(reservation.id)
                              }
                              className="bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 px-6 py-3 rounded-2xl transition"
                            >
                              Solicitar cancelación
                            </button>
                          ) : (
                            <button
                              disabled
                              className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-3 rounded-2xl cursor-not-allowed"
                            >
                              Cancelación enviada
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default MyReservations;