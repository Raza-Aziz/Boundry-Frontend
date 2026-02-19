import { Facebook, Instagram, AtSign } from "lucide-react";

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
          {/* Brand */}
          <div>
            <span className="flex items-center mb-6">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Boundry
              </span>
              <span className="h-1 w-1 rounded-full bg-boundry-primary mt-4" />
            </span>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
              Redefining luxury real estate with a focus on design, quality, and
              exceptional service. Find your place in the world.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-boundry-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-boundry-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-boundry-primary transition-colors"
              >
                <AtSign className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-medium mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:text-boundry-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Discover Links */}
          {/* TODO : Make into Link tags, to go to Search page, with filters and sorting done. */}
          <div>
            <h4 className="text-white font-medium mb-6">Discover</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-light">
              {discoverLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:text-boundry-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-medium mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4 font-light">
              Subscribe for the latest luxury listings and market insights.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-boundry-primary transition-colors placeholder-gray-500"
              />
              <button
                type="button"
                className="bg-boundry-primary hover:bg-boundry-primary-dark text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © 2025 Boundry Real Estate. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-500 text-xs">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
