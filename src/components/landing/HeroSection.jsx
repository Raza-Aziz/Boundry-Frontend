import { Search } from "lucide-react";
import { Select, SelectSection, SelectItem } from "@heroui/select";

const quickTags = ["Waterfront", "Penthouses", "Modern", "Historic"];

export default function HeroSection() {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIcsbEGNufc1w1taTkWGxXG7oZqeuzrp1agrylcaZ0P3RFFwGMSKvdYp30NZs8vZ9NHlfrN6i-Dct0eEltYhrwE9UjPkB_Moe_qdecKep7S3mC4UbXZUokEmd8Xa6Wbb0RAzF5OS4ayf_fFUuuChTx4DZxSKYURqx4fBM5RUySB1UpR5pIhnajToiv3ep-zwSOLF-g6YFcIXiT_Z6EZzNJEF3dAWcm7GNw7ajV0eUnPVDXwryA0AD7rt7N17UdRZw3FTRyKBcEpg"
          alt="Modern luxury villa with pool at dusk"
          className="w-full h-full object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-boundry-bg-light" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center text-center">
        <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 drop-shadow-sm">
          Find Your Place
          <br />
          <span className="italic font-light">in the World.</span>
        </h1>
        <p className="text-white/90 text-lg md:text-xl font-light mb-10 max-w-2xl font-body">
          Discover a curated collection of the world's most extraordinary homes.
        </p>

        {/* Glassmorphic Search Bar */}
        {/* TODO : Add functionality to the search bar */}
        <div className="w-full glass-search p-2 md:p-3 rounded-2xl md:rounded-full shadow-2xl">
          <form className="flex flex-col md:flex-row items-center gap-2">
            {/* Location */}
            <div className="relative grow w-full md:w-auto px-4 py-2 border-b md:border-b-0 md:border-r border-white/10">
              <label className="block text-xs uppercase tracking-wider text-white/60 mb-1 ml-1">
                Location
              </label>
              <input
                type="text"
                placeholder="Los Angeles, CA"
                className="w-full bg-transparent border-none text-white placeholder-white/50 focus:ring-0 focus:outline-none p-0 text-lg font-medium"
              />
            </div>

            {/* Type */}
            <div className="relative w-full md:w-48 px-4 py-2 border-b md:border-b-0 md:border-r border-white/10">
              <label className="block text-xs uppercase tracking-wider text-white/60 mb-1 ml-1">
                Type
              </label>
              <select className="w-full bg-transparent border-none text-white focus:ring-0 focus:outline-none p-0 text-lg font-medium cursor-pointer [&>option]:text-black">
                <option>All Types</option>
                <option>House</option>
                <option>Condo</option>
                <option>Estate</option>
              </select>
            </div>

            {/* Price */}
            <div className="relative w-full md:w-48 px-4 py-2">
              <label className="block text-xs uppercase tracking-wider text-white/60 mb-1 ml-1">
                Price
              </label>
              <select className="w-full bg-transparent border-none text-white focus:ring-0 focus:outline-none p-0 text-lg font-medium cursor-pointer [&>option]:text-black">
                <option>Any Price</option>
                <option>$1M - $5M</option>
                <option>$5M - $10M</option>
                <option>$10M+</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              type="button"
              className="w-full md:w-auto bg-boundry-primary hover:bg-boundry-primary-dark text-white rounded-xl md:rounded-full p-4 transition-colors flex items-center justify-center shadow-lg cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Quick Tags */}
        <div className="mt-8 flex gap-4 text-white/80 text-sm font-medium">
          {quickTags.map((tag, i) => (
            <span key={tag} className="flex items-center gap-4">
              {i > 0 && <span className="text-white/30">•</span>}
              <span className="cursor-pointer hover:text-white transition-colors border-b border-transparent hover:border-white">
                {tag}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
