
import {  Outlet,  } from "react-location";
import Footer from "./footer";
import Navbar from "./nav";

export default function UnauthLayout() {
  return (
    <main className="w-full ">
     <Navbar />

      <div className="w-full">
        <Outlet />
      </div>

      <Footer />
    </main>
  );
}
