import PropertyCard from "./PropertyCard";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const properties = [
  {
    id: 1,
    price: "$12,500,000",
    name: "The Onyx Residence",
    location: "Beverly Hills, CA",
    beds: 6,
    baths: "7.5",
    sqft: "8,200",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAOxuqt6MSOMIhVWNLcQFdoGROYw-CNuL7jl1u3rO7YzzxPx6TugeC7f1ALrZmra_tpMyoX1pBknIvvtxfV2oV6hti1rfv_jwHpqjadUcf3tZzZutnAeqivCHpU-W01-WkyKrtpYOGDb05eOr_aJHFmAHzabZHR5a09RCxfJW2apPoFZENvhHOcwJVKvzrwqfGx92509K1aXOf-kOnsIKDrHz1Rlw7aI13SdAadRmxHgHarMDXkWWKQ4wDskDfcziOl_43PLdDnBw",
    badges: ["NEW", "VERIFIED"],
    agent: {
      name: "Alexander Sterling",
      agency: "Boundry Excl.",
      initials: "AS",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAdTntM70yGExbmDFrThMiujYqiU8s2IGgf7-hNl-ZN-VNa-4HdmPFQ5KydzZKdCOhc2ZNJZP6Eb605aiW6-jwO4ktTB2IZlPW9M2KyLx4tMOyTQ92F2e5uGfXSBFQ849-aQMOB8v0FlMmtPoOoweoLKVIYsuuKY5z9-fYJ-Rx3ileORhBOxaAceS73uOixVEqqZsO03zXFq2nuLyzXkmQ5yLQbUvMnne-IgcCDGW9krAVpEBcd5Or261U7fywkx5z_aavqtAW_tA",
    },
  },
  {
    id: 2,
    price: "$4,850,000",
    name: "Desert Oasis Estate",
    location: "Scottsdale, AZ",
    beds: 4,
    baths: "4",
    sqft: "4,500",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCw7Gsfx4Xt8f3PflTL3vKavs4rgtJkbl3LhT0qba36TGTYwFDMNOQeFRxdckOhiiOQqHKdFXbvK-7Ju3qH43kfDKkSb-HYY82QX_g9KiZ3JHAiKFRl0sAns6SMRhdNhWzahpYq1HhCWnlbXq21pp_LWEweULL8cwQjScYTaR4yN4H5oRXqTndT9CggETbvHo34jDR1dGenuVZv81S23Ql4PrD6HcNWUELLcYfipZyp9BPev5clCD0n_t3BBX8sZuSs85msBE7byg",
    badges: ["FEATURED"],
    agent: {
      name: "Alexander Sterling",
      agency: "Boundry Excl.",
      initials: "AS",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAdTntM70yGExbmDFrThMiujYqiU8s2IGgf7-hNl-ZN-VNa-4HdmPFQ5KydzZKdCOhc2ZNJZP6Eb605aiW6-jwO4ktTB2IZlPW9M2KyLx4tMOyTQ92F2e5uGfXSBFQ849-aQMOB8v0FlMmtPoOoweoLKVIYsuuKY5z9-fYJ-Rx3ileORhBOxaAceS73uOixVEqqZsO03zXFq2nuLyzXkmQ5yLQbUvMnne-IgcCDGW9krAVpEBcd5Or261U7fywkx5z_aavqtAW_tA",
    },
  },
  {
    id: 3,
    price: "$8,900,000",
    name: "Skyline Penthouse",
    location: "Manhattan, NY",
    beds: 3,
    baths: "3.5",
    sqft: "3,100",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbePwyCQ4GzdOzV2x-qzldsjPHwxGW-8wyuz2U1JxH0GoC8dZss9MoxFEVQrvMcX23WtGaGFcZPCHZdkX3249zKKo8--jat3W2Mb7RnHmwrW6MA__i83_070AvqLd1MOfzHt-FyGJE5z4JrCx7Zf91gJF_liPSJDdvNDwHPjT3PBpnzn_EWNxT_4XjbPcMCI2McvrbKmzmFmeq7IOVBk3IvOTZIayKGoBqrdA71mIrAWTZDfG9HcxSRQ7SA3_lJfZ76mkP2DfEFw",
    badges: [],
    agent: {
      name: "Alexander Sterling",
      agency: "Boundry Excl.",
      initials: "AS",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAdTntM70yGExbmDFrThMiujYqiU8s2IGgf7-hNl-ZN-VNa-4HdmPFQ5KydzZKdCOhc2ZNJZP6Eb605aiW6-jwO4ktTB2IZlPW9M2KyLx4tMOyTQ92F2e5uGfXSBFQ849-aQMOB8v0FlMmtPoOoweoLKVIYsuuKY5z9-fYJ-Rx3ileORhBOxaAceS73uOixVEqqZsO03zXFq2nuLyzXkmQ5yLQbUvMnne-IgcCDGW9krAVpEBcd5Or261U7fywkx5z_aavqtAW_tA",
    },
  },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.3 },
  },
};

// ─── Hook: fires once when element enters viewport ────────────────────────────

function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FeaturedListings() {
  const { ref: headerRef, isInView: headerInView } = useScrollReveal(0.3);
  const { ref: gridRef, isInView: gridInView } = useScrollReveal(0.1);
  const { ref: linkRef, isInView: linkInView } = useScrollReveal(0.5);

  return (
    <section className="relative py-24 overflow-hidden bg-boundry-bg-light">
      {/* Beams */}
      <div className="beam beam-1" />
      <div className="beam beam-2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
        >
          <span className="text-boundry-primary text-sm font-bold tracking-[0.2em] uppercase mb-3 block">
            Exclusive Listings
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">
            Curated Living
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-body font-light">
            Hand-picked estates for the discerning buyer, vetted for quality,
            location, and architectural significance.
          </p>
        </motion.div>

        {/* Grid — staggered cards */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={gridContainerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {properties.map((p) => (
            <motion.div key={p.id} variants={cardVariants}>
              <PropertyCard property={p} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Link */}
        <motion.div
          ref={linkRef}
          className="mt-12 text-center"
          variants={linkVariants}
          initial="hidden"
          animate={linkInView ? "visible" : "hidden"}
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-boundry-primary hover:text-boundry-primary-dark font-medium transition-colors border-b-2 border-boundry-primary/20 hover:border-boundry-primary pb-1"
          >
            View All Properties <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
