import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import TextInput from "@/components/core/text-input";
import Modal from "@/components/core/modal";
import { useTheme } from "@/context/theme-context";
import { useModalContext } from "@/context/modal-context";
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
} from "@/constants/emailjs";

const ContactModal: React.FC = () => {
  const { isDark } = useTheme();
  const { isContactModalOpen, closeContactModal } = useModalContext();
  const [sending, setSending] = useState(false);

  const contactForm = useFormik({
    initialValues: { name: "", email: "", phone: "", message: "" },
    validationSchema: yup.object({
      name: yup.string().min(2, "Too short").required("Name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      phone: yup.string().min(7, "Invalid phone").required("Phone is required"),
      message: yup
        .string()
        .min(10, "At least 10 characters")
        .required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setSending(true);
      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: values.name,
            from_email: values.email,
            phone: values.phone,
            message: values.message,
            to_email: "opoku.ach@gmail.com",
          },
          EMAILJS_PUBLIC_KEY,
        );
        toast.success("Message sent!", {
          description: "We'll get back to you as soon as possible.",
        });
        resetForm();
        closeContactModal();
      } catch {
        toast.error("Failed to send message.", {
          description: "Please try again or contact us directly.",
        });
      } finally {
        setSending(false);
      }
    },
  });

  const contactInfo: {
    icon: React.ElementType;
    title: string;
    items: string[];
    href?: string;
    color: string;
  }[] = [
    {
      icon: Phone,
      title: "Phone Numbers",
      items: ["Ghana: +233 202812225", "UK: +447708211000"],
      color: "var(--primary-blue-light)",
    },
    {
      icon: Mail,
      title: "Email",
      items: ["info@seventhair.com"],
      href: `mailto:opoku.ach@gmail.com?subject=${encodeURIComponent("Seventh Air — New Inquiry")}&body=${encodeURIComponent("Dear Seventh Air Team,\n\nI am reaching out via your website to inquire about your international cargo and logistics services.\n\nI would like to know more about:\n- \n\nLooking forward to hearing from you.\n\nBest regards,\n")}`,
      color: "var(--primary-red-light)",
    },
    {
      icon: MapPin,
      title: "Service Areas",
      items: ["Worldwide — International & Domestic"],
      color: "#22c55e",
    },
  ];

  return (
    <Modal
      isOpen={isContactModalOpen}
      onClose={closeContactModal}
      title="Get In Touch"
    >
      <p className="mb-6" style={{ color: isDark ? "#94a3b8" : "#64748b" }}>
        Ready to ship? Fill in your details and we'll get back to you with a
        tailored quote.
      </p>

      <div className="space-y-5 mb-8">
        {contactInfo.map((info, idx) => (
          <motion.div
            key={idx}
            className="flex items-start space-x-4"
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${info.color}15` }}
            >
              <info.icon className="w-5 h-5" style={{ color: info.color }} />
            </div>
            <div>
              <h3
                className="font-semibold text-sm mb-1"
                style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}
              >
                {info.title}
              </h3>
              {info.items.map((item, i) =>
                info.href ? (
                  <a
                    key={i}
                    href={info.href}
                    className="text-sm hover:text-blue-500 transition-colors"
                    style={{ color: isDark ? "#94a3b8" : "#64748b" }}
                  >
                    {item}
                  </a>
                ) : (
                  <p
                    key={i}
                    className="text-sm"
                    style={{ color: isDark ? "#94a3b8" : "#64748b" }}
                  >
                    {item}
                  </p>
                ),
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div
        className="p-5 sm:p-6 rounded-2xl border"
        style={{
          background: isDark
            ? "rgba(30, 41, 59, 0.4)"
            : "rgba(248, 250, 252, 0.6)",
          borderColor: isDark
            ? "rgba(255, 255, 255, 0.08)"
            : "rgba(0, 0, 0, 0.06)",
        }}
      >
        <h3
          className="font-bold text-lg mb-4"
          style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}
        >
          Send a Message
        </h3>
        <form onSubmit={contactForm.handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              id="name"
              label="Full Name"
              placeholder="Full Name"
              values={contactForm.values}
              errors={contactForm.errors}
              touched={contactForm.touched}
              handleChange={contactForm.handleChange}
              handleBlur={contactForm.handleBlur}
            />
            <TextInput
              id="email"
              label="Email Address"
              type="email"
              placeholder="Email Address"
              values={contactForm.values}
              errors={contactForm.errors}
              touched={contactForm.touched}
              handleChange={contactForm.handleChange}
              handleBlur={contactForm.handleBlur}
            />
            <TextInput
              id="phone"
              label="Phone Number"
              type="tel"
              placeholder="Phone Number"
              className="sm:col-span-2"
              values={contactForm.values}
              errors={contactForm.errors}
              touched={contactForm.touched}
              handleChange={contactForm.handleChange}
              handleBlur={contactForm.handleBlur}
            />
            <textarea
              id="message"
              name="message"
              placeholder="Message / Package Details"
              rows={4}
              value={contactForm.values.message}
              onChange={contactForm.handleChange}
              onBlur={contactForm.handleBlur}
              className="sm:col-span-2 w-full px-4 py-3 bg-transparent rounded-xl border outline-none transition-all duration-200 resize-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] hover:border-blue-300/50 text-sm"
              style={{
                borderColor: "var(--border-primary)",
                color: "var(--text-primary)",
              }}
            />
            <motion.button
              type="submit"
              disabled={sending}
              className="sm:col-span-2 py-3 rounded-xl font-semibold text-base disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #1e40af 0%, #dc2626 100%)",
                color: "#ffffff",
              }}
              whileHover={sending ? {} : { scale: 1.02 }}
              whileTap={sending ? {} : { scale: 0.98 }}
            >
              {sending ? "Sending…" : "Send Message"}
            </motion.button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ContactModal;
