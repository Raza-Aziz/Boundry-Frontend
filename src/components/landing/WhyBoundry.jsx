import { Gem, ShieldCheck, Gavel, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: Gem,
    title: "Concierge Service",
    description:
      "Dedicated agents who understand the nuances of the luxury market, available 24/7.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    description:
      "Every property is physically inspected and legally vetted before listing.",
  },
  {
    icon: Gavel,
    title: "Legal Support",
    description:
      "Comprehensive legal assistance throughout the transaction process.",
  },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const imageColVariants = {
  hidden: { opacity: 0, x: -48 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const statCardVariants = {
  hidden: { opacity: 0, x: -24, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.4 },
  },
};

const labelVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.1 },
  },
};

const subtextVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
  },
};

const featureListVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.3 },
  },
};

const featureItemVariants = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function WhyBoundry() {
  const { ref: imageRef, isInView: imageInView } = useScrollReveal(0.2);
  const { ref: contentRef, isInView: contentInView } = useScrollReveal(0.2);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Image Column */}
          <motion.div
            ref={imageRef}
            className="relative"
            variants={imageColVariants}
            initial="hidden"
            animate={imageInView ? "visible" : "hidden"}
          >
            {/* Decorative circle top-left */}
            <motion.div
              className="absolute -top-4 -left-4 w-24 h-24 bg-boundry-primary/10 rounded-full z-0"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={
                imageInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.5 }
              }
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            />

            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8ZwwMol3z-4-JHIeJVIo0FnKLKD0qmLWRU75dTGpnuSng_vNl42cB3IHw1sHCGwv6UNl-0ysmxwXKDfU5xGA6dzT1ld1-AaJKFkCIkk0YwHvCIRUah7HtkSIJSJBFIBe7bQ83SWp7yp8TuBpL8wVGWbt88tgH-1HbrkwlQ4E8LM3kLI5fLoQXgWdn3BLlVwQzqUmzOWqoeSnZy-4uDBm_0dNZgEnuNW3disN3XcfTx407sRmq4uv_fAj8w-bCqXrFiq73mwjFAw"
              alt="Architectural detail of modern staircase"
              className="relative z-10 w-full h-[500px] object-cover rounded-2xl shadow-2xl"
            />

            {/* Decorative circle bottom-right */}
            <motion.div
              className="absolute -bottom-6 -right-6 w-64 h-64 bg-boundry-bg-light rounded-full z-0"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={
                imageInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.6 }
              }
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            />

            {/* Floating Stat Card */}
            <motion.div
              className="absolute bottom-10 -left-6 z-20 bg-white p-6 rounded-xl shadow-glass border border-gray-100 max-w-xs"
              variants={statCardVariants}
              initial="hidden"
              animate={imageInView ? "visible" : "hidden"}
            >
              <div className="flex items-center gap-4">
                <div className="bg-boundry-primary/10 p-3 rounded-full text-boundry-primary">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-3xl font-serif font-bold text-gray-900">
                    4.9
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Customer Satisfaction
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Content Column */}
          <div ref={contentRef}>
            <motion.span
              className="text-boundry-primary text-sm font-bold tracking-[0.2em] uppercase mb-3 block"
              variants={labelVariants}
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
            >
              Why Boundry
            </motion.span>

            <motion.h2
              className="font-serif text-4xl md:text-5xl text-gray-900 mb-6"
              variants={headingVariants}
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
            >
              The New Standard in Luxury Real&nbsp;Estate.
            </motion.h2>

            <motion.p
              className="text-gray-500 mb-8 font-light leading-relaxed"
              variants={subtextVariants}
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
            >
              We believe that buying a home should be as inspiring as living in
              one. Our approach combines cutting-edge technology with
              white-glove service to ensure your journey is seamless.
            </motion.p>

            {/* Features — staggered slide-in from right */}
            <motion.div
              className="space-y-8"
              variants={featureListVariants}
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
            >
              {features.map((f) => (
                <motion.div
                  key={f.title}
                  className="flex gap-4"
                  variants={featureItemVariants}
                >
                  <div className="flex-shrink-0 mt-1">
                    <f.icon className="w-6 h-6 text-boundry-primary" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-gray-900 mb-2">
                      {f.title}
                    </h4>
                    <p className="text-gray-500 text-sm font-light">
                      {f.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
