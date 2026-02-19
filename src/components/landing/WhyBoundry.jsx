import { Gem, ShieldCheck, Gavel, Star } from "lucide-react";

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

export default function WhyBoundry() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Image */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-boundry-primary/10 rounded-full z-0" />
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8ZwwMol3z-4-JHIeJVIo0FnKLKD0qmLWRU75dTGpnuSng_vNl42cB3IHw1sHCGwv6UNl-0ysmxwXKDfU5xGA6dzT1ld1-AaJKFkCIkk0YwHvCIRUah7HtkSIJSJBFIBe7bQ83SWp7yp8TuBpL8wVGWbt88tgH-1HbrkwlQ4E8LM3kLI5fLoQXgWdn3BLlVwQzqUmzOWqoeSnZy-4uDBm_0dNZgEnuNW3disN3XcfTx407sRmq4uv_fAj8w-bCqXrFiq73mwjFAw"
              alt="Architectural detail of modern staircase"
              className="relative z-10 w-full h-[500px] object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-boundry-bg-light rounded-full z-0" />

            {/* Floating Stat Card */}
            <div className="absolute bottom-10 -left-6 z-20 bg-white p-6 rounded-xl shadow-glass border border-gray-100 max-w-xs">
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
            </div>
          </div>

          {/* Right — Content */}
          <div>
            <span className="text-boundry-primary text-sm font-bold tracking-[0.2em] uppercase mb-3 block">
              Why Boundry
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6">
              The New Standard in Luxury Real&nbsp;Estate.
            </h2>
            <p className="text-gray-500 mb-8 font-light leading-relaxed">
              We believe that buying a home should be as inspiring as living in
              one. Our approach combines cutting-edge technology with
              white-glove service to ensure your journey is seamless.
            </p>
            <div className="space-y-8">
              {features.map((f) => (
                <div key={f.title} className="flex gap-4">
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
