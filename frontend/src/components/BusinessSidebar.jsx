function BusinessSidebar({ activeTab, setActiveTab }) {

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

            {/* CARD */}
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

                        ✂️

                    </div>

                    <div>

                        <h2 className="text-lg font-semibold">

                            Luxury Barber

                        </h2>

                        <p className="text-zinc-400 text-sm mt-1">

                            Negocio verificado

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
                            onClick={() => setActiveTab(item.id)}
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
                                (
                                    activeTab === item.id
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
                                        `
                                )
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

                {/* QUICK INFO */}
                <div className="space-y-5">

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

                            Reservas hoy

                        </p>

                        <h3 className="mt-3 text-3xl font-semibold">

                            12

                        </h3>

                    </div>

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

                            Clientes esta semana

                        </p>

                        <h3 className="mt-3 text-3xl font-semibold">

                            48

                        </h3>

                    </div>

                </div>

                {/* FOOTER */}
                <div className="mt-8">

                </div>

            </div>

        </aside>
    );
}

export default BusinessSidebar;