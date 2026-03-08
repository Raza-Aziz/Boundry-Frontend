import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import {
  Flag,
  ShieldCheck,
  Lightbulb,
  Diamond,
  ArrowRight,
  Mail,
  Link2,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import aboutHeroBg from "../assets/about-hero-bg.png";

/* ──────────────────────────── Animation Variants ──────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" },
  }),
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ──────────────────────────── Reusable InView Wrapper ─────────────────────── */
function AnimatedSection({
  children,
  className = "",
  variants = fadeUp,
  custom = 0,
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      custom={custom}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ──────────────────────────── Timeline Data ───────────────────────────────── */
const timelineData = [
  {
    year: "2015",
    title: "The Foundation",
    description:
      "Founded in a small SoHo loft with a vision to digitize the analog world of high-end realty.",
    side: "left",
  },
  {
    year: "2018",
    title: "Expansion West",
    description:
      "Opened our flagship Beverly Hills office, securing record-breaking deals in the Hollywood Hills.",
    side: "right",
  },
  {
    year: "2021",
    title: "Global Reach",
    description:
      "Launched operations in London and Dubai, bringing our signature concierge model to international markets.",
    side: "left",
  },
  {
    year: "2023",
    title: "Boundry Tech",
    description:
      "Unveiled our proprietary AI-valuation engine, setting a new standard for data accuracy in luxury assets.",
    side: "right",
  },
];

/* ──────────────────────────── Value Cards Data ────────────────────────────── */
const values = [
  {
    icon: ShieldCheck,
    title: "Radical Integrity",
    description: "Transparency in every deal, vetting every square foot.",
  },
  {
    icon: Lightbulb,
    title: "Tech-Forward",
    description: "Using AI & AR to reimagine property viewing.",
  },
  {
    icon: Diamond,
    title: "Pure Excellence",
    description: "Setting the gold standard in luxury brokerage.",
  },
];

/* ──────────────────────────── Stats Data ──────────────────────────────────── */
const stats = [
  { value: "12", label: "Countries Served" },
  { value: "30+", label: "Metropolitan Offices" },
  { value: "500+", label: "Elite Agents" },
  { value: "24/7", label: "Concierge Support" },
];

/* ──────────────────────────── Team Data ───────────────────────────────────── */
const team = [
  {
    name: "Raza Aziz",
    role: "Founder & CEO",
    image: "https://github.com/Raza-Aziz",
  },
  {
    name: "James Sterling",
    role: "Head of Global Sales",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sarah Chen",
    role: "Chief Technology Officer",
    image:
      "https://images.unsplash.com/photo-1592621385612-4d7129426394?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Marcus Thorne",
    role: "Creative Director",
    image:
      "https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

/* ──────────────────────────── Map Locations ───────────────────────────────── */
const locations = [
  { name: "New York HQ", top: "32%", left: "22%", isPrimary: true },
  { name: "London", top: "30%", left: "48%", isPrimary: false },
  { name: "Dubai", top: "40%", left: "58%", isPrimary: false },
  { name: "Los Angeles", top: "35%", left: "15%", isPrimary: false },
  { name: "Tokyo", top: "35%", left: "78%", isPrimary: false },
];

/* ═══════════════════════════════════════════════════════════════════════════ */
/*                             MAIN COMPONENT                                */
/* ═══════════════════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <div className="bg-boundry-bg-light dark:bg-boundry-bg-dark text-boundry-text-dark dark:text-stone-100 font-display antialiased selection:bg-boundry-primary selection:text-white transition-colors duration-300">
      <Navbar />

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <header className="relative min-h-[70vh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={aboutHeroBg}
            alt="Modern luxury architecture at golden hour"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-boundry-bg-light dark:from-boundry-bg-dark via-boundry-bg-light/60 dark:via-boundry-bg-dark/60 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-boundry-bg-light/80 dark:from-boundry-bg-dark/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-16 pt-32 w-full">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-boundry-primary text-sm font-bold tracking-[0.2em] uppercase mb-4 block"
            >
              About Us
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white mb-6 leading-tight"
            >
              Curating the world's <br />
              <span className="italic text-gray-500 dark:text-stone-400">
                most exceptional
              </span>{" "}
              spaces.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-xl text-gray-500 dark:text-stone-400 font-light leading-relaxed max-w-2xl font-body"
            >
              Boundry isn't just a marketplace; it's a meticulously curated
              ecosystem where architectural masterpieces meet their future
              custodians. We bridge the gap between aspirational living and
              tangible reality.
            </motion.p>
          </div>
        </div>
      </header>

      {/* ═══════════════ BENTO GRID – MISSION, VISION, VALUES ═══════════════ */}
      <section className="py-12 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
          {/* Mission – Large Card */}
          <AnimatedSection
            className="md:col-span-2 lg:col-span-2 row-span-2 rounded-2xl p-8 relative overflow-hidden group bg-white dark:bg-stone-900/50 border border-gray-200 dark:border-stone-800 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:border-boundry-primary transition-all duration-300"
            variants={fadeUp}
            custom={0}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-boundry-primary/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-boundry-primary/10" />
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-boundry-primary/10 rounded-full flex items-center justify-center mb-6 text-boundry-primary">
                  <Flag className="w-5 h-5" />
                </div>
                <h2 className="font-serif text-3xl text-gray-900 dark:text-white mb-4">
                  Our Mission
                </h2>
                <p className="text-gray-500 dark:text-stone-400 font-light leading-relaxed">
                  To elevate the real estate experience by merging data-driven
                  insights with white-glove concierge service. We aim to make
                  the acquisition of luxury assets as seamless and inspiring as
                  the properties themselves.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-boundry-primary font-medium cursor-pointer group-hover:translate-x-1 transition-transform">
                Read our manifesto <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </AnimatedSection>

          {/* Vision – Dark Card */}
          <AnimatedSection
            className="md:col-span-1 lg:col-span-2 rounded-2xl p-8 bg-boundry-bg-dark dark:bg-stone-700/50 text-white relative overflow-hidden"
            variants={fadeUp}
            custom={1}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIcsbEGNufc1w1taTkWGxXG7oZqeuzrp1agrylcaZ0P3RFFwGMSKvdYp30NZs8vZ9NHlfrN6i-Dct0eEltYhrwE9UjPkB_Moe_qdecKep7S3mC4UbXZUokEmd8Xa6Wbb0RAzF5OS4ayf_fFUuuChTx4DZxSKYURqx4fBM5RUySB1UpR5pIhnajToiv3ep-zwSOLF-g6YFcIXiT_Z6EZzNJEF3dAWcm7GNw7ajV0eUnPVDXwryA0AD7rt7N17UdRZw3FTRyKBcEpg"
              alt="Vision background"
              className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
            <div className="relative z-10">
              <h3 className="font-serif text-2xl mb-3">The Vision</h3>
              <p className="text-gray-300 font-light text-sm">
                A world where every transaction is transparent, every home tells
                a story, and technology enhances—rather than replaces—the human
                connection in luxury real estate.
              </p>
            </div>
          </AnimatedSection>

          {/* Value Cards */}
          {values.map((v, i) => (
            <AnimatedSection
              key={v.title}
              className="rounded-2xl p-6 flex flex-col justify-center items-start bg-white dark:bg-stone-900/50 border border-gray-200 dark:border-stone-800 hover:bg-neutral-50 dark:hover:bg-stone-800/50 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:border-boundry-primary transition-all duration-300"
              variants={scaleIn}
              custom={i + 2}
            >
              <v.icon className="w-8 h-8 text-boundry-primary mb-3" />
              <h4 className="font-serif text-lg font-bold text-gray-900 dark:text-white">
                {v.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-stone-400 mt-2">
                {v.description}
              </p>
            </AnimatedSection>
          ))}

          {/* Stat Card */}
          <AnimatedSection
            className="rounded-2xl p-6 bg-[#d0e1f0]/20 dark:bg-[#d0e1f0]/5 border border-[#d0e1f0]/30 dark:border-[#d0e1f0]/10 flex flex-col items-center justify-center text-center hover:shadow-[0_10px_30_30px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300"
            variants={scaleIn}
            custom={5}
          >
            <span className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-1">
              $4.2B+
            </span>
            <span className="text-xs uppercase tracking-wider text-gray-600 dark:text-stone-400">
              in Total Sales
            </span>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════ TIMELINE – A LEGACY OF FIRSTS ═══════════════ */}
      <section className="py-24 bg-white dark:bg-boundry-bg-dark relative overflow-hidden transition-colors duration-300">
        {/* Dot pattern background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
              A Legacy of Firsts
            </h2>
            <p className="text-gray-500 dark:text-stone-400 max-w-2xl mx-auto font-light">
              From a boutique agency in SoHo to a global powerhouse, our journey
              has been defined by breaking boundaries.
            </p>
          </AnimatedSection>

          <div className="relative">
            {/* Center Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-200 hidden md:block" />

            <div className="space-y-12">
              {timelineData.map((item, idx) => (
                <TimelineItem key={item.year} item={item} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ GLOBAL PRESENCE ═══════════════ */}
      <section className="py-20 bg-boundry-bg-light dark:bg-boundry-bg-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left – Text */}
            <AnimatedSection variants={slideFromLeft}>
              <span className="text-boundry-primary text-sm font-bold tracking-[0.2em] uppercase mb-3 block">
                Global Presence
              </span>
              <h2 className="font-serif text-4xl text-gray-900 dark:text-white mb-6">
                Local Expertise.
                <br />
                Global Scale.
              </h2>
              <p className="text-gray-500 dark:text-stone-400 mb-8 font-light leading-relaxed">
                Our network of elite agents spans 12 countries and 30 major
                metropolitan areas. Whether you're looking for a penthouse in
                New York or a villa in Tuscany, Boundry connects you to the
                world's finest properties.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((s, i) => (
                  <AnimatedSection
                    key={s.label}
                    variants={scaleIn}
                    custom={i}
                    className="p-4 bg-white dark:bg-stone-900 rounded-lg shadow-sm border border-gray-100 dark:border-stone-800"
                  >
                    <span className="block text-3xl font-serif font-bold text-gray-900 dark:text-white mb-1">
                      {s.value}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-stone-400">
                      {s.label}
                    </span>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>

            {/* Right – Map */}
            <AnimatedSection
              variants={slideFromRight}
              className="relative h-[500px] w-full bg-white dark:bg-stone-900 rounded-2xl shadow-soft overflow-hidden border border-[#d0e1f0]/20 dark:border-[#d0e1f0]/10"
            >
              <div className="absolute inset-0 bg-[#f8fafc] dark:bg-stone-950">
                <svg
                  className="w-full h-full text-[#d0e1f0]/30 fill-current"
                  viewBox="0 0 800 500"
                >
                  <path
                    d="M100,150 Q150,100 200,150 T300,150 T400,200 T500,150 T600,200 T700,150"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    className="fill-[#d0e1f0]/20"
                    cx="180"
                    cy="180"
                    r="40"
                  />
                  <circle
                    className="fill-[#d0e1f0]/20"
                    cx="220"
                    cy="300"
                    r="30"
                  />
                  <circle
                    className="fill-[#d0e1f0]/20"
                    cx="400"
                    cy="160"
                    r="35"
                  />
                  <circle
                    className="fill-[#d0e1f0]/20"
                    cx="420"
                    cy="240"
                    r="35"
                  />
                  <circle
                    className="fill-[#d0e1f0]/20"
                    cx="580"
                    cy="180"
                    r="50"
                  />
                  <circle
                    className="fill-[#d0e1f0]/20"
                    cx="620"
                    cy="320"
                    r="25"
                  />
                </svg>
              </div>

              {locations.map((loc) => (
                <div
                  key={loc.name}
                  className="absolute group cursor-pointer"
                  style={{ top: loc.top, left: loc.left }}
                >
                  <motion.div
                    className={`w-3 h-3 rounded-full relative z-10 ${
                      loc.isPrimary ? "bg-boundry-primary" : "bg-gray-800"
                    }`}
                    animate={loc.isPrimary ? { scale: [1, 1.3, 1] } : {}}
                    transition={
                      loc.isPrimary
                        ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        : {}
                    }
                  />
                  {loc.isPrimary && (
                    <motion.div
                      className="w-8 h-8 bg-boundry-primary/20 rounded-full absolute -top-2.5 -left-2.5"
                      animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white dark:bg-stone-800 px-3 py-1 rounded-md shadow-lg text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    {loc.name}
                  </div>
                </div>
              ))}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════════ LEADERSHIP ═══════════════ */}
      <section className="py-24 bg-white dark:bg-boundry-bg-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-serif text-4xl text-gray-900 dark:text-white mb-2">
                Leadership
              </h2>
              <p className="text-gray-500 dark:text-stone-400 font-light">
                The visionaries shaping the future of Boundry.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <AnimatedSection key={member.name} variants={fadeUp} custom={i}>
                <div className="group">
                  <div className="relative overflow-hidden rounded-xl mb-4 aspect-3/4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                      <div className="flex gap-4">
                        <a
                          href="#"
                          className="text-white hover:text-boundry-primary transition-colors"
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                        <a
                          href="#"
                          className="text-white hover:text-boundry-primary transition-colors"
                        >
                          <Link2 className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-serif text-xl text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-boundry-primary uppercase tracking-wider font-medium">
                    {member.role}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ──────────────────────────── Timeline Item Component ─────────────────────── */
function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const isLeft = item.side === "left";

  return (
    <div
      ref={ref}
      className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
    >
      {/* Left content / spacer */}
      <div
        className={`w-full md:w-5/12 ${
          isLeft
            ? "text-center md:text-right order-2 md:order-1"
            : "order-3 md:order-1"
        }`}
      >
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="moving-border-card inline-block w-full"
          >
            <div className="moving-border-content p-6 bg-white dark:bg-stone-900 rounded-xl transition-colors">
              <span className="text-boundry-primary font-bold text-lg mb-2 block">
                {item.year}
              </span>
              <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 dark:text-stone-400 text-sm">
                {item.description}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={`w-4 h-4 rounded-full border-4 border-white dark:border-stone-800 shadow-lg z-10 ${
          index % 2 === 0
            ? "bg-boundry-primary"
            : "bg-gray-900 dark:bg-stone-400"
        } order-1 md:order-2`}
      />

      {/* Right content / spacer */}
      <div
        className={`w-full md:w-5/12 ${
          !isLeft
            ? "text-center md:text-left order-2 md:order-3"
            : "order-3 md:order-3"
        }`}
      >
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="moving-border-card inline-block w-full"
          >
            <div className="moving-border-content p-6 bg-white dark:bg-stone-900 rounded-xl transition-colors">
              <span className="text-boundry-primary font-bold text-lg mb-2 block">
                {item.year}
              </span>
              <h3 className="font-serif text-xl text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 dark:text-stone-400 text-sm">
                {item.description}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
