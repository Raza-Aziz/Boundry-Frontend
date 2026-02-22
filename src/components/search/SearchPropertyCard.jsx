import { Heart, MapPin, Bed, Bath, Ruler } from "lucide-react";

export default function SearchPropertyCard({ property }) {
  const formatSqft = (areaSqft) => {
    return areaSqft.toLocaleString();
  };

  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  });

  return (
    <div className="group bg-white dark:bg-stone-800 rounded-xl overflow-hidden shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 border border-stone-100 dark:border-stone-800 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          alt={property.propertyType[0] || "Property"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={property.images[0]?.url}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>

        {/* Badges */}
        {property.badges && property.badges.length > 0 && (
          <div className="absolute top-4 left-4 flex gap-2">
            {property.badges.map((badge, index) => (
              <span
                key={index}
                className={`${
                  badge === "NEW" || badge === "FEATURED"
                    ? "bg-boundry-primary/90 backdrop-blur-sm"
                    : "bg-black/40 backdrop-blur-sm"
                } text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-sm`}
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Status Badge */}
        {property.status && (
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-xs font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded inline-block mb-1">
              {property.status === "for-rent" ? "For Rent" : "For Sale"}
            </p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-2xl text-stone-900 dark:text-white font-medium">
            {priceFormatter.format(property.price)}
          </h3>
        </div>
        <p className="text-gray-500 text-sm mb-4 flex capitalize items-center gap-1">
          <MapPin className="w-3.5 h-3.5" />{" "}
          {property.location.area + ", " + property.location.city}
        </p>
        {/* <p className="font-body text-sm text-stone-500 dark:text-stone-400 line-clamp-1 mb-4">
          {property.address}
        </p> */}
        <div className="flex items-center gap-4 text-stone-600 dark:text-stone-300 mb-6 font-body text-xs">
          <div className="flex items-center gap-1">
            <Bed className="text-boundry-primary text-base" />
            <span className="font-medium mt-1">{property.bedrooms}</span>
            <span className="text-stone-400 mt-1">Beds</span>
          </div>
          <div className="w-px h-3 bg-stone-300 dark:bg-stone-700"></div>
          <div className="flex items-center gap-1">
            <Bath className="text-boundry-primary text-base" />
            <span className="font-medium mt-1">{property.bathrooms}</span>
            <span className="text-stone-400 mt-1">Baths</span>
          </div>
          <div className="w-px h-3 bg-stone-300 dark:bg-stone-700"></div>
          <div className="flex items-center gap-1">
            <Ruler className="text-boundry-primary text-base" />
            <span className="font-medium mt-1">
              {formatSqft(property.areaSqft)}
            </span>
            <span className="text-stone-400 mt-1">Sqft</span>
          </div>
        </div>
        <div className="mt-auto pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {property.createdBy.avatar?.url ? (
              <img
                alt="Agent"
                className="w-6 h-6 rounded-full object-cover"
                src={property.createdBy.avatar?.url}
              />
            ) : (
              <div
                className={`w-6 h-6 rounded-full flex uppercase items-center justify-center text-[10px] font-bold bg-boundry-primary/20 text-boundry-primary`}
              >
                {property.createdBy.username?.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-xs text-stone-500 capitalize font-medium">
              {property.createdBy.username}
            </span>
          </div>
          {/* <span className="text-[10px] text-stone-400 font-medium uppercase tracking-wider">
            {property.agent.agency}
          </span>*/}
        </div>
      </div>
    </div>
  );
}
