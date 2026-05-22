function ServiceCard({ title, image }) {

  return (
    <div className="group relative rounded-[2rem] overflow-hidden h-[420px] border border-white/10 cursor-pointer">

      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

      <div className="absolute bottom-6 left-6">

        <h3 className="text-3xl font-semibold">

          {title}

        </h3>

        <p className="mt-2 text-zinc-300">

          Explorar servicios

        </p>

      </div>

    </div>
  );
}

export default ServiceCard;