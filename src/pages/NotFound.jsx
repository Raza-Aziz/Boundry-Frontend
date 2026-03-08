import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f7f7f6] dark:bg-[#1d1715] overflow-hidden px-6 relative">
      {/* Background Decorative Element */}
      <span className="absolute text-[20rem] md:text-[30rem] font-serif font-bold text-stone-200/40 dark:text-stone-800/20 select-none z-0">
        404
      </span>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* The Icon */}
        <div className="bg-white dark:bg-stone-800 p-5 rounded-full shadow-sm mb-8">
          <Home className="w-10 h-10 text-boundry-primary" />
        </div>

        {/* Content */}
        <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-white mb-4">
          Lost in the World?
        </h1>
        <p className="text-stone-500 dark:text-stone-400 text-lg font-light max-w-md mb-10 leading-relaxed">
          The sanctuary you are looking for doesn't exist or has been moved to
          another location.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors px-6 py-3 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          <Link
            to="/"
            className="bg-boundry-primary text-white px-10 py-3 rounded-full hover:bg-stone-900 transition-all shadow-xl shadow-boundry-primary/10 font-medium"
          >
            Return Home
          </Link>
        </div>
      </motion.div>

      {/* Subtle Bottom Branding */}
      <div className="absolute bottom-10 flex items-center gap-2 opacity-30">
        <span className="font-serif text-xl font-bold tracking-tight text-stone-900 dark:text-white">
          Boundry
        </span>
        <span className="h-1 w-1 rounded-full bg-boundry-primary mb-1" />
      </div>
    </div>
  );
}
