import FiltersSidebar from "../components/search/FiltersSidebar";
import SearchPropertyCard from "../components/search/SearchPropertyCard";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";

import { useSearchParams } from "react-router-dom";
import { useGetListingsQuery } from "../store/api/listingsApi";

export default function SearchPage() {
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("newest");

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const currentFilters = {
    ...Object.fromEntries([...searchParams]),
    page,
    sortBy,
    sortOrder,
  };

  const { data, isLoading, isError, error } =
    useGetListingsQuery(currentFilters);

  const totalPages = data?.totalPages || 1;
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);

    if (newPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", newPage);
    }

    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-stone-800 dark:text-stone-200 font-display antialiased selection:bg-primary/30 selection:text-primary-dark">
      <Navbar />
      {/* Main Content Area */}
      <div className="max-w-[1600px] mt-12 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <FiltersSidebar />

          {/* Listings */}
          <main className="col-span-12 lg:col-span-9 xl:col-span-9 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center mt-8 justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
              <h1 className="text-xl md:text-2xl font-serif text-stone-900 dark:text-white">
                <span className="font-normal">
                  {data?.totalMatches || 0}{" "}
                  {data?.totalMatches === 1 ? "Property" : "Properties"} Found
                </span>
              </h1>
              <div className="flex gap-3">
                <div className="relative group">
                  <Select
                    onValueChange={(value) => {
                      if (value === "newest" || value === "oldest") {
                        setSortBy("createdAt");
                        setSortOrder(value); // or map to "asc"/"desc" if backend expects that
                      } else if (value.startsWith("price-")) {
                        setSortBy("price");
                        setSortOrder(value === "price-desc" ? "desc" : "asc");
                      } else if (value.startsWith("sqft-")) {
                        setSortBy("areaSqft");
                        setSortOrder(value === "sqft-desc" ? "desc" : "asc");
                      }
                    }}
                  >
                    <SelectTrigger className="w-full max-w-80 text-stone-700 dark:text-stone-300 font-medium hover:text-primary cursor-pointer focus:outline-none font-body">
                      <SelectValue placeholder="Sort by Price or Area" />
                    </SelectTrigger>

                    <SelectContent position="popper">
                      <SelectGroup>
                        <SelectLabel>Sort by Date</SelectLabel>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                      </SelectGroup>

                      <SelectSeparator />

                      <SelectGroup>
                        <SelectLabel>Sort by Price</SelectLabel>
                        <SelectItem value="price-desc">
                          Price (High to Low)
                        </SelectItem>
                        <SelectItem value="price-asc">
                          Price (Low to High)
                        </SelectItem>
                      </SelectGroup>

                      <SelectSeparator />

                      <SelectGroup>
                        <SelectLabel>Sort by Area</SelectLabel>
                        <SelectItem value="sqft-desc">
                          Sqft (High to Low)
                        </SelectItem>
                        <SelectItem value="sqft-asc">
                          Sqft (Low to High)
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {/* TODO : If isLoading is true, show your Skeleton loaders. */}
              {data?.listings?.map((prop) => (
                <SearchPropertyCard key={prop.id} property={prop} />
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="flex justify-center pt-12 pb-8">
              <Pagination>
                <PaginationContent className="w-full justify-between">
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(page - 1)}
                      className={`border cursor-pointer ${page <= 1 ? "pointer-events-none opacity-50" : ""}`}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <p
                      className="text-muted-foreground text-sm"
                      aria-live="polite"
                    >
                      Page <span className="text-foreground">{page}</span> of{" "}
                      <span className="text-foreground">{totalPages}</span>
                    </p>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(page + 1)}
                      className={`border cursor-pointer ${page >= totalPages ? "pointer-events-none opacity-50" : ""}`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
