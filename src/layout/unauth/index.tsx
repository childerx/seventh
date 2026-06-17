import { Outlet } from "react-location";
import Footer from "./footer";
import Navbar from "./nav";
import { ModalProvider } from "@/context/modal-context";
import ContactModal from "@/components/core/contact-modal";
import ScrollToTop from "@/components/core/scroll-to-top";
import React, { Suspense } from "react";
import PageLoader from "@/components/core/page-loader";

export default function UnauthLayout() {
  return (
    <ModalProvider>
      <main className="w-full">
        <Navbar />

        <div className="w-full">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </div>

        <Footer />
      </main>

      <ContactModal />
      <ScrollToTop />
    </ModalProvider>
  );
}
