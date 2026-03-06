import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const quickTags = ["Waterfront", "Penthouses", "Modern", "Historic"];

const cyclingWords = ["Place", "Sanctuary", "Haven", "Retreat", "Legacy"];

// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
  },
});

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay },
  },
});

const searchBarVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.55 },
  },
};

const tagContainerVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.85 },
  },
};

const tagItemVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const wordVariant = {
  enter: { opacity: 0, y: 15, filter: "blur(4px)" },
  center: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -15,
    filter: "blur(4px)",
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

export default function HeroSection() {
  const navigate = useNavigate();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % cyclingWords.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  const [filters, setFilters] = useState({
    location: "",
    type: "house",
    status: "for-sale",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filters.location) params.append("city", filters.location);
    if (filters.type !== "house") params.append("propertyType", filters.type);
    if (filters.status !== "for-sale") params.append("status", filters.status);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image — slow zoom on load */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIcsbEGNufc1w1taTkWGxXG7oZqeuzrp1agrylcaZ0P3RFFwGMSKvdYp30NZs8vZ9NHlfrN6i-Dct0eEltYhrwE9UjPkB_Moe_qdecKep7S3mC4UbXZUokEmd8Xa6Wbb0RAzF5OS4ayf_fFUuuChTx4DZxSKYURqx4fBM5RUySB1UpR5pIhnajToiv3ep-zwSOLF-g6YFcIXiT_Z6EZzNJEF3dAWcm7GNw7ajV0eUnPVDXwryA0AD7rt7N17UdRZw3FTRyKBcEpg"
          alt="Modern luxury villa with pool at dusk"
          className="w-full h-full object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-boundry-bg-light" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center text-center">
        {/* Headline */}
        <motion.h1
          className="font-serif text-5xl md:text-7xl text-white mb-6 drop-shadow-sm"
          variants={fadeUp(0.2)}
          initial="hidden"
          animate="visible"
        >
          {/* "Find Your" is static; only the cycling word animates */}
          Find Your{" "}
          <span className="inline-block relative" style={{ minWidth: "4ch" }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={cyclingWords[wordIndex]}
                className="inline-block italic font-light text-white"
                variants={wordVariant}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {cyclingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          <br />
          <span className="italic font-light">in the World.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-white/90 text-lg md:text-xl font-light mb-10 max-w-2xl font-body"
          variants={fadeUp(0.38)}
          initial="hidden"
          animate="visible"
        >
          Discover a curated collection of the world's most extraordinary homes.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          className="w-full glass-search p-2 md:p-3 rounded-2xl md:rounded-full shadow-2xl"
          variants={searchBarVariant}
          initial="hidden"
          animate="visible"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-center gap-2"
          >
            {/* Location */}
            <div className="relative grow w-full md:w-auto px-4 py-2 border-b md:border-b-0 md:border-r border-white/10">
              <label className="block text-xs uppercase tracking-wider text-white/60 mb-1 ml-1">
                City
              </label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
                placeholder="Karachi"
                className="w-full bg-transparent border-none text-white placeholder-white/50 focus:ring-0 focus:outline-none p-0 text-lg font-medium"
              />
            </div>

            {/* Type */}
            <div className="relative w-full md:w-48 px-4 py-2 border-b md:border-b-0 md:border-r border-white/10">
              <label className="block text-xs uppercase tracking-wider text-white/60 mb-1 ml-1">
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
                className="w-full bg-transparent border-none text-white focus:ring-0 focus:outline-none p-0 capitalize text-lg font-medium cursor-pointer [&>option]:text-black"
              >
                <option>house</option>
                <option>apartment</option>
                <option>villa</option>
                <option>studio</option>
                <option>office</option>
              </select>
            </div>

            {/* Status */}
            <div className="relative w-full md:w-48 px-4 py-2">
              <label className="block text-xs uppercase tracking-wider text-white/60 mb-1 ml-1">
                For
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="w-full capitalize bg-transparent border-none text-white focus:ring-0 focus:outline-none p-0 text-lg font-medium cursor-pointer [&>option]:text-black"
              >
                <option>for-sale</option>
                <option>for-rent</option>
              </select>
            </div>

            {/* Search Button */}
            <motion.button
              type="submit"
              className="w-full md:w-auto bg-boundry-primary hover:bg-boundry-primary-dark text-white rounded-xl md:rounded-full p-4 transition-colors flex items-center justify-center shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Search className="w-5 h-5" />
            </motion.button>
          </form>
        </motion.div>

        {/* Quick Tags — staggered */}
        <motion.div
          className="mt-8 flex gap-4 text-white/80 text-sm font-medium"
          variants={tagContainerVariant}
          initial="hidden"
          animate="visible"
        >
          {quickTags.map((tag, i) => (
            <motion.span
              key={tag}
              className="flex items-center gap-4"
              variants={tagItemVariant}
            >
              {i > 0 && <span className="text-white/30">•</span>}
              <span className="cursor-pointer hover:text-white transition-colors border-b border-transparent hover:border-white">
                {tag}
              </span>
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
