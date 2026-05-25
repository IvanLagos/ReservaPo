import { useState } from "react";

const API_URL = "https://reservapo.onrender.com";

function PasswordManager() {
    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setMessage("");
            setError("");

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/users/change-password`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(form),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "No se pudo cambiar la contraseña"
                );
            }

            setMessage("Contraseña actualizada correctamente.");

            setForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });

            setTimeout(() => {
                setMessage("");
            }, 3000);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl max-w-3xl">
            <div>
                <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 px-5 py-2 rounded-full text-sm">
                    🔐 Seguridad
                </div>

                <h2 className="mt-5 text-3xl font-semibold">
                    Cambiar contraseña
                </h2>

                <p className="mt-3 text-zinc-400">
                    Actualiza la contraseña de acceso de esta cuenta business.
                    La nueva clave se guardará protegida con bcrypt.
                </p>
            </div>

            {message && (
                <div className="mt-6 bg-green-500/10 border border-green-500/20 text-green-400 px-5 py-4 rounded-2xl">
                    {message}
                </div>
            )}

            {error && (
                <div className="mt-6 bg-red-500/10 border border-red-500/20 text-red-300 px-5 py-4 rounded-2xl">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                    <label className="text-sm text-zinc-400">
                        Contraseña actual
                    </label>

                    <input
                        type="password"
                        name="currentPassword"
                        value={form.currentPassword}
                        onChange={handleChange}
                        placeholder="Ingresa tu contraseña actual"
                        className="mt-2 w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-violet-500"
                    />
                </div>

                <div>
                    <label className="text-sm text-zinc-400">
                        Nueva contraseña
                    </label>

                    <input
                        type="password"
                        name="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                        placeholder="Mínimo 8 caracteres"
                        className="mt-2 w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-violet-500"
                    />
                </div>

                <div>
                    <label className="text-sm text-zinc-400">
                        Confirmar nueva contraseña
                    </label>

                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Repite la nueva contraseña"
                        className="mt-2 w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-violet-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white text-black hover:bg-zinc-200 py-4 rounded-2xl transition font-medium disabled:opacity-50"
                >
                    {loading ? "Actualizando..." : "Actualizar contraseña"}
                </button>
            </form>
        </div>
    );
}

export default PasswordManager;