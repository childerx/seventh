import { Outlet } from "react-location";
import Footer from "./footer";
import Navbar from "./nav";
import { ModalProvider } from "@/context/modal-context";
import ContactModal from "@/components/core/contact-modal";
import ScrollToTop from "@/components/core/scroll-to-top";

export default function UnauthLayout() {
  return (
    <ModalProvider>
      <main className="w-full">
        <Navbar />

        <div className="w-full">
          <Outlet />
        </div>

        <Footer />
      </main>

      <ContactModal />
      <ScrollToTop />
    </ModalProvider>
  );
}
