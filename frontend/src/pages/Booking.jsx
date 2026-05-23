import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const API_URL = "https://reservapo.onrender.com";

function Booking() {
  const navigate = useNavigate();
  const { businessId, serviceIndex } = useParams();
  const { token } = useAuth();

  const [business, setBusiness] = useState(null);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [selectedProfessional, setSelectedProfessional] = useState(1);
  const [selectedDate, setSelectedDate] = useState("2026-05-03");
  const [selectedHour, setSelectedHour] = useState("09:00");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fallbackImage =
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1";

  const professionals = [
    { id: 1, name: "Sofía" },
    { id: 2, name: "Daniel" },
    { id: 3, name: "Camila" },
  ];

  const dates = [
    "2026-05-03",
    "2026-05-04",
    "2026-05-05",
    "2026-05-06",
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

        const response = await fetch(`${API_URL}/businesses`);

        if (!response.ok) {
          throw new Error("No se pudo cargar el negocio");
        }

        const data = await response.json();

        const businesses = data.businesses || [];

        const selectedBusiness = businesses.find(
          (item) => Number(item.id) === Number(businessId)
        );

        if (!selectedBusiness) {
          throw new Error("Negocio no encontrado");
        }

        const selectedService =
          selectedBusiness.services?.[Number(serviceIndex)] || {
            name: "Servicio general",
            price: "$15.000",
          };

        setBusiness(selectedBusiness);
        setService(selectedService);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadBusiness();
  }, [businessId, serviceIndex]);

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

      const storedToken = token || localStorage.getItem("token");

      if (!storedToken) {
        navigate("/login");
        return;
      }

      const response = await fetch(`${API_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          business_id: Number(businessId),
          professional_id: Number(selectedProfessional),
          service: service.name,
          reservation_date: selectedDate,
          reservation_time: selectedHour,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "No se pudo crear la reserva"
        );
      }

      setSuccessMessage("Reserva realizada correctamente ✨");

      setTimeout(() => {
        navigate("/my-reservations");
      }, 1500);
    } catch (error) {
      showError(error.message);
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

      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-violet-600 opacity-20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-600 opacity-20 blur-[120px] rounded-full pointer-events-none"></div>

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

            <div className="mt-10 grid md:grid-cols-[220px_1fr] gap-8">
              <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden">
                <img
                  src={business.image_url || fallbackImage}
                  alt={business.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = fallbackImage;
                  }}
                />
              </div>

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

            <div className="mt-10 bg-black/20 border border-white/10 rounded-[2rem] p-8">
              <div>
                <h3 className="text-zinc-400 uppercase text-sm tracking-widest">
                  Equipo
                </h3>

                <div className="mt-4 flex flex-wrap gap-3">
                  {professionals.map((professional) => (
                    <button
                      key={professional.id}
                      onClick={() =>
                        setSelectedProfessional(professional.id)
                      }
                      className={`px-5 py-3 rounded-2xl border transition ${
                        selectedProfessional === professional.id
                          ? "bg-violet-500 border-violet-400 text-white"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      {professional.name}
                    </button>
                  ))}
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
                      onClick={() => setSelectedDate(date)}
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
                  {hours.map((hour) => (
                    <button
                      key={hour}
                      onClick={() => setSelectedHour(hour)}
                      className={`px-5 py-3 rounded-2xl border transition ${
                        selectedHour === hour
                          ? "bg-violet-500 border-violet-400 text-white"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      {hour}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleReservation}
                disabled={saving}
                className="mt-12 w-full bg-white text-black hover:bg-zinc-200 py-5 rounded-2xl font-semibold transition text-lg disabled:opacity-50"
              >
                {saving ? "Reservando..." : "Reservar"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Booking;