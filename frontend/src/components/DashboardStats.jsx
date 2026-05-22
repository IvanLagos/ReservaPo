function DashboardStats() {

    const stats = [
        {
            title: "Reservas hoy",
            value: "12",
            change: "+18%",
            icon: "📅",
            color: "violet",
        },
        {
            title: "Ingresos semanales",
            value: "$1.240.000",
            change: "+12%",
            color: "green",
        },
        {
            title: "Clientes nuevos",
            value: "48",
            change: "+24%",
            icon: "👥",
            color: "blue",
        },
        {
            title: "Ocupación",
            value: "87%",
            change: "+9%",
            icon: "📈",
            color: "orange",
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

            case "blue":
                return `
                    from-sky-500/20
                    to-cyan-500/20
                    border-sky-500/20
                `;

            case "orange":
                return `
                    from-orange-500/20
                    to-yellow-500/20
                    border-orange-500/20
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

            {stats.map((stat, index) => (

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
                        ` +
                        getColorStyles(stat.color)
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

                        {/* TOP */}
                        <div className="flex items-start justify-between gap-4">

                            <div>

                                <p className="text-zinc-400 text-sm">

                                    {stat.title}

                                </p>

                                <h2 className="mt-4 text-4xl font-semibold tracking-tight">

                                    {stat.value}

                                </h2>

                            </div>

                            {/* ICON */}
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

                                {stat.icon}

                            </div>

                        </div>

                        {/* CHANGE */}
                        <div className="mt-8 flex items-center gap-3">

                            <div
                                className="
                                    bg-green-500/10
                                    border
                                    border-green-500/20
                                    text-green-400
                                    px-3
                                    py-1
                                    rounded-xl
                                    text-sm
                                    font-medium
                                "
                            >

                                {stat.change}

                            </div>

                            <span className="text-zinc-500 text-sm">

                                comparado con la semana pasada

                            </span>

                        </div>

                    </div>

                </div>

            ))}

        </div>
    );
}

export default DashboardStats;