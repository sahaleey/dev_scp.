import { useState, useRef, useEffect } from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
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
import axios from "axios";

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
  const formRef = useRef();
  const controls = useAnimation();
  const floatX = useMotionValue(0);
  const floatY = useMotionValue(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const socialLinks = [
    {
      icon: <FiGithub />,
      url: "https://github.com/crazydrace",
      name: "GitHub",
    },
    { icon: <FiLinkedin />, url: "https://linkedin.com", name: "LinkedIn" },
    { icon: <FiTwitter />, url: "https://x.com/Dm_Sahal", name: "Twitter" },
    { icon: <FiMail />, url: "mailto:ajua46244@gmail.com", name: "Email" },
  ];

  const contactMethods = [
    {
      icon: <FiMapPin className="text-xl" />,
      title: "Location",
      value: "Thiruvambadi, Kozhikode, India",
      color: "#3f92f4",
    },
    {
      icon: <FiMail className="text-xl" />,
      title: "Email",
      value: "ajua46244@gmail.com",
      color: "#715adf",
    },
    {
      icon: <FiPhone className="text-xl" />,
      title: "Phone",
      value: "+91 9846 187150, +91 9074 483285",
      color: "#51cf66",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, success: false, error: "" });

    try {
      await axios.post(
        "https://dev-scp-h1u0.onrender.com/api/send-email",
        formData
      );
      setStatus({ sending: false, success: true, error: "" });
      setFormData({ name: "", email: "", message: "" });
      setTimeout(
        () => setStatus((prev) => ({ ...prev, success: false })),
        3000
      );
    } catch (err) {
      setStatus({
        sending: false,
        success: false,
        error: err.response?.data?.message || "Something went wrong.",
      });
    }
  };

  const handleMouseMove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    floatX.set((x - window.innerWidth / 2) / 50);
    floatY.set((y - window.innerHeight / 2) / 50);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    const interval = setInterval(() => setIsAnimating((prev) => !prev), 3000);

    // Background animation sequence
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [controls]);

  return (
    <section
      id="contact"
      className="relative min-h-screen py-28 px-4 bg-[#0c0c0f] text-white overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0f]/80 to-[#0c0c0f] z-0" />

        <FloatingBlob
          x={floatX}
          y={floatY}
          opacity={useTransform(floatY, [-10, 0, 10], [0.3, 0.5, 0.3])}
          scaleAnim={isAnimating ? [1, 1.2, 1] : [1, 0.8, 1]}
          className="top-1/4 left-1/4 w-32 h-32 bg-[#3f92f4]/10"
        />
        <FloatingBlob
          x={useTransform(floatX, (x) => -x * 1.5)}
          y={useTransform(floatY, (y) => -y * 1.5)}
          scaleAnim={isAnimating ? [1, 1.3, 1] : [1, 0.7, 1]}
          className="bottom-1/3 right-1/4 w-40 h-40 bg-[#715adf]/10"
        />

        {/* Floating tech icons */}
        {contactMethods.map((method, i) => (
          <motion.div
            key={i}
            className="absolute text-xl z-0"
            style={{
              color: method.color,
              top: `${10 + ((i * 15) % 80)}%`,
              left: `${5 + ((i * 10) % 80)}%`,
            }}
            animate={{
              y: [0, 10, 0],
              rotate: [0, 5, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            {method.icon}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Touch
            </span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Have a project in mind or want to collaborate? Feel free to reach
            out!
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex items-start gap-6 p-6 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-cyan-400/30 transition-all duration-300 backdrop-blur-sm"
              >
                <motion.div
                  className="p-3 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${method.color}80, ${method.color}40)`,
                  }}
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {method.icon}
                </motion.div>
                <div>
                  <h3 className="text-white font-medium mb-1 text-lg">
                    {method.title}
                  </h3>
                  <p className="text-gray-400">{method.value}</p>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              className="flex gap-4 justify-center lg:justify-start pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full text-gray-400 hover:text-white transition-colors hover:bg-gray-800"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>

            {/* Map */}
            <motion.div
              className="h-80 w-full rounded-2xl overflow-hidden mt-8 border border-gray-700"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.552497379697!2d75.9324179!3d11.4245166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba63ef865ec7933%3A0x8b5e19a88d5d8c97!2sThiruvambadi%2C%20Kerala%20673404%2C%20India!5e0!3m2!1sen!2sin!4v1682176747491!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen=""
                loading="lazy"
                style={{ filter: "grayscale(0.5) contrast(1.2) opacity(0.7)" }}
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            ref={formRef}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-cyan-400/30 transition-all duration-300"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label
                  htmlFor="name"
                  className="block text-gray-300 mb-2 font-medium"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label
                  htmlFor="email"
                  className="block text-gray-300 mb-2 font-medium"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label
                  htmlFor="message"
                  className="block text-gray-300 mb-2 font-medium"
                >
                  Your Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  type="submit"
                  disabled={status.sending}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all relative overflow-hidden ${
                    status.sending
                      ? "bg-gray-700 text-gray-400"
                      : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/30"
                  }`}
                  whileHover={!status.sending ? { scale: 1.02 } : {}}
                  whileTap={!status.sending ? { scale: 0.98 } : {}}
                >
                  {status.sending ? (
                    "Sending..."
                  ) : status.success ? (
                    <>
                      <FiCheck className="text-lg" /> Sent Successfully
                    </>
                  ) : (
                    <>
                      <FiSend className="text-lg" /> Send Message
                    </>
                  )}
                  {!status.sending && !status.success && (
                    <motion.span className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.3)_0,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                </motion.button>

                {status.error && (
                  <motion.div
                    className="mt-4 flex items-center gap-2 text-red-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <FiAlertCircle /> {status.error}
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const FloatingBlob = ({ x, y, opacity, scaleAnim, className }) => (
  <motion.div
    className={`absolute rounded-full blur-xl z-0 ${className}`}
    style={{ x, y, opacity }}
    animate={{ scale: scaleAnim }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  />
);

export default EnhancedContact;
