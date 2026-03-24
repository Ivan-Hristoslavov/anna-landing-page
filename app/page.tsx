import Hero from "@/components/Hero";
import Courses from "@/components/Courses";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-parchment">
      <Hero />
      <Courses />
      <Timeline />
      <Footer />
    </main>
  );
}
