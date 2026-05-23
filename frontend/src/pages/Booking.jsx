import { useEffect, useState } from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import { useAuth }
from "../context/AuthContext";

const API_URL =
  "https://reservapo.onrender.com";

function Booking() {

  const navigate = useNavigate();

  const {
    businessId,
    serviceIndex,
  } = useParams();

  const { token } = useAuth();

  const [business, setBusiness] =
    useState(null);

  const [service, setService] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [professionals, setProfessionals] =
    useState([]);

  const [occupiedHours, setOccupiedHours] =
    useState([]);

  const [selectedProfessional, setSelectedProfessional] =
    useState(null);

  const [selectedDate, setSelectedDate] =
    useState("2026-05-24");

  const [selectedHour, setSelectedHour] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const fallbackImage =
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1";

  const dates = [
    "2026-05-24",
    "2026-05-25",
    "2026-05-26",
    "2026-05-27",
  ];

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

  useEffect(() => {

    async function loadBusiness() {

      try {

        setLoading(true);

        const response =
          await fetch(
            `${API_URL}/businesses`
          );

        if (!response.ok) {

          throw new Error(
            "No se pudo cargar el negocio"
          );

        }

        const data =
          await response.json();

        const businesses =
          data.businesses || [];

        const selectedBusiness =
          businesses.find(
            (item) =>
              Number(item.id) ===
              Number(businessId)
          );

        if (!selectedBusiness) {

          throw new Error(
            "Negocio no encontrado"
          );

        }

        const selectedService =
          selectedBusiness.services?.[
            Number(serviceIndex)
          ] || {

            name:
              "Servicio general",

            price:
              "$15.000",

          };

        setBusiness(selectedBusiness);

        setService(selectedService);

      } catch (error) {

        setErrorMessage(
          error.message
        );

      } finally {

        setLoading(false);

      }

    }

    loadBusiness();

  }, [businessId, serviceIndex]);

  // PROFESIONALES
  useEffect(() => {

    async function loadProfessionals() {

      try {

        const response =
          await fetch(
            `${API_URL}/professionals/${businessId}`
          );

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(
            data.error ||
            "No se pudieron cargar profesionales"
          );

        }

        setProfessionals(
          data.professionals || []
        );

        if (
          data.professionals?.length > 0
        ) {

          setSelectedProfessional(
            data.professionals[0].id
          );

        }

      } catch (error) {

        console.log(error);

      }

    }

    loadProfessionals();

  }, [businessId]);

  // HORAS OCUPADAS
  useEffect(() => {

    async function loadOccupiedHours() {

      try {

        const response =
          await fetch(

            `${API_URL}/reservations/occupied?business_id=${businessId}&reservation_date=${selectedDate}`

          );

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(
            data.error
          );

        }

        setOccupiedHours(
          data.occupiedHours || []
        );

      } catch (error) {

        console.log(error);

      }

    }

    loadOccupiedHours();

  }, [
    businessId,
    selectedDate,
  ]);

  const showError = (
    message
  ) => {

    setErrorMessage(
      message
    );

    setTimeout(() => {

      setErrorMessage("");

    }, 4000);

  };

  const handleReservation =
    async () => {

      try {

        setSaving(true);

        setErrorMessage("");

        setSuccessMessage("");

        const storedToken =
          token ||
          localStorage.getItem(
            "token"
          );

        if (!storedToken) {

          navigate("/login");

          return;

        }

        const response =
          await fetch(
            `${API_URL}/reservations`,
            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${storedToken}`,

              },

              body: JSON.stringify({

                business_id:
                  Number(businessId),

                professional_id:
                  Number(selectedProfessional),

                service:
                  service.name,

                reservation_date:
                  selectedDate,

                reservation_time:
                  selectedHour,

              }),

            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          throw new Error(
            data.error ||
            "No se pudo crear la reserva"
          );

        }

        setSuccessMessage(
          "Reserva realizada correctamente ✨"
        );

        setTimeout(() => {

          navigate(
            "/my-reservations"
          );

        }, 1500);

      } catch (error) {

        showError(
          error.message
        );

      } finally {

        setSaving(false);

      }

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

    <div className="bg-black min-h-screen text-white overflow-hidden relative isolate">

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

      <section className="pt-36 px-6 pb-20 relative z-10">

        <div className="max-w-4xl mx-auto">

          <div className="bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-2xl p-8 shadow-2xl relative">

            <Link
              to={`/business/${business.id}`}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white text-2xl transition"
            >

              ✕

            </Link>

            <h1 className="text-3xl font-semibold">

              Nueva reserva

            </h1>

            <div className="mt-10">

              <h3 className="text-zinc-400 uppercase text-sm tracking-widest">

                Profesionales

              </h3>

              <div className="mt-4 flex flex-wrap gap-3">

                {professionals.map(
                  (professional) => (

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

                  )
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
                    onClick={() =>
                      setSelectedDate(date)
                    }
                    className={`px-5 py-3 rounded-2xl border transition ${
                      selectedDate === date
                        ? "bg-violet-500 border-violet-400 text-white"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >

                    {date}

                  </button>

                ))}

              </div>

            </div>

            <div className="mt-10">

              <h3 className="text-zinc-400 uppercase text-sm tracking-widest">

                Horas disponibles

              </h3>

              <div className="mt-4 flex flex-wrap gap-3">

                {hours.map((hour) => {

                  const occupied =
                    occupiedHours.includes(hour);

                  return (

                    <button
                      key={hour}
                      disabled={occupied}
                      onClick={() =>
                        setSelectedHour(hour)
                      }
                      className={`px-5 py-3 rounded-2xl border transition ${
                        occupied
                          ? "bg-red-500/20 border-red-500/30 text-red-400 cursor-not-allowed opacity-50"
                          : selectedHour === hour
                          ? "bg-violet-500 border-violet-400 text-white"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >

                      {hour}

                      {occupied &&
                        " • Ocupado"}

                    </button>

                  );

                })}

              </div>

            </div>

            <button
              onClick={handleReservation}
              disabled={
                saving ||
                !selectedHour
              }
              className="mt-12 w-full bg-white text-black hover:bg-zinc-200 py-5 rounded-2xl font-semibold transition text-lg disabled:opacity-50"
            >

              {saving
                ? "Reservando..."
                : "Reservar"}

            </button>

          </div>

        </div>

      </section>

    </div>

  );

}

export default Booking;