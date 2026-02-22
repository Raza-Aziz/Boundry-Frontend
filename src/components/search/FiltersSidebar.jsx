import { Search, CircleX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function FiltersSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilters = Object.fromEntries([...searchParams]);

  const [cityInput, setCityInput] = useState(currentFilters.city ?? "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (cityInput && cityInput.trim()) {
        params.set("city", cityInput.trim().toLowerCase());
      } else {
        params.delete("city");
      }
      setSearchParams(params, { replace: true });
    }, 500);

    return () => clearTimeout(timer);
  }, [cityInput, searchParams, setSearchParams]);

  const handleTabChange = (newStatus) => {
    if (newStatus == "sale")
      setSearchParams(
        { ...currentFilters, status: "for-sale" },
        { replace: true },
      );
    else if (newStatus == "rent")
      setSearchParams(
        { ...currentFilters, status: "for-rent" },
        { replace: true },
      );
  };

  // Read current values (fall back to defaults)
  const minArea = Number(currentFilters.minAreaSqft ?? 1000);
  const maxArea = Number(currentFilters.maxAreaSqft ?? 5000);

  const handleAreaChange = (value) => {
    const [min, max] = value;

    setSearchParams(
      {
        ...currentFilters,
        minAreaSqft: String(min),
        maxAreaSqft: String(max),
      },
      { replace: true },
    );
  };

  const handleResetFilters = () => {
    setSearchParams({}, { replace: true });
    setCityInput("");
  };

  const handleBedroomCount = (count) => {
    if (count == "Any") {
      searchParams.delete("bedrooms");
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams(
        { ...currentFilters, bedrooms: Number(count) },
        { replace: true },
      );
    }
  };

  const handleBathroomCount = (count) => {
    if (count == "Any") {
      searchParams.delete("bathrooms");
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams(
        { ...currentFilters, bathrooms: Number(count) },
        { replace: true },
      );
    }
  };

  const handlePropertyTypeChange = (type) => {
    setSearchParams(
      { ...currentFilters, propertyType: type.toLowerCase() },
      { replace: true },
    );
  };

  const handleClearSearch = () => {
    setCityInput("");
    searchParams.delete("city");
    setSearchParams(searchParams, { replace: true });
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
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              size={20}
            />
            <input
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-sm focus:ring-1 focus:ring-boundry-primary focus:border-boundry-primary placeholder-stone-400 font-body"
              placeholder="Search by City"
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
            />
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
            >
              <CircleX className="w-4 h-4" />{" "}
            </button>
          </div>
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
      </div>
    </aside>
  );
}
