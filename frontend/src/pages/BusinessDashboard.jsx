import { useEffect, useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import BusinessSidebar from "../components/BusinessSidebar";
import DashboardStats from "../components/DashboardStats";
import ScheduleManager from "../components/ScheduleManager";
import ReservationsManager from "../components/ReservationsManager";
import ProfessionalsManager from "../components/ProfessionalsManager";

import businessSettingsData from "../data/businessSettings";

const API_URL = "https://reservapo.onrender.com";

function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [business, setBusiness] = useState(null);
  const [reservations, setReservations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updatingReservation, setUpdatingReservation] =
    useState(null);

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem(
      "businessSettings"
    );

    return saved
      ? JSON.parse(saved)
      : businessSettingsData;
  });

  useEffect(() => {
    localStorage.setItem(
      "businessSettings",
      JSON.stringify(settings)
    );
  }, [settings]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/business/dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Error cargando panel del negocio"
        );
      }

      setBusiness(data.business);

      const sortedReservations = (
        data.reservations || []
      ).sort((a, b) => b.id - a.id);

      setReservations(sortedReservations);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateReservationStatus(
    reservationId,
    status
  ) {
    try {
      setUpdatingReservation(reservationId);

      const token =
        localStorage.getItem("token");

      const reservation =
        reservations.find(
          (item) =>
            item.id === reservationId
        );

      if (!reservation) return;

      const response = await fetch(
        `${API_URL}/reservations/${reservationId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            professional_id:
              reservation.professional_id,

            service:
              reservation.service,

            reservation_date:
              reservation.date,

            reservation_time:
              reservation.time,

            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "No se pudo actualizar la reserva"
        );
      }

      setReservations((prev) =>
        prev.map((reservation) =>
          reservation.id === reservationId
            ? {
                ...reservation,
                status,
              }
            : reservation
        )
      );
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setUpdatingReservation(null);
    }
  }

  const nextReservations = useMemo(() => {
    return reservations.slice(0, 5);
  }, [reservations]);

  const confirmedReservations =
    reservations.filter(
      (reservation) =>
        reservation.status?.toLowerCase() ===
        "confirmed"
    ).length;

  const pendingReservations =
    reservations.filter(
      (reservation) =>
        reservation.status?.toLowerCase() ===
          "pendiente" ||
        reservation.status?.toLowerCase() ===
          "pending"
    ).length;

  const cancelledReservations =
    reservations.filter(
      (reservation) =>
        reservation.status?.toLowerCase() ===
        "cancelled"
    ).length;

  function getStatusBadge(status) {
    const normalized =
      status?.toLowerCase();

    if (normalized === "cancelled") {
      return (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-xl text-sm">
          Cancelada
        </div>
      );
    }

    if (
      normalized === "confirmed" ||
      normalized === "confirmada"
    ) {
      return (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-xl text-sm">
          Confirmada
        </div>
      );
    }

    return (
      <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 px-4 py-2 rounded-xl text-sm">
        Pendiente
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative isolate">
      <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] bg-violet-600 opacity-20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-600 opacity-20 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <Navbar />

      <div className="flex pt-28 min-h-screen">
        <BusinessSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <main className="flex-1 px-6 lg:px-10 pb-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-5 py-2 rounded-full text-sm">
                🏪 Panel de negocio
              </div>

              <h1 className="mt-5 text-4xl md:text-5xl font-semibold tracking-tight">
                {business?.name ||
                  "Administración de tienda"}
              </h1>

              <p className="mt-4 text-zinc-400 max-w-2xl leading-relaxed">
                Gestiona reservas, horarios, clientes y
                profesionales desde un solo lugar.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  setActiveTab("reservations")
                }
                className="bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-2xl transition font-medium"
              >
                Ver reservas
              </button>

              <button
                onClick={() =>
                  setActiveTab("schedule")
                }
                className="bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-3 rounded-2xl transition font-medium"
              >
                Configurar horarios
              </button>
            </div>
          </div>

          <div className="mt-10">
            <DashboardStats />
          </div>

          {/* REAL STATS */}

          <div className="mt-10 grid md:grid-cols-3 gap-5">
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
              <p className="text-zinc-500">
                Confirmadas
              </p>

              <h2 className="mt-4 text-5xl font-bold text-green-400">
                {confirmedReservations}
              </h2>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
              <p className="text-zinc-500">
                Pendientes
              </p>

              <h2 className="mt-4 text-5xl font-bold text-yellow-300">
                {pendingReservations}
              </h2>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
              <p className="text-zinc-500">
                Canceladas
              </p>

              <h2 className="mt-4 text-5xl font-bold text-red-400">
                {cancelledReservations}
              </h2>
            </div>
          </div>

          {loading && (
            <div className="mt-10 bg-white/5 border border-white/10 rounded-[2rem] p-8 text-zinc-400">
              Cargando panel del negocio...
            </div>
          )}

          {error && (
            <div className="mt-10 bg-red-500/10 border border-red-500/20 text-red-300 rounded-[2rem] p-8">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="mt-10">
              {activeTab === "dashboard" && (
                <div className="grid xl:grid-cols-[1fr_420px] gap-8 items-start">
                  <div className="space-y-8 min-w-0">
                    <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div>
                          <h2 className="text-2xl font-semibold">
                            Próximas reservas
                          </h2>

                          <p className="mt-2 text-zinc-400">
                            Gestiona las próximas citas
                            de tu negocio.
                          </p>
                        </div>
                      </div>

                      <div className="mt-8 space-y-4">
                        {nextReservations.length ===
                        0 ? (
                          <div className="bg-black/30 border border-white/10 rounded-2xl p-6 text-zinc-400">
                            Aún no tienes reservas.
                          </div>
                        ) : (
                          nextReservations.map(
                            (reservation) => (
                              <div
                                key={reservation.id}
                                className="bg-black/30 border border-white/10 rounded-2xl p-5"
                              >
                                <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
                                  <div>
                                    <h3 className="text-xl font-semibold">
                                      {reservation.client_name ||
                                        "Cliente"}
                                    </h3>

                                    <p className="mt-2 text-zinc-400">
                                      {reservation.service}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-6">
                                      <div>
                                        <p className="text-zinc-500 text-sm">
                                          Profesional
                                        </p>

                                        <p className="mt-1">
                                          {reservation.professional_name}
                                        </p>
                                      </div>

                                      <div>
                                        <p className="text-zinc-500 text-sm">
                                          Fecha
                                        </p>

                                        <p className="mt-1">
                                          {reservation.date}
                                        </p>
                                      </div>

                                      <div>
                                        <p className="text-zinc-500 text-sm">
                                          Hora
                                        </p>

                                        <p className="mt-1">
                                          {reservation.time}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex flex-col items-start xl:items-end gap-4">
                                    {getStatusBadge(
                                      reservation.status
                                    )}

                                    {reservation.status?.toLowerCase() !==
                                      "confirmed" &&
                                      reservation.status?.toLowerCase() !==
                                        "cancelled" && (
                                        <button
                                          onClick={() =>
                                            updateReservationStatus(
                                              reservation.id,
                                              "confirmed"
                                            )
                                          }
                                          disabled={
                                            updatingReservation ===
                                            reservation.id
                                          }
                                          className="bg-green-500 text-white hover:bg-green-400 px-5 py-3 rounded-2xl transition disabled:opacity-50"
                                        >
                                          {updatingReservation ===
                                          reservation.id
                                            ? "Confirmando..."
                                            : "Confirmar"}
                                        </button>
                                      )}
                                  </div>
                                </div>
                              </div>
                            )
                          )
                        )}
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div>
                          <h2 className="text-2xl font-semibold">
                            Horarios activos
                          </h2>

                          <p className="mt-2 text-zinc-400">
                            Configuración actual de
                            disponibilidad.
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            setActiveTab("schedule")
                          }
                          className="bg-white/5 border border-white/10 hover:bg-white/10 px-5 py-3 rounded-2xl transition font-medium"
                        >
                          Editar horarios
                        </button>
                      </div>

                      <div className="mt-8 grid md:grid-cols-3 gap-4">
                        {[
                          "Lunes",
                          "Martes",
                          "Miércoles",
                          "Jueves",
                          "Viernes",
                          "Sábado",
                        ].map((day) => (
                          <div
                            key={day}
                            className="bg-black/30 border border-white/10 rounded-2xl p-5"
                          >
                            <h3 className="font-semibold">
                              {day}
                            </h3>

                            <p className="mt-3 text-zinc-400">
                              09:00 - 20:00
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 min-w-0">
                    <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
                      <h2 className="text-2xl font-semibold">
                        Información del negocio
                      </h2>

                      <div className="mt-8 space-y-6">
                        <div>
                          <p className="text-zinc-500 text-sm">
                            Nombre
                          </p>

                          <p className="mt-2">
                            {business?.name ||
                              "Sin nombre"}
                          </p>
                        </div>

                        <div>
                          <p className="text-zinc-500 text-sm">
                            Ciudad
                          </p>

                          <p className="mt-2">
                            {business?.city ||
                              "Sin ciudad"}
                          </p>
                        </div>

                        <div>
                          <p className="text-zinc-500 text-sm">
                            Categoría
                          </p>

                          <p className="mt-2">
                            {business?.category ||
                              "Sin categoría"}
                          </p>
                        </div>

                        <div>
                          <p className="text-zinc-500 text-sm">
                            Estado
                          </p>

                          <div className="mt-3 inline-flex bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-xl text-sm">
                            Negocio activo
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
                      <h2 className="text-2xl font-semibold">
                        Reglas del negocio
                      </h2>

                      <div className="mt-8 space-y-5">
                        {[
                          {
                            title:
                              "Permitir cancelaciones",

                            description:
                              "Clientes pueden cancelar reservas.",

                            key:
                              "allowCancellations",
                          },

                          {
                            title:
                              "Confirmación automática",

                            description:
                              "Las reservas se aprueban automáticamente.",

                            key:
                              "autoConfirmReservations",
                          },

                          {
                            title:
                              "Mostrar negocio públicamente",

                            description:
                              "Tu negocio aparecerá en búsquedas.",

                            key:
                              "publicBusiness",
                          },
                        ].map((rule) => (
                          <div
                            key={rule.key}
                            className="bg-black/30 border border-white/10 rounded-2xl p-6 flex items-start justify-between gap-6"
                          >
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-lg leading-tight">
                                {rule.title}
                              </h3>

                              <p className="mt-3 text-zinc-400 text-sm leading-relaxed">
                                {rule.description}
                              </p>
                            </div>

                            <button
                              onClick={() =>
                                setSettings({
                                  ...settings,

                                  [rule.key]:
                                    !settings[
                                      rule.key
                                    ],
                                })
                              }
                              className={`min-w-[56px] w-14 h-8 rounded-full transition relative ${
                                settings[
                                  rule.key
                                ]
                                  ? "bg-violet-500"
                                  : "bg-zinc-700"
                              }`}
                            >
                              <div
                                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition ${
                                  settings[
                                    rule.key
                                  ]
                                    ? "right-1"
                                    : "left-1"
                                }`}
                              ></div>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reservations" && (
                <ReservationsManager />
              )}

              {activeTab === "schedule" && (
                <ScheduleManager />
              )}

              {activeTab === "professionals" && (
                <ProfessionalsManager />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default BusinessDashboard;