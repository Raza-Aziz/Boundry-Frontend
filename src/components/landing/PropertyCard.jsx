import { Heart, MapPin, Bed, Bath, Ruler, BadgeCheck } from "lucide-react";

export const PropertyCard = ({ property }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-soft hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Badges */}
        {property.badges.length > 0 && (
          <div className="absolute top-4 left-4 flex gap-2">
            {property.badges.map((badge) =>
              badge === "VERIFIED" ? (
                <span
                  key={badge}
                  className="bg-boundry-primary/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white rounded-md shadow-sm flex items-center gap-1"
                >
                  <BadgeCheck className="w-3 h-3" /> VERIFIED
                </span>
              ) : (
                <span
                  key={badge}
                  className="bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-gray-900 rounded-md shadow-sm"
                >
                  {badge}
                </span>
              ),
            )}
          </div>
        )}

        {/* TODO : For like (Heart), check if logged in, then work. Else, go for login page. */}
        {/* Like */}
        {/* <button className="absolute top-4 right-4 bg-white/20 hover:bg-white backdrop-blur-md p-2 rounded-full text-white hover:text-red-500 transition-all cursor-pointer">
          <Heart className="w-[18px] h-[18px]" />
        </button>*/}
      </div>

      {/* Info */}
      <div className="p-6">
        <h3 className="font-serif text-2xl text-gray-900 group-hover:text-boundry-primary transition-colors mb-2">
          {property.price}
        </h3>
        <p className="font-medium text-gray-900 mb-1">{property.name}</p>
        <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5" /> {property.location}
        </p>
        <div className="flex items-center gap-6 border-t border-gray-100 pt-4 text-sm text-gray-600 font-body">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4 text-gray-400" /> {property.beds} Beds
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4 text-gray-400" /> {property.baths} Baths
          </div>
          <div className="flex items-center gap-1">
            <Ruler className="w-4 h-4 text-gray-400" /> {property.sqft} sqft
          </div>
        </div>
      </div>
    </div>
  );
};
