import { Facebook, Instagram, AtSign } from "lucide-react";
import { Link } from "react-router-dom";

const companyLinks = ["About Us", "Careers", "Press", "Contact"];
const discoverLinks = [
  "New Listings",
  "Featured Properties",
  "House Prices",
  "Mortgage Calculator",
];

export default function Footer() {
  return (
    <footer className="bg-boundry-bg-dark text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section (Horizontal) */}
          <div className="flex flex-col items-start">
            <Link to="/" className="flex items-center group mb-6">
              {/* Logo Image */}
              <img
                src="/favicon.svg"
                className="w-15 -ml-3.5 brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                alt="Boundry Logo"
              />

              {/* Text and Dot */}
              <div className="flex items-baseline">
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  Boundry
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-boundry-primary ml-0.5 mb-1.5" />
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light max-w-[240px]">
              Redefining luxury real estate with a focus on design, quality, and
              exceptional service. Find your place in the world.
            </p>

            {/* Socials remain horizontal */}
            <div className="flex gap-4">
              <Link
                to="https://facebook.com"
                className="text-gray-500 hover:text-boundry-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                to="https://instagram.com"
                className="text-gray-500 hover:text-boundry-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                to="mailto:hello@boundry.com"
                className="text-gray-500 hover:text-boundry-primary transition-colors"
              >
                <AtSign className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-medium mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              {companyLinks.map((link) => (
                <li key={link}>
                  <Link
                    to={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="hover:text-boundry-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover Links - Functional Search Routing */}
          <div>
            <h4 className="text-white font-medium mb-6">Discover</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              {discoverLinks.map((link) => (
                <li key={link}>
                  <Link
                    to={`/search?city=${link}`}
                    className="hover:text-boundry-primary transition-colors capitalize"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-medium mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4 font-light leading-relaxed">
              Subscribe for the latest luxury listings and market insights.
            </p>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email Address"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-boundry-primary transition-colors placeholder-gray-500"
              />
              <button
                type="submit"
                className="bg-boundry-primary hover:bg-boundry-primary-dark text-white px-4 py-3 rounded-lg text-sm font-medium transition-all active:scale-[0.98] cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest">
            © 2026 Boundry Real Estate. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-500 text-[10px] uppercase tracking-widest">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
