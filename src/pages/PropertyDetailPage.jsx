import { MapPin, Home } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import { Link, useParams } from "react-router-dom";
import {
  useGetListingQuery,
  useGetSimilarListingsQuery,
} from "../store/api/listingsApi";
import PropertyAgentCard from "../components/listing/PropertyAgentCard";
import ImageGallery from "../components/search/ImageGallery";
import SearchPropertyCard from "../components/search/SearchPropertyCard";

export default function PropertyDetail() {
  const { id } = useParams();

  const {
    data: listing,
    isLoading,
    isError,
    error,
  } = useGetListingQuery(id, {
    skip: !id,
  });

  // TODO : Add a spinner for loading while the data is fetched
  const { data: similarListingsData, isLoading: isSimilarLoading } =
    useGetSimilarListingsQuery(
      {
        city: listing?.location?.city,
        status: listing?.status,
      },
      { skip: !listing },
    );

  // Map the data to a clean variable (adjust based on your API response structure)
  const similarListings =
    similarListingsData?.listings || similarListingsData || [];

  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  });

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F9F8F3]">
        <span className="font-serif text-2xl animate-pulse text-[#A3634B]">
          Boundry
        </span>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f7f6] dark:bg-[#1d1715] text-stone-800 dark:text-stone-200 font-[Inter] antialiased selection:bg-boundry-primary/30 selection:text-boundry-primary-dark min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        {/* Breadcrumbs & Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <nav
              aria-label="Breadcrumb"
              className="flex text-xs text-stone-500 mb-3"
            >
              <ol className="flex items-center space-x-2">
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <span className="text-stone-300">/</span>
                </li>
                <li>
                  <Link
                    to={`/search?city=${listing.location.city}`}
                    className="capitalize"
                  >
                    {listing.location.city}
                  </Link>
                </li>
                <li>
                  <span className="text-stone-300">/</span>
                </li>
                <li>
                  <span className="text-stone-800 dark:text-stone-200 capitalize font-medium">
                    {listing.location.area}
                  </span>
                </li>
              </ol>
            </nav>
            <h1 className="font-serif text-3xl md:text-4xl text-stone-900 dark:text-stone-100 leading-tight">
              {listing.title}
            </h1>
            <p className="mt-2 text-stone-500 text-lg font-light flex capitalize items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {listing.location.area}, {listing.location.city}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-3xl font-serif text-boundry-primary font-medium">
              {priceFormatter.format(listing.price)}
            </span>
            {listing.status === "for-rent" ? (
              <span className="text-sm text-stone-500">
                Est. {priceFormatter.format(listing.price / 12)} /mo
              </span>
            ) : null}
            {/* <span className="text-sm text-stone-500">Est. $87,420/mo</span>*/}
          </div>
        </div>

        {/* Bento Image Gallery */}
        <ImageGallery listing={listing} />

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Details */}
          <div className="lg:col-span-8 space-y-12">
            {/* Quick Specs Bar */}
            <div className="flex items-center justify-between py-6 border-y border-stone-200 dark:border-stone-800">
              <div className="flex flex-col items-center px-4 md:px-6">
                <span className="text-2xl font-serif text-stone-900 dark:text-white">
                  {listing.bedrooms}
                </span>
                <span className="text-xs uppercase tracking-wider text-stone-500">
                  Beds
                </span>
              </div>
              <div className="w-px h-10 bg-stone-200 dark:bg-stone-800"></div>
              <div className="flex flex-col items-center px-4 md:px-6">
                <span className="text-2xl font-serif text-stone-900 dark:text-white">
                  {listing.bathrooms}
                </span>
                <span className="text-xs uppercase tracking-wider text-stone-500">
                  Baths
                </span>
              </div>
              <div className="w-px h-10 bg-stone-200 dark:bg-stone-800"></div>
              <div className="flex flex-col items-center px-4 md:px-6">
                <span className="text-2xl font-serif text-stone-900 dark:text-white">
                  {listing.areaSqft}
                </span>
                <span className="text-xs uppercase tracking-wider text-stone-500">
                  Sq Ft
                </span>
              </div>
              <div className="w-px h-10 bg-stone-200 dark:bg-stone-800"></div>
              <div className="flex flex-col items-center px-4 md:px-6">
                <span className="text-2xl font-serif text-stone-900 dark:text-white">
                  {Math.ceil(listing.areaSqft / 9)}
                </span>
                <span className="text-xs uppercase tracking-wider text-stone-500">
                  Sq Yards
                </span>
              </div>
            </div>

            {/* Description */}
            <section>
              <h2 className="font-serif text-2xl text-stone-900 dark:text-white mb-4">
                About this home
              </h2>
              <div className="prose prose-stone dark:prose-invert max-w-none text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                <p className="mb-4">{listing.description}</p>
              </div>
            </section>

            {/* Location / Map */}
            <section>
              <h2 className="font-serif text-2xl text-stone-900 dark:text-white mb-4">
                Location
              </h2>
              {/* <p className="text-stone-600 dark:text-stone-400 mb-6">
                Located in The Flats, arguably the most desirable section of
                Beverly Hills due to its wide, tree-lined streets and proximity
                to world-class dining and shopping.
              </p>*/}
              <div className="rounded-xl overflow-hidden h-64 w-full bg-stone-200 relative">
                {/* Fallback/Static image map for design */}
                <img
                  alt="Map view of Beverly Hills area"
                  className="w-full h-full object-cover grayscale opacity-40 mix-blend-multiply"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5yNwqlki7fWA2UnaFoVvDObyLjRKXD97Gsv05qvvP3vwRCuoKZt6KWYkwnnpJFseIzPqXRL0MFjySofzGMh-orCq-VKv_jow9dkQWQTNevkPh7tcSfVF6IJ1H_pInDrq_hcuBeGlHDmmtPpAkattmkPWfRYBlqQRa_cVZviXcAcUxrUlVC3yoNsLbOggnHgMeQexqAJvvMu59IZS9CJZ3-kN-z1gdlzLM0M3vE8IKFQTRlvFGfUfyqoNHKSyddg5UZJyoCUoJoQ"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-boundry-primary text-white p-2 rounded-full shadow-lg ring-4 ring-white/30">
                    <Home className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          <PropertyAgentCard listing={listing} />
          {/* Right Column: Sticky Sidebar */}
        </div>

        {/* Similar Homes Section */}

        <section className="mt-20 border-t border-stone-200 dark:border-stone-800 pt-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl text-stone-900 dark:text-white capitalize">
              More{" "}
              {listing.status === "for-sale"
                ? `${listing.propertyType}s for Sale`
                : "Rent"}{" "}
              in {listing.location.city}
            </h2>
            <Link
              to={`/search?propertyType=${listing.propertyType}&city=${listing.location.city}&status=${listing.status}`}
              className="text-sm font-medium text-boundry-primary hover:text-boundry-primary-dark"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarListings.map((prop) => (
              <Link to={`/listing/${prop._id}`}>
                <SearchPropertyCard key={prop.id} property={prop} />
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Simple */}
      <Footer />
    </div>
  );
}
