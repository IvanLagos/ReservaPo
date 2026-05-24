function BusinessSidebar({
    activeTab,
    setActiveTab,
    business,
}) {
    const items = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: "📊",
        },
        {
            id: "reservations",
            label: "Reservas",
            icon: "📅",
        },
        {
            id: "schedule",
            label: "Horarios",
            icon: "⏰",
        },
        {
            id: "professionals",
            label: "Profesionales",
            icon: "💈",
        },
    ];

    return (
        <aside
            className="
                hidden
                lg:flex
                flex-col
                w-[300px]
                min-h-[calc(100vh-112px)]
                px-6
                pb-10
            "
        >
            <div
                className="
                    bg-white/5
                    border
                    border-white/10
                    backdrop-blur-xl
                    rounded-[2rem]
                    p-6
                    sticky
                    top-28
                "
            >
                {/* BUSINESS */}
                <div className="flex items-center gap-4">
                    <div
                        className="
                            w-16
                            h-16
                            rounded-2xl
                            overflow-hidden
                            bg-gradient-to-br
                            from-violet-500
                            to-fuchsia-500
                            flex
                            items-center
                            justify-center
                            text-2xl
                            shadow-lg
                        "
                    >
                        {business?.image_url ? (
                            <img
                                src={business.image_url}
                                alt={business.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            "✂️"
                        )}
                    </div>

                    <div className="min-w-0">
                        <h2 className="text-lg font-semibold truncate">
                            {business?.name || "Mi negocio"}
                        </h2>

                        <p className="text-zinc-400 text-sm mt-1">
                            {business?.category ||
                                "Negocio verificado"}
                        </p>
                    </div>
                </div>

                {/* STATUS */}
                <div
                    className="
                        mt-6
                        bg-green-500/10
                        border
                        border-green-500/20
                        text-green-400
                        rounded-2xl
                        px-4
                        py-3
                        text-sm
                        flex
                        items-center
                        gap-2
                    "
                >
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>

                    Negocio activo
                </div>

                {/* NAVIGATION */}
                <div className="mt-8 space-y-3">
                    {items.map((item) => (
                        <button
                            key={item.id}
                            onClick={() =>
                                setActiveTab(item.id)
                            }
                            className={
                                `
                                    w-full
                                    flex
                                    items-center
                                    gap-4
                                    px-5
                                    py-4
                                    rounded-2xl
                                    transition-all
                                    duration-300
                                    border
                                ` +
                                (activeTab === item.id
                                    ? `
                                            bg-white
                                            text-black
                                            border-white
                                            shadow-lg
                                        `
                                    : `
                                            bg-white/5
                                            border-white/10
                                            hover:bg-white/10
                                            hover:border-violet-500/40
                                            text-white
                                        `)
                            }
                        >
                            <span className="text-xl">
                                {item.icon}
                            </span>

                            <span className="font-medium">
                                {item.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* DIVIDER */}
                <div className="my-8 h-px bg-white/10"></div>

                {/* BUSINESS DESCRIPTION */}
                <div
                    className="
                        bg-black/30
                        border
                        border-white/10
                        rounded-2xl
                        p-5
                    "
                >
                    <p className="text-zinc-500 text-sm">
                        Descripción
                    </p>

                    <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                        {business?.description ||
                            "Administra reservas, horarios y profesionales desde este panel."}
                    </p>
                </div>

                {/* FOOTER */}
                <div className="mt-8">
                    <div
                        className="
                            bg-violet-500/10
                            border
                            border-violet-500/20
                            rounded-2xl
                            p-5
                        "
                    >
                        <p className="text-violet-300 text-sm">
                            ReservaPo Business
                        </p>

                        <h3 className="mt-3 text-2xl font-bold">
                            SaaS Panel
                        </h3>

                        <p className="mt-2 text-zinc-400 text-sm leading-relaxed">
                            Gestiona tu negocio,
                            reservas y profesionales
                            desde un solo lugar.
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default BusinessSidebar;