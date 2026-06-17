import React from "react";
import logo from "@/assets/images/logoT.png";
import logoWhite from "@/assets/images/logoTwhite.png";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-location";
import { useTheme } from "@/context/theme-context";
import { useModalContext } from "@/context/modal-context";

const Footer: React.FC = () => {
  const { isDark } = useTheme();
  const { openContactModal } = useModalContext();

  const quickLinks = [
    {
      label: "About Us",
      action: "route",
      href: "/about-us",
    },
    {
      label: "Track Package",
      action: "scroll",
      target: "tracking",
    },
    {
      label: "Contact Us",
      action: "modal",
    },
  ];

  const serviceLinks = [
    { label: "Air Freight", href: "/services#air-freight" },
    { label: "Ground Shipping", href: "/services#ground-shipping" },
    { label: "Express Delivery", href: "/services#express-delivery" },
    { label: "International", href: "/services#international" },
  ];

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: isDark ? "#0f172a" : "#ffffff",
        borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
      }}
    >
      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[10vw] lg:text-[8vw] font-black whitespace-nowrap leading-none tracking-tighter opacity-[0.03]"
          style={{ fontFamily: "var(--font-heading)", color: isDark ? "#ffffff" : "#000000" }}
        >
          SEVENTH AIR LIMITED
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <img
              src={isDark ? logoWhite : logo}
              alt="Seventh Air Logo"
              className="w-16 h-16 object-contain"
            />
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Connecting continents through fast, reliable, and convenient delivery solutions
              worldwide — international & domestic shipping.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.04)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="font-semibold text-sm tracking-wide uppercase mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.action === "route" && link.href ? (
                    <Link
                      to={link.href}
                      className="text-sm hover:text-blue-600 transition-colors"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {link.label}
                    </Link>
                  ) : link.action === "scroll" && link.target ? (
                    <button
                      onClick={() => handleScroll(link.target!)}
                      className="text-sm hover:text-blue-600 transition-colors text-left"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <button
                      onClick={openContactModal}
                      className="text-sm hover:text-blue-600 transition-colors text-left"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              className="font-semibold text-sm tracking-wide uppercase mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-blue-600 transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="font-semibold text-sm tracking-wide uppercase mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: "var(--primary-blue-light)" }}
                />
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  +233 202812225
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: "var(--primary-red-light)" }}
                />
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  info@seventhair.com
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: "#22c55e" }}
                />
                <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Worldwide Delivery
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
          style={{
            borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
          }}
        >
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
            © {new Date().getFullYear()} Seventh Air Limited. All rights reserved.
          </p>
          <div className="flex items-center space-x-1">
            <span className="text-sm" style={{ color: "var(--text-tertiary)" }}>
              Powered by
            </span>
            <span className="text-sm font-semibold" style={{ color: "var(--primary-blue-light)" }}>
              Seventh Air
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
