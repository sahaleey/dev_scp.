import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";
import axios from "axios";

const Contact = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, success: false, error: "" });

    try {
      // inside Contact.jsx
      await axios.post("http://localhost:5000/api/send-email", formData);

      setStatus({ sending: false, success: true, error: "" });
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus({ ...status, success: false }), 3000);
    } catch (error) {
      setStatus({
        sending: false,
        success: false,
        error: error.response?.data?.message || "Failed to send message",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const inputFocusVariants = {
    focus: {
      boxShadow: "0 0 0 2px rgba(34, 211, 238, 0.5)",
      borderColor: "rgb(34, 211, 238)",
    },
  };

  return (
    <section
      id="contact"
      className="py-28 px-4 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.2, 0],
              scale: [0.5, 1.5],
              x: [0, (Math.random() - 0.5) * 200],
              y: [0, (Math.random() - 0.5) * 200],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
            className="absolute rounded-full bg-cyan-500/10"
            style={{
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(60px)",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Get In{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                Touch
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your visions.
            </p>
          </motion.div>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 shadow-lg"
          >
            <motion.div variants={itemVariants}>
              <label
                htmlFor="name"
                className="block text-gray-300 mb-2 font-medium"
              >
                Name
              </label>
              <motion.input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none transition-colors"
                whileFocus="focus"
                variants={inputFocusVariants}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6">
              <label
                htmlFor="email"
                className="block text-gray-300 mb-2 font-medium"
              >
                Email
              </label>
              <motion.input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none transition-colors"
                whileFocus="focus"
                variants={inputFocusVariants}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6">
              <label
                htmlFor="message"
                className="block text-gray-300 mb-2 font-medium"
              >
                Message
              </label>
              <motion.textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none transition-colors"
                whileFocus="focus"
                variants={inputFocusVariants}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <motion.button
                type="submit"
                disabled={status.sending}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  status.sending
                    ? "bg-gray-600 text-gray-400"
                    : "bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/20"
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
              </motion.button>
            </motion.div>

            {status.error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center gap-2 text-red-400"
              >
                <FiAlertCircle /> {status.error}
              </motion.div>
            )}
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
