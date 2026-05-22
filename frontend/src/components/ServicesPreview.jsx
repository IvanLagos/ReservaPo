import ServiceCard from "./ServiceCard";

function ServicesPreview() {

  const services = [
    {
      title: "Barberías",
      image:
        "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Peluquería",
      image:
        "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Uñas",
      image:
        "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto mt-2 px-6 pb-24">

      <div className="mb-10">

        <h2 className="text-3xl md:text-4xl font-semibold">

          Servicios populares

        </h2>

        <p className="text-zinc-400 mt-2">

          Descubre lo más reservado cerca de ti.

        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {services.map((service, index) => (

          <ServiceCard
            key={index}
            title={service.title}
            image={service.image}
          />

        ))}

      </div>

    </section>
  );
}

export default ServicesPreview;