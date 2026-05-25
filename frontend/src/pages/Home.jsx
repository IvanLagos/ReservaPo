import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServicesPreview from "../components/ServicesPreview";

function Home() {
  return (
    <div className="relative bg-black text-white overflow-x-hidden min-h-screen w-full max-w-full">
      {/* GLOW */}
      <div className="pointer-events-none absolute top-[-180px] left-[-120px] w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] bg-violet-600 opacity-20 blur-[100px] sm:blur-[120px] rounded-full"></div>

      <div className="pointer-events-none absolute bottom-[-180px] right-[-120px] w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] bg-fuchsia-600 opacity-20 blur-[100px] sm:blur-[120px] rounded-full"></div>

      <Navbar />

      <Hero />

      <ServicesPreview />
    </div>
  );
}

export default Home;