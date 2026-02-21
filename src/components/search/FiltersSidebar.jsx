import { Search, ChevronDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function FiltersSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilters = Object.fromEntries([...searchParams]);

  const [cityInput, setCityInput] = useState(currentFilters.city);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (cityInput) {
        setSearchParams({
          ...currentFilters,
          city: cityInput.toLocaleLowerCase(),
        });
      } else {
        // params.set()
        searchParams.delete("city");
        setCityInput(null);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [cityInput, currentFilters, searchParams, setSearchParams]);

  const handleTabChange = (newStatus) => {
    if (newStatus == "sale")
      setSearchParams({ ...currentFilters, status: "for-sale" });
    else if (newStatus == "rent")
      setSearchParams({ ...currentFilters, status: "for-rent" });
  };

  // Read current values (fall back to defaults)
  const minArea = Number(currentFilters.minAreaSqft ?? 1000);
  const maxArea = Number(currentFilters.maxAreaSqft ?? 5000);

  const handleAreaChange = (value) => {
    const [min, max] = value;

    setSearchParams({
      ...currentFilters,
      minAreaSqft: String(min),
      maxAreaSqft: String(max),
    });
  };

  const handleResetFilters = () => {
    setSearchParams({});
    setCityInput(null);
  };

  const handleBedroomCount = (count) => {
    if (count == "Any") {
      searchParams.delete("bedrooms");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ ...currentFilters, bedrooms: Number(count) });
    }
  };

  const handleBathroomCount = (count) => {
    if (count == "Any") {
      searchParams.delete("bathrooms");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ ...currentFilters, bathrooms: Number(count) });
    }
  };

  const handlePropertyTypeChange = (type) => {
    setSearchParams({ ...currentFilters, propertyType: type.toLowerCase() });
  };

  const handleClearSearch = () => {
    setCityInput(null);
    searchParams.delete("city");
    setSearchParams(searchParams);
  };

  return (
    <aside className="col-span-12 lg:col-span-3 xl:col-span-3 space-y-8 pr-4">
      <div className="sticky top-28 space-y-8 max-h-[calc(100vh-8rem)] overflow-y-auto pb-8 pr-4 custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl text-stone-900 dark:text-white font-medium">
            Filters
          </h2>
          <button
            onClick={handleResetFilters}
            className="text-xs text-boundry-primary hover:text-boundry-primary-dark font-medium uppercase cursor-pointer tracking-wide"
          >
            Reset All
          </button>
        </div>

        {/* Sale / Rent Toggle */}
        <div className="bg-white dark:bg-stone-800 p-1 rounded-lg  border border-stone-200 dark:border-stone-700 flex">
          <button
            onClick={() => handleTabChange("sale")}
            className={`flex-1 py-2 text-sm font-medium rounded-md cursor-pointer transition-all ${
              currentFilters.status == "for-sale"
                ? "bg-boundry-primary text-white shadow-sm"
                : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
            }`}
          >
            For Sale
          </button>
          <button
            onClick={() => handleTabChange("rent")}
            className={`flex-1 py-2 text-sm font-medium rounded-md cursor-pointer transition-all ${
              currentFilters.status == "for-rent"
                ? "bg-boundry-primary text-white shadow-sm"
                : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
            }`}
          >
            For Rent
          </button>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Location
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-lg" />
            <input
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-sm focus:ring-1 focus:ring-boundry-primary focus:border-boundry-primary placeholder-stone-400 font-body"
              placeholder="City, Neighborhood, or ZIP"
              type="text"
              onChange={(e) => setCityInput(e.target.value)}
            />
          </div>
          <button
            className="cursor-pointer text-boundry-primary-dark"
            onClick={handleClearSearch}
          >
            Clear Search
          </button>
        </div>

        {/* Square Feet */}
        <div className="space-y-4">
          <div className="mx-auto grid w-full max-w-xs gap-3">
            <div className="flex items-center justify-between gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Square Feet
              </label>
              <span className="text-muted-foreground text-sm">
                {minArea.toLocaleString()} - {maxArea.toLocaleString()} sqft
              </span>
            </div>
            <Slider
              id="sqft"
              value={[minArea, maxArea]}
              onValueChange={handleAreaChange}
              min={700}
              max={20000}
              step={50}
              className=" [&_span.bg-primary]:bg-boundry-primary"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Bedrooms
          </label>
          <div className="flex gap-2">
            {["Any", "2", "3", "4", "5"].map((bed) => (
              <button
                key={bed}
                onClick={() => handleBedroomCount(bed)}
                className={`w-10 h-10 rounded-full p border text-sm font-medium cursor-pointer transition-colors ${
                  (currentFilters.bedrooms || "Any") === bed
                    ? "border-boundry-primary bg-boundry-primary/5 text-boundry-primary"
                    : "border-stone-200 dark:border-stone-700 text-stone-600 hover:border-boundry-primary hover:text-boundry-primary"
                }`}
              >
                {bed}
              </button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Bathrooms
          </label>
          <div className="flex gap-2">
            {["Any", "2", "3", "4", "5"].map((bath) => (
              <button
                key={bath}
                onClick={() => handleBathroomCount(bath)}
                className={`w-10 h-10 rounded-full border text-sm font-medium cursor-pointer transition-colors ${
                  (currentFilters.bathrooms || "Any") === bath
                    ? "border-boundry-primary bg-boundry-primary/5 text-boundry-primary"
                    : "border-stone-200 dark:border-stone-700 text-stone-600 hover:border-boundry-primary hover:text-boundry-primary"
                }`}
              >
                {bath}
              </button>
            ))}
          </div>
        </div>

        {/* Property Type */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Property Type
          </label>
          <RadioGroup
            // Read from URL, default to empty if nothing selected
            value={searchParams.get("propertyType")}
            onValueChange={handlePropertyTypeChange}
            className="space-y-2"
          >
            {/* Include "Any" so users can deselect */}
            {/* <div className="flex items-center gap-3">
              <RadioGroupItem value="Any" id="any-type" />
              <Label htmlFor="any-type" className="cursor-pointer">
                Any Type
              </Label>
            </div>*/}

            {["House", "Apartment", "Villa", "Studio", "Office"].map((type) => (
              <div key={type} className="flex items-center gap-3">
                {/* value is lowercase to match model/URL, display is capitalized for UI */}
                <RadioGroupItem value={type.toLowerCase()} id={type} />
                <Label htmlFor={type} className="cursor-pointer">
                  {type}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Amenities */}
        {/* TODO : Keep them for later */}
        {/* <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Amenities (add functionality later)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {["Pool", "Gym", "View", "Waterfront", "Gated", "Theater"].map(
              (amenity) => (
                <label
                  key={amenity}
                  className="flex items-center space-x-2 cursor-pointer group"
                >
                  <Checkbox
                    checked={(currentFilters.amenities || []).includes(amenity)}
                    onCheckedChange={() => handleAmenitiesChange(amenity)}
                    className="h-4 w-4 text-boundry-primary rounded border-stone-300 focus:ring-boundry-primary/20"
                  />
                  <span className="text-sm text-stone-600 dark:text-stone-400 font-body">
                    {amenity}
                  </span>
                </label>
              ),
            )}
          </div>
        </div> */}

        {/* Listing Age */}
        <div className="space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Listing Age
          </label>
          <div className="relative group">
            <select className="w-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-sm text-stone-700 dark:text-stone-300 py-2.5 pl-3 pr-10 focus:ring-boundry-primary focus:border-boundry-primary font-body appearance-none cursor-pointer">
              <option>Any time</option>
              <option>Newest Listings</option>
              <option>Last 3 days</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Older</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none text-lg" />
          </div>
        </div>

        {/* Status */}
        {/* <div className="space-y-3 pb-8 border-b border-stone-200 dark:border-stone-700">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Status
          </label>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 cursor-pointer border border-green-200 dark:border-green-800">
              Active
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400 cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
              Coming Soon
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400 cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors">
              Pending
            </span>
          </div>
          </div> */}
      </div>
    </aside>
  );
}
