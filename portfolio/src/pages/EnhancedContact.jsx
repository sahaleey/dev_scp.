import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  FiSend,
  FiCheck,
  FiAlertCircle,
  FiMapPin,
  FiPhone,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const EnhancedContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({
    sending: false,
    success: false,
    error: "",
  });
  const floatX = useMotionValue(0);
  const floatY = useMotionValue(0);

  const socialLinks = [
    {
      icon: <FiGithub />,
      url: "https://github.com/sahaleey",
      name: "GitHub",
      color: "hover:text-gray-800 dark:hover:text-gray-200",
    },
    {
      icon: <FiLinkedin />,
      url: "https://www.linkedin.com/in/muhammed-sahel-cp-12930b367/",
      name: "LinkedIn",
      color: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      icon: <FiTwitter />,
      url: "https://x.com/Dm_Sahal",
      name: "Twitter",
      color: "hover:text-sky-500 dark:hover:text-sky-400",
    },
    {
      icon: <FiMail />,
      url: "mailto:ajua46244@gmail.com",
      name: "Email",
      color: "hover:text-red-500 dark:hover:text-red-400",
    },
    {
      icon: <FaWhatsapp />,
      url: "https://wa.me/919846187150",
      name: "WhatsApp",
      color: "hover:text-green-500 dark:hover:text-green-400",
    },
  ];

  const contactMethods = [
    {
      icon: <FiMapPin className="text-xl" />,
      title: "Location",
      value: "Thiruvambadi, Kozhikode, India",
      color: "#3b82f6",
      link: "https://maps.google.com/?q=Thiruvambadi,Kozhikode,India",
    },
    {
      icon: <FiMail className="text-xl" />,
      title: "Email",
      value: "ajua46244@gmail.com",
      color: "#8b5cf6",
      link: "mailto:ajua46244@gmail.com",
    },
    {
      icon: <FiPhone className="text-xl" />,
      title: "Phone",
      value: "+91 9846 187150, +91 90744 83285",
      color: "#10b981",
      link: "tel:+919846187150",
    },
    {
      icon: <FaWhatsapp className="text-xl" />,
      title: "WhatsApp",
      value: "Instant Chat Available",
      color: "#22c55e",
      link: "https://wa.me/919846187150",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ sending: true, success: false, error: "" });
    try {
      const phoneNumber = "919846187150";
      const message = `Hello! I'm ${formData.name} (${formData.email}).%0A%0A${formData.message}`;
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(whatsappURL, "_blank");
      setStatus({ sending: false, success: true, error: "" });
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setStatus((prev) => ({ ...prev, success: false }));
      }, 3000);
    } catch {
      setStatus({
        sending: false,
        success: false,
        error: "Something went wrong. Please try again.",
      });
    }
  };

  const handleMouseMove = (e) => {
    floatX.set((e.clientX - window.innerWidth / 2) / 80);
    floatY.set((e.clientY - window.innerHeight / 2) / 80);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="contact"
      className="relative min-h-screen py-20 px-4 
      bg-gradient-to-b from-white to-gray-100 
      dark:from-black dark:to-gray-900
      transition-colors duration-500 overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 dark:opacity-15 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating Orbs like Hero */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-40"
        style={{
          x: useTransform(floatX, (v) => v * 2),
          y: useTransform(floatY, (v) => v * 2),
          background:
            "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] rounded-full blur-3xl opacity-30"
        style={{
          x: useTransform(floatX, (v) => -v * 2),
          y: useTransform(floatY, (v) => -v * 2),
          background:
            "radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 dark:bg-cyan-400/10 border border-blue-500/20 dark:border-cyan-400/20 mb-6">
            <span className="w-2 h-2 bg-blue-500 dark:bg-cyan-400 rounded-full animate-pulse"></span>
            <p className="text-sm font-medium text-blue-600 dark:text-cyan-300">
              Contact Me
            </p>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-600 to-cyan-600 dark:from-white dark:via-cyan-300 dark:to-blue-300 bg-clip-text text-transparent">
            Let's Talk
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Whether it’s a project, a collab, or just a quick hello — I’m one
            message away.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactMethods.map((m, i) => (
              <a
                key={i}
                href={m.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-6 p-6 rounded-2xl 
                bg-white/70 dark:bg-gray-800/70 border border-gray-200/40 dark:border-gray-700/40
                hover:border-blue-400 dark:hover:border-cyan-400/50 hover:shadow-lg transition-all"
              >
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${m.color}20, ${m.color}10)`,
                    border: `1px solid ${m.color}30`,
                  }}
                >
                  {m.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {m.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{m.value}</p>
                </div>
              </a>
            ))}

            <div className="flex gap-4 justify-center lg:justify-start pt-4">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-2xl 
                  bg-white/70 dark:bg-gray-800/70 border border-gray-200/40 dark:border-gray-700/40
                  text-gray-600 dark:text-gray-400 ${s.color} hover:scale-110 transition-all`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-white/70 dark:bg-gray-800/70 border border-gray-200/40 dark:border-gray-700/40 backdrop-blur-sm"
          >
            <FormField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <FormField
              label="Message"
              name="message"
              type="textarea"
              value={formData.message}
              onChange={handleChange}
            />

            <motion.button
              type="submit"
              disabled={status.sending}
              className={`w-full mt-6 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold 
              transition-all ${
                status.sending
                  ? "bg-gray-400 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                  : status.success
                  ? "bg-green-500 text-white"
                  : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/25"
              }`}
            >
              {status.sending ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  Opening WhatsApp...
                </>
              ) : status.success ? (
                <>
                  <FiCheck /> Message Ready!
                </>
              ) : (
                <>
                  <FaWhatsapp /> Send via WhatsApp
                </>
              )}
            </motion.button>

            {status.error && (
              <div className="flex items-center gap-2 mt-4 text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <FiAlertCircle /> {status.error}
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const FormField = ({ label, name, type = "text", value, onChange }) => (
  <div className="mb-5">
    <label
      htmlFor={name}
      className="block text-gray-700 dark:text-gray-300 mb-2 font-medium"
    >
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        name={name}
        id={name}
        rows="5"
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 
        text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400"
        required
      />
    ) : (
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-600 
        text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-400"
        required
      />
    )}
  </div>
);

export default EnhancedContact;
