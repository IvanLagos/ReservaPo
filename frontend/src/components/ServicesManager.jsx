import { useEffect, useState } from "react";

const API_URL = "https://reservapo.onrender.com";

function ServicesManager({ services = [], refreshDashboard }) {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        duration_minutes: 30,
        category: "",
        is_active: true,
    });

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!editingId) {
            setForm({
                name: "",
                description: "",
                price: "",
                duration_minutes: 30,
                category: "",
                is_active: true,
            });
        }
    }, [editingId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleEdit = (service) => {
        setEditingId(service.id);

        setForm({
            name: service.name || "",
            description: service.description || "",
            price: service.price || "",
            duration_minutes: service.duration_minutes || 30,
            category: service.category || "",
            is_active: service.is_active ?? true,
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        setForm({
            name: "",
            description: "",
            price: "",
            duration_minutes: 30,
            category: "",
            is_active: true,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const url = editingId
                ? `${API_URL}/business/services/${editingId}`
                : `${API_URL}/business/services`;

            const method = editingId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "No se pudo guardar el servicio");
            }

            handleCancel();

            if (refreshDashboard) {
                await refreshDashboard();
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = confirm(
            "¿Seguro que quieres eliminar este servicio?"
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/business/services/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "No se pudo eliminar el servicio");
            }

            if (refreshDashboard) {
                await refreshDashboard();
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0,
        }).format(Number(price) || 0);
    };

    return (
        <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                        <h2 className="text-2xl font-semibold">
                            Servicios del negocio
                        </h2>

                        <p className="mt-2 text-zinc-400">
                            Crea, modifica y elimina los servicios reales que tus clientes podrán reservar.
                        </p>
                    </div>

                    <div className="bg-violet-500/10 border border-violet-500/20 text-violet-300 px-4 py-2 rounded-xl text-sm">
                        {services.length} servicios
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 grid lg:grid-cols-2 gap-5"
                >
                    <div>
                        <label className="text-sm text-zinc-400">
                            Nombre del servicio
                        </label>

                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Ej: Corte clásico"
                            className="mt-2 w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-violet-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-zinc-400">
                            Categoría
                        </label>

                        <input
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            placeholder="Ej: Barbería"
                            className="mt-2 w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-violet-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-zinc-400">
                            Precio CLP
                        </label>

                        <input
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="12000"
                            className="mt-2 w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-violet-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-zinc-400">
                            Duración en minutos
                        </label>

                        <input
                            name="duration_minutes"
                            type="number"
                            value={form.duration_minutes}
                            onChange={handleChange}
                            placeholder="30"
                            className="mt-2 w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-violet-500"
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <label className="text-sm text-zinc-400">
                            Descripción
                        </label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe brevemente el servicio..."
                            rows="3"
                            className="mt-2 w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-violet-500 resize-none"
                        />
                    </div>

                    <div className="lg:col-span-2 flex items-center justify-between gap-4 flex-wrap">
                        <label className="flex items-center gap-3 text-zinc-300">
                            <input
                                type="checkbox"
                                name="is_active"
                                checked={form.is_active}
                                onChange={handleChange}
                                className="w-5 h-5"
                            />
                            Servicio activo
                        </label>

                        <div className="flex gap-3">
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-3 rounded-2xl transition font-medium"
                                >
                                    Cancelar
                                </button>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-2xl transition font-medium disabled:opacity-50"
                            >
                                {loading
                                    ? "Guardando..."
                                    : editingId
                                    ? "Actualizar servicio"
                                    : "Crear servicio"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="grid xl:grid-cols-2 gap-6">
                {services.length === 0 ? (
                    <div className="xl:col-span-2 bg-white/5 border border-white/10 rounded-[2rem] p-8 text-zinc-400">
                        Aún no tienes servicios creados.
                    </div>
                ) : (
                    services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="inline-flex bg-violet-500/10 border border-violet-500/20 text-violet-300 px-3 py-1 rounded-xl text-xs">
                                        {service.category || "Sin categoría"}
                                    </div>

                                    <h3 className="mt-4 text-xl font-semibold">
                                        {service.name}
                                    </h3>

                                    <p className="mt-3 text-zinc-400">
                                        {service.description || "Sin descripción"}
                                    </p>
                                </div>

                                <div
                                    className={
                                        "px-3 py-1 rounded-xl text-xs border " +
                                        (service.is_active
                                            ? "bg-green-500/10 border-green-500/20 text-green-400"
                                            : "bg-red-500/10 border-red-500/20 text-red-400")
                                    }
                                >
                                    {service.is_active ? "Activo" : "Inactivo"}
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4">
                                <div className="bg-black/30 border border-white/10 rounded-2xl p-4">
                                    <p className="text-zinc-500 text-sm">
                                        Precio
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        {formatPrice(service.price)}
                                    </p>
                                </div>

                                <div className="bg-black/30 border border-white/10 rounded-2xl p-4">
                                    <p className="text-zinc-500 text-sm">
                                        Duración
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        {service.duration_minutes} min
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <button
                                    onClick={() => handleEdit(service)}
                                    className="flex-1 bg-white text-black hover:bg-zinc-200 py-3 rounded-2xl transition font-medium"
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() => handleDelete(service.id)}
                                    className="flex-1 bg-red-500/10 border border-red-500/20 text-red-300 hover:bg-red-500/20 py-3 rounded-2xl transition font-medium"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ServicesManager;