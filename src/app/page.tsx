import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center p-10 bg-white/80 rounded-lg shadow-lg">
        <motion.h1
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to My Beautiful Page
        </motion.h1>
        <p className="text-lg text-gray-700 mb-6">
          Hello World! This is a beautifully styled home page using Next.js and
          Tailwind CSS.
        </p>
        <button className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
}
