import { useState } from "react";

const API_URL = "https://reservapo.onrender.com";

function ProfessionalsManager({
    business,
    professionals = [],
    refreshDashboard,
}) {
    const defaultAvatar =
        "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        name: "",
        specialty: "",
        phone: "",
        image_url: "",
    });

    const token = localStorage.getItem("token");

    function resetModal() {
        setEditingId(null);
        setShowModal(false);

        setForm({
            name: "",
            specialty: "",
            phone: "",
            image_url: "",
        });
    }

    function openCreateModal() {
        setEditingId(null);

        setForm({
            name: "",
            specialty: "",
            phone: "",
            image_url: "",
        });

        setShowModal(true);
    }

    function openEditModal(professional) {
        setEditingId(professional.id);

        setForm({
            name: professional.name || "",
            specialty: professional.specialty || "",
            phone: professional.phone || "",
            image_url:
                professional.image_url ||
                professional.image ||
                "",
        });

        setShowModal(true);
    }

    async function saveProfessional() {
        try {
            setSaving(true);

            if (!business?.id) {
                alert("No se encontró el negocio asociado.");
                return;
            }

            if (!form.name || !form.specialty) {
                alert("Nombre y especialidad son obligatorios.");
                return;
            }

            const payload = {
                business_id: business.id,
                name: form.name,
                specialty: form.specialty,
                phone: form.phone,
                image_url: form.image_url,
            };

            const url = editingId
                ? `${API_URL}/professionals/${editingId}`
                : `${API_URL}/professionals`;

            const method = editingId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "No se pudo guardar el profesional"
                );
            }

            resetModal();
            await refreshDashboard();
        } catch (error) {
            alert(error.message);
        } finally {
            setSaving(false);
        }
    }

    async function deleteProfessional(id) {
        const confirmDelete = window.confirm(
            "¿Seguro que deseas eliminar este profesional?"
        );

        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `${API_URL}/professionals/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "No se pudo eliminar el profesional"
                );
            }

            await refreshDashboard();
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-5 py-2 rounded-full text-sm">
                            💈 Gestión de profesionales
                        </div>

                        <h2 className="mt-5 text-3xl font-semibold">
                            Equipo del negocio
                        </h2>

                        <p className="mt-3 text-zinc-400 max-w-2xl">
                            Administra profesionales reales conectados a Neon.
                        </p>
                    </div>

                    <button
                        onClick={openCreateModal}
                        className="bg-violet-500 hover:bg-violet-400 text-white px-6 py-4 rounded-2xl transition font-medium"
                    >
                        + Agregar profesional
                    </button>
                </div>
            </div>

            {professionals.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-20 text-center">
                    <div className="text-7xl">👥</div>

                    <h2 className="mt-8 text-4xl font-semibold">
                        No hay profesionales
                    </h2>

                    <p className="mt-4 text-zinc-400">
                        Agrega profesionales para comenzar a recibir reservas.
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {professionals.map((professional) => {
                        const image =
                            professional.image_url ||
                            professional.image ||
                            defaultAvatar;

                        return (
                            <div
                                key={professional.id}
                                className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-xl"
                            >
                                <div className="relative">
                                    <img
                                        src={image}
                                        alt={professional.name}
                                        className="w-full h-[320px] object-cover"
                                    />

                                    {image === defaultAvatar && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg font-medium">
                                            Imagen pendiente
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold">
                                        {professional.name}
                                    </h3>

                                    <p className="mt-3 text-violet-400">
                                        {professional.specialty}
                                    </p>

                                    <div className="mt-6 space-y-4 text-zinc-400">
                                        <div>
                                            <p className="text-zinc-500 text-sm">
                                                Teléfono
                                            </p>

                                            <p className="mt-1">
                                                {professional.phone ||
                                                    "No especificado"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex gap-4">
                                        <button
                                            onClick={() =>
                                                openEditModal(professional)
                                            }
                                            className="flex-1 bg-white/5 border border-white/10 hover:bg-white/10 py-3 rounded-2xl transition"
                                        >
                                            Editar
                                        </button>

                                        <button
                                            onClick={() =>
                                                deleteProfessional(
                                                    professional.id
                                                )
                                            }
                                            className="flex-1 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 py-3 rounded-2xl transition"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-md flex items-center justify-center px-6">
                    <div className="w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-[2rem] p-8">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-3xl font-semibold">
                                    {editingId
                                        ? "Editar profesional"
                                        : "Nuevo profesional"}
                                </h2>

                                <p className="mt-2 text-zinc-400">
                                    Completa los datos del profesional.
                                </p>
                            </div>

                            <button
                                onClick={resetModal}
                                className="text-zinc-400 hover:text-white text-3xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="mt-10 grid md:grid-cols-2 gap-5">
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        name: e.target.value,
                                    })
                                }
                                className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                            />

                            <input
                                type="text"
                                placeholder="Especialidad"
                                value={form.specialty}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        specialty: e.target.value,
                                    })
                                }
                                className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                            />

                            <input
                                type="text"
                                placeholder="Teléfono"
                                value={form.phone}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        phone: e.target.value,
                                    })
                                }
                                className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                            />

                            <input
                                type="text"
                                placeholder="URL imagen"
                                value={form.image_url}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        image_url: e.target.value,
                                    })
                                }
                                className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                            />
                        </div>

                        <div className="mt-10 flex justify-end gap-4">
                            <button
                                onClick={resetModal}
                                className="bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-4 rounded-2xl transition"
                            >
                                Cancelar
                            </button>

                            <button
                                onClick={saveProfessional}
                                disabled={saving}
                                className="bg-violet-500 hover:bg-violet-400 px-8 py-4 rounded-2xl transition font-medium disabled:opacity-50"
                            >
                                {saving ? "Guardando..." : "Guardar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfessionalsManager;