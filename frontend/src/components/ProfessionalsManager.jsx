import { useState } from "react";

function ProfessionalsManager() {

    const defaultAvatar =
        "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    const [showModal, setShowModal] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [professionals, setProfessionals] = useState(() => {

        const savedProfessionals = JSON.parse(
            localStorage.getItem("businessProfessionals")
        );

        if (savedProfessionals) {

            return savedProfessionals;

        }

        return [
            {
                id: 1,
                name: "Sebastián Morales",
                specialty: "Barbero Premium",
                experience: "6 años",
                phone: "+56 9 1234 5678",
                image:
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop",
            },
            {
                id: 2,
                name: "Valentina Pérez",
                specialty: "Colorista Profesional",
                experience: "8 años",
                phone: "+56 9 9999 2222",
                image:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop",
            },
        ];

    });

    const [newProfessional, setNewProfessional] = useState({
        name: "",
        specialty: "",
        experience: "",
        phone: "",
        image: "",
    });

    // SAVE
    const saveProfessionals = (updatedProfessionals) => {

        setProfessionals(updatedProfessionals);

        localStorage.setItem(
            "businessProfessionals",
            JSON.stringify(updatedProfessionals)
        );

    };

    // CREATE
    const createProfessional = () => {

        if (
            !newProfessional.name ||
            !newProfessional.specialty
        ) {

            alert("Completa los campos obligatorios.");

            return;

        }

        const professional = {
            id: crypto.randomUUID(),
            name: newProfessional.name,
            specialty: newProfessional.specialty,
            experience:
                newProfessional.experience || "No especificado",
            phone:
                newProfessional.phone || "No especificado",
            image:
                newProfessional.image || defaultAvatar,
        };

        const updated = [
            professional,
            ...professionals,
        ];

        saveProfessionals(updated);

        resetModal();

    };

    // EDIT
    const editProfessional = (professional) => {

        setEditingId(professional.id);

        setNewProfessional({
            name: professional.name,
            specialty: professional.specialty,
            experience: professional.experience,
            phone: professional.phone,
            image:
                professional.image === defaultAvatar
                    ? ""
                    : professional.image,
        });

        setShowModal(true);

    };

    // UPDATE
    const updateProfessional = () => {

        const updated = professionals.map((professional) => {

            if (professional.id === editingId) {

                return {
                    ...professional,
                    name: newProfessional.name,
                    specialty: newProfessional.specialty,
                    experience:
                        newProfessional.experience ||
                        "No especificado",
                    phone:
                        newProfessional.phone ||
                        "No especificado",
                    image:
                        newProfessional.image ||
                        defaultAvatar,
                };

            }

            return professional;

        });

        saveProfessionals(updated);

        resetModal();

    };

    // DELETE
    const deleteProfessional = (id) => {

        const confirmDelete = window.confirm(
            "¿Eliminar este profesional?"
        );

        if (!confirmDelete) return;

        const updated = professionals.filter(
            (professional) =>
                professional.id !== id
        );

        saveProfessionals(updated);

    };

    // RESET MODAL
    const resetModal = () => {

        setEditingId(null);

        setShowModal(false);

        setNewProfessional({
            name: "",
            specialty: "",
            experience: "",
            phone: "",
            image: "",
        });

    };

    return (
        <div className="space-y-8">

            {/* HEADER */}
            <div
                className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-[2rem]
                    p-8
                    backdrop-blur-xl
                "
            >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    <div>

                        <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-5 py-2 rounded-full text-sm">

                            💈 Gestión de profesionales

                        </div>

                        <h2 className="mt-5 text-3xl font-semibold">

                            Equipo del negocio

                        </h2>

                        <p className="mt-3 text-zinc-400 max-w-2xl">

                            Administra trabajadores, imágenes,
                            especialidades y perfiles del negocio.

                        </p>

                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="
                            bg-violet-500
                            hover:bg-violet-400
                            text-white
                            px-6
                            py-4
                            rounded-2xl
                            transition
                            font-medium
                        "
                    >

                        + Agregar profesional

                    </button>

                </div>

            </div>

            {/* GRID */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                {professionals.map((professional) => (

                    <div
                        key={professional.id}
                        className="
                            bg-white/5
                            border
                            border-white/10
                            rounded-[2rem]
                            overflow-hidden
                            backdrop-blur-xl
                        "
                    >

                        {/* IMAGE */}
                        <div className="relative">

                            <img
                                src={
                                    professional.image ||
                                    defaultAvatar
                                }
                                alt={professional.name}
                                className="w-full h-[320px] object-cover"
                            />

                            {professional.image ===
                                defaultAvatar && (

                                    <div
                                        className="
                                            absolute
                                            inset-0
                                            bg-black/50
                                            flex
                                            items-center
                                            justify-center
                                            text-white
                                            text-lg
                                            font-medium
                                        "
                                    >

                                        Imagen pendiente

                                    </div>

                                )}

                        </div>

                        {/* INFO */}
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

                                        Experiencia

                                    </p>

                                    <p className="mt-1">

                                        {professional.experience}

                                    </p>

                                </div>

                                <div>

                                    <p className="text-zinc-500 text-sm">

                                        Teléfono

                                    </p>

                                    <p className="mt-1">

                                        {professional.phone}

                                    </p>

                                </div>

                            </div>

                            {/* ACTIONS */}
                            <div className="mt-8 flex gap-4">

                                <button
                                    onClick={() =>
                                        editProfessional(
                                            professional
                                        )
                                    }
                                    className="
                                        flex-1
                                        bg-white/5
                                        border
                                        border-white/10
                                        hover:bg-white/10
                                        py-3
                                        rounded-2xl
                                        transition
                                    "
                                >

                                    Editar

                                </button>

                                <button
                                    onClick={() =>
                                        deleteProfessional(
                                            professional.id
                                        )
                                    }
                                    className="
                                        flex-1
                                        bg-red-500/10
                                        border
                                        border-red-500/20
                                        text-red-400
                                        hover:bg-red-500/20
                                        py-3
                                        rounded-2xl
                                        transition
                                    "
                                >

                                    Eliminar

                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

            {/* EMPTY */}
            {professionals.length === 0 && (

                <div
                    className="
                        bg-white/5
                        border
                        border-white/10
                        rounded-[2rem]
                        p-20
                        text-center
                    "
                >

                    <div className="text-7xl">

                        👥

                    </div>

                    <h2 className="mt-8 text-4xl font-semibold">

                        No hay profesionales

                    </h2>

                    <p className="mt-4 text-zinc-400">

                        Agrega profesionales para comenzar.

                    </p>

                </div>

            )}

            {/* MODAL */}
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

                                    Gestiona trabajadores del negocio.

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
                                value={newProfessional.name}
                                onChange={(e) =>
                                    setNewProfessional({
                                        ...newProfessional,
                                        name: e.target.value,
                                    })
                                }
                                className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                            />

                            <input
                                type="text"
                                placeholder="Especialidad"
                                value={newProfessional.specialty}
                                onChange={(e) =>
                                    setNewProfessional({
                                        ...newProfessional,
                                        specialty: e.target.value,
                                    })
                                }
                                className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                            />

                            <input
                                type="text"
                                placeholder="Experiencia"
                                value={newProfessional.experience}
                                onChange={(e) =>
                                    setNewProfessional({
                                        ...newProfessional,
                                        experience: e.target.value,
                                    })
                                }
                                className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                            />

                            <input
                                type="text"
                                placeholder="Teléfono"
                                value={newProfessional.phone}
                                onChange={(e) =>
                                    setNewProfessional({
                                        ...newProfessional,
                                        phone: e.target.value,
                                    })
                                }
                                className="bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
                            />

                            <input
                                type="text"
                                placeholder="URL imagen (opcional)"
                                value={newProfessional.image}
                                onChange={(e) =>
                                    setNewProfessional({
                                        ...newProfessional,
                                        image: e.target.value,
                                    })
                                }
                                className="md:col-span-2 bg-black/30 border border-white/10 rounded-2xl px-5 py-4 outline-none"
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
                                onClick={
                                    editingId
                                        ? updateProfessional
                                        : createProfessional
                                }
                                className="bg-violet-500 hover:bg-violet-400 px-8 py-4 rounded-2xl transition font-medium"
                            >

                                {editingId
                                    ? "Guardar cambios"
                                    : "Crear profesional"}

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default ProfessionalsManager;