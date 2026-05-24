function DashboardStats({ stats }) {
    const cards = [
        {
            title: "Reservas hoy",
            value: stats?.todayReservations || 0,
            subtitle: "Citas registradas hoy",
            icon: "📅",
            color: "violet",
        },
        {
            title: "Confirmadas",
            value: stats?.confirmed || 0,
            subtitle: "Reservas confirmadas",
            icon: "✅",
            color: "green",
        },
        {
            title: "Pendientes",
            value: stats?.pending || 0,
            subtitle: "Esperando confirmación",
            icon: "⏳",
            color: "yellow",
        },
        {
            title: "Canceladas",
            value: stats?.cancelled || 0,
            subtitle: "Reservas canceladas",
            icon: "❌",
            color: "red",
        },
        {
            title: "Profesionales",
            value: stats?.professionals || 0,
            subtitle: "Equipo del negocio",
            icon: "💈",
            color: "blue",
        },
        {
            title: "Reservas totales",
            value: stats?.totalReservations || 0,
            subtitle: "Reservas registradas",
            icon: "📊",
            color: "orange",
        },
        {
            title: "Ocupación",
            value: `${stats?.occupation || 0}%`,
            subtitle: "Reservas activas",
            icon: "📈",
            color: "pink",
        },
    ];

    const getColorStyles = (color) => {
        switch (color) {
            case "violet":
                return `
                    from-violet-500/20
                    to-fuchsia-500/20
                    border-violet-500/20
                `;

            case "green":
                return `
                    from-green-500/20
                    to-emerald-500/20
                    border-green-500/20
                `;

            case "yellow":
                return `
                    from-yellow-500/20
                    to-orange-500/20
                    border-yellow-500/20
                `;

            case "red":
                return `
                    from-red-500/20
                    to-rose-500/20
                    border-red-500/20
                `;

            case "blue":
                return `
                    from-sky-500/20
                    to-cyan-500/20
                    border-sky-500/20
                `;

            case "orange":
                return `
                    from-orange-500/20
                    to-amber-500/20
                    border-orange-500/20
                `;

            case "pink":
                return `
                    from-pink-500/20
                    to-fuchsia-500/20
                    border-pink-500/20
                `;

            default:
                return `
                    from-white/10
                    to-white/5
                    border-white/10
                `;
        }
    };

    return (
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className={
                        `
                            relative
                            overflow-hidden
                            rounded-[2rem]
                            border
                            backdrop-blur-xl
                            bg-gradient-to-br
                            p-7
                            transition-all
                            duration-300
                            hover:scale-[1.02]
                            hover:border-white/20
                        ` + getColorStyles(card.color)
                    }
                >
                    {/* GLOW */}
                    <div
                        className="
                            absolute
                            top-[-60px]
                            right-[-60px]
                            w-[140px]
                            h-[140px]
                            rounded-full
                            bg-white/10
                            blur-3xl
                            pointer-events-none
                        "
                    ></div>

                    {/* CONTENT */}
                    <div className="relative z-10">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-zinc-400 text-sm">
                                    {card.title}
                                </p>

                                <h2 className="mt-4 text-4xl font-semibold tracking-tight">
                                    {card.value}
                                </h2>
                            </div>

                            <div
                                className="
                                    w-16
                                    h-16
                                    rounded-2xl
                                    bg-black/20
                                    border
                                    border-white/10
                                    flex
                                    items-center
                                    justify-center
                                    text-3xl
                                    shadow-lg
                                "
                            >
                                {card.icon}
                            </div>
                        </div>

                        <div className="mt-8">
                            <span className="text-zinc-400 text-sm">
                                {card.subtitle}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DashboardStats;