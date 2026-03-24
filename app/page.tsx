import Hero from "@/components/Hero";
import Courses from "@/components/Courses";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import CookieBanner from "@/components/CookieBanner";
import { ContactProvider } from "@/app/contact-context";

export default function Home() {
  return (
    <ContactProvider>
      <main className="min-h-screen bg-parchment">
        <Hero />
        <Courses />
        <Timeline />
        <Footer />
        <ContactModal />
        <CookieBanner />
      </main>
    </ContactProvider>
  );
}
