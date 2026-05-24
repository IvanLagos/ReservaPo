import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

const API_URL =
  "https://reservapo.onrender.com";

function MyReservations() {

  const [reservations, setReservations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const fallbackImage =
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1";

  useEffect(() => {

    loadReservations();

  }, []);

  async function loadReservations() {

    try {

      setLoading(true);

      const token =
        localStorage.getItem("token");

      if (!token) {

        setReservations([]);

        return;

      }

      const response =
        await fetch(
          `${API_URL}/reservations`,
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
          "Error obteniendo reservas"
        );

      }

      setReservations(
        data.reservations || []
      );

    } catch (error) {

      console.log(error);

      setReservations([]);

    } finally {

      setLoading(false);

    }

  }

  async function handleCancelReservation(id) {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await fetch(
          `${API_URL}/reservations/${id}`,
          {

            method: "DELETE",

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
          "No se pudo cancelar"
        );

      }

      setReservations((prev) =>
        prev.map((reservation) => {

          if (
            reservation.id === id
          ) {

            return {

              ...reservation,

              status:
                "cancelled",

            };

          }

          return reservation;

        })
      );

      setSuccessMessage(
        "Reserva cancelada correctamente"
      );

      setTimeout(() => {

        setSuccessMessage("");

      }, 4000);

    } catch (error) {

      setErrorMessage(
        error.message
      );

      setTimeout(() => {

        setErrorMessage("");

      }, 4000);

    }

  }

  function getStatusBadge(status) {

    const normalized =
      status?.toLowerCase();

    if (
      normalized === "cancelled"
    ) {

      return (
        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm">

          ✖ Cancelada

        </div>
      );

    }

    if (
      normalized === "confirmed"
    ) {

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

          {!loading &&
            reservations.length === 0 && (

            <div className="mt-20 bg-white/5 border border-white/10 rounded-[3rem] p-10 lg:p-20 backdrop-blur-xl text-center">

              <h2 className="text-4xl font-semibold">

                Aún no tienes reservas

              </h2>

            </div>

          )}

          {!loading &&
            reservations.length > 0 && (

            <div className="mt-16 grid gap-8">

              {reservations.map((reservation) => (

                <div
                  key={reservation.id}
                  className="bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl overflow-hidden"
                >

                  <div className="grid lg:grid-cols-[320px_1fr]">

                    <div className="relative h-[280px] lg:h-full bg-black overflow-hidden">

                      <img
                        src={fallbackImage}
                        alt="Reserva"
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                    </div>

                    <div className="p-8 flex flex-col justify-between">

                      <div>

                        <div className="flex flex-wrap gap-3">

                          {getStatusBadge(
                            reservation.status
                          )}

                        </div>

                        <h2 className="mt-6 text-4xl font-semibold">

                          {reservation.business_name}

                        </h2>

                        <p className="mt-4 text-zinc-400 text-lg">

                          {reservation.service}

                        </p>

                        <div className="mt-10 grid md:grid-cols-3 gap-5">

                          <div className="bg-black/30 border border-white/10 rounded-2xl p-5">

                            <p className="text-zinc-500 text-sm">

                              Profesional

                            </p>

                            <h3 className="mt-2 text-xl font-semibold">

                              {reservation.professional_name}

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

                      </div>

                      <div className="mt-10 flex justify-end">

                        {reservation.status?.toLowerCase() !==
                          "cancelled" && (

                          <button
                            onClick={() =>
                              handleCancelReservation(
                                reservation.id
                              )
                            }
                            className="bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 px-6 py-3 rounded-2xl transition"
                          >

                            Cancelar reserva

                          </button>

                        )}

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