import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      content:
        "Working with Muhammed was an absolute pleasure. His attention to detail and problem-solving skills helped us deliver our project ahead of schedule.",
      avatar: "/avatar1.jpg",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO at StartupX",
      content:
        "Exceptional frontend development skills. Muhammed transformed our complex requirements into a beautiful, user-friendly interface.",
      avatar: "/avatar2.jpg",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Lead at DesignHub",
      content:
        "Rarely do you find someone who combines technical expertise with such strong design sensibilities. Highly recommended!",
      avatar: "/avatar3.jpg",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-28 px-4 bg-gradient-to-b from-gray-800 to-gray-900"
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
            Client{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Testimonials
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            What people I've worked with say about my work
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-cyan-400/30 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <FaQuoteLeft className="text-cyan-400 text-2xl mb-4" />
              <p className="text-gray-300 mb-6 italic">{testimonial.content}</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400"
                />
                <div>
                  <h4 className="text-white font-medium">{testimonial.name}</h4>
                  <p className="text-cyan-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
