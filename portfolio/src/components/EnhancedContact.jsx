import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FiSend,
  FiCheck,
  FiAlertCircle,
  FiMapPin,
  FiPhone,
  FiMail,
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

  const contactMethods = [
    {
      icon: <FiMapPin className="text-cyan-400 text-xl" />,
      title: "Location",
      value: "Thiruvambadi, Kozhikode, India",
    },
    {
      icon: <FiMail className="text-cyan-400 text-xl" />,
      title: "Email",
      value: "ajua46244@gmail.com",
    },
    {
      icon: <FiPhone className="text-cyan-400 text-xl" />,
      title: "Phone",
      value: "+91 9846 187150, +91 9074 483285",
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
      await axios.post("http://localhost:5000/api/send-email", formData);
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

  return (
    <section
      id="contact"
      className="py-28 px-4 bg-gradient-to-b from-gray-900 to-gray-800"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Touch
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach
            out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {contactMethods.map((method, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="p-3 bg-gray-800 rounded-lg">{method.icon}</div>
                <div>
                  <h3 className="text-white font-medium mb-1">
                    {method.title}
                  </h3>
                  <p className="text-gray-400">{method.value}</p>
                </div>
              </div>
            ))}

            <div className="h-80 w-full rounded-xl overflow-hidden mt-8">
              <iframe
                title="Muhammed Sahel CP's Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.552497379697!2d75.9324179!3d11.4245166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba63ef865ec7933%3A0x8b5e19a88d5d8c97!2sThiruvambadi%2C%20Kerala%20673404%2C%20India!5e0!3m2!1sen!2sin!4v1682176747491!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen=""
                loading="eager"
                rel="preload"
                style={{ filter: "grayscale(0.5) contrast(1.2) opacity(0.7)" }}
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            ref={formRef}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700"
          >
            <div className="space-y-6">
              <div>
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
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                />
              </div>

              <div>
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
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                />
              </div>

              <div>
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
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                />
              </div>

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

              {status.error && (
                <div className="mt-4 flex items-center gap-2 text-red-400">
                  <FiAlertCircle /> {status.error}
                </div>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default EnhancedContact;
