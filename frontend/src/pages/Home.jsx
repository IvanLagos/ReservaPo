import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServicesPreview from "../components/ServicesPreview";

function Home() {
  return (
    <div className="bg-black text-white overflow-x-hidden min-h-screen relative">
      {/* GLOW */}
      <div className="fixed top-[-200px] left-[-200px] w-[500px] h-[500px] bg-violet-600 opacity-20 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="fixed bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-600 opacity-20 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10">
        <Navbar />

        <Hero />

        <ServicesPreview />
      </div>
    </div>
  );
}

export default Home;