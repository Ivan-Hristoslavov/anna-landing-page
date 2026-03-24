import Hero from "@/components/Hero";
import Courses from "@/components/Courses";
import Timeline from "@/components/Timeline";
import QRSection from "@/components/QRSection";
import Footer from "@/components/Footer";
import FloatingQR from "@/components/FloatingQR";

export default function Home() {
  return (
    <main className="min-h-screen bg-parchment">
      <Hero />
      <Courses />
      <Timeline />
      <QRSection />
      <Footer />
      <FloatingQR />
    </main>
  );
}
