import React from "react";
import logo from "@/assets/images/logoT.png";
import logoWhite from "@/assets/images/logoTwhite.png";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useTheme } from "@/context/theme-context";

const Footer: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: isDark ? "#0f172a" : "#ffffff",
        borderTop: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}`,
      }}
    >
      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[10vw] lg:text-[8vw] font-black whitespace-nowrap leading-none tracking-tighter opacity-[0.03]"
          style={{
            fontFamily: "var(--font-heading)",
            color: isDark ? "#ffffff" : "#000000",
          }}
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
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Connecting continents through fast, reliable, and convenient
              delivery solutions worldwide — international & domestic shipping.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    background: isDark
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.04)",
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
              {[
                "About Us",
                "Services",
                "Track Package",
                "Get Quote",
                "Contact",
              ].map((link) => (
                <li key={link}>
                  <a
                    href={link === "Contact" ? "#contact" : "#"}
                    className="text-sm hover:text-blue-600 transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link}
                  </a>
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
              {[
                "Air Freight",
                "Ground Shipping",
                "Express Delivery",
                "Customs Clearance",
                "Warehousing",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm hover:text-blue-600 transition-colors"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link}
                  </a>
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
                <span
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  +233 202812225
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: "var(--primary-red-light)" }}
                />
                <a
                  href={`mailto:zigibut24@gmail.com?subject=${encodeURIComponent("Seventh Air — New Inquiry")}&body=${encodeURIComponent("Dear Seventh Air Team,\n\nI am reaching out via your website to inquire about your international cargo and logistics services.\n\nI would like to know more about:\n- \n\nLooking forward to hearing from you.\n\nBest regards,\n")}`}
                  className="text-sm hover:text-blue-500 transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  info@seventhair.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                  style={{ color: "#22c55e" }}
                />
                <span
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Worldwide Delivery
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"
          style={{
            borderTop: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"}`,
          }}
        >
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
            © {new Date().getFullYear()} Seventh Air Limited. All rights
            reserved.
          </p>
          <div className="flex items-center space-x-1">
            <span className="text-sm" style={{ color: "var(--text-tertiary)" }}>
              Powered by
            </span>
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--primary-blue-light)" }}
            >
              Seventh Air
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
