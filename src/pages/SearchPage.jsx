import FiltersSidebar from "../components/search/FiltersSidebar";
import SearchPropertyCard from "../components/search/SearchPropertyCard";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import { ChevronDown, MoveLeft, MoveRight } from "lucide-react";

import { useSearchParams } from "react-router-dom";
import { useGetListingsQuery } from "../store/api/listingsApi";

const properties = [
  {
    id: 1,
    price: "$18,500,000",
    address: "1120 Loma Vista Dr, Beverly Hills, CA 90210",
    beds: 5,
    baths: 6.5,
    sqft: "6,200",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBkGg5AoGY12dV5fhOv6ZXANsGtp6lOIWzCQFoAnTJeA04stEb8eefqjOITF__7_84uBzpw-Z47VZien4_XVIMChtMkt6DsaM9Gd6CMRSS8zsgzygv8k19rDwgQsxqP-E_ZX235X97U2amQWms6fo2_FFNFow_pbx6c5xVW2uRODVs1Q7ticjEMPz-zusmUtGOBZu_rDKalJUOXc9U36XKsEHxMKhdCzwH83E3xSTZxiXTc7drLmLusm4iJz4fTfuhC8EUnMtxsjw",
    tags: ["New", "Estate"],
    status: "Active",
    agent: {
      name: "Alexander Sterling",
      agency: "Boundry Excl.",
      initials: "AS",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAdTntM70yGExbmDFrThMiujYqiU8s2IGgf7-hNl-ZN-VNa-4HdmPFQ5KydzZKdCOhc2ZNJZP6Eb605aiW6-jwO4ktTB2IZlPW9M2KyLx4tMOyTQ92F2e5uGfXSBFQ849-aQMOB8v0FlMmtPoOoweoLKVIYsuuKY5z9-fYJ-Rx3ileORhBOxaAceS73uOixVEqqZsO03zXFq2nuLyzXkmQ5yLQbUvMnne-IgcCDGW9krAVpEBcd5Or261U7fywkx5z_aavqtAW_tA",
    },
    badges: ["NEW", "ESTATE"],
  },
  {
    id: 2,
    price: "$14,250,000",
    address: "924 Bel Air Rd, Los Angeles, CA 90077",
    beds: 4,
    baths: 5,
    sqft: "4,800",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgaKaixykH1rGm2qCH-MAPhe-HDXyLkV1WQeF25n1kpYj4WeKSfr4q5GooKsGGE1sFJQQyOa9ipGw8TQ2dnHLmZok3FGzCEMfARs8s689he-3pWrLv5smjJSKOz1C3baNI80wEoVF4a_DzcqBwfurbuvxq7IUG40psL0DPXz_ZLIKJaTCI6klR85SoP_iKxw4Msy68MBqLy7hLJrkgAHkHYUfO9qfvsnOp7xN2DWErWjvZxUCt1MFNu6nxmYKQbV1c1MGw1u8bcg",
    tags: ["Villa"],
    status: "",
    agent: {
      name: "Douglas Lane",
      agency: "Compass",
      initials: "DL",
      avatar: null,
    },
    badges: ["VILLA"],
  },
  {
    id: 3,
    price: "$22,000,000",
    address: "500 Chalette Dr, Beverly Hills, CA 90210",
    beds: 6,
    baths: 8,
    sqft: "8,100",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDnJxlCQyvPG3qutJ73vlyLbdH_gpkvKuwEHl97qoXOteZ0tSbvgqd9pwwXqRgAzx9cT2F2k4FegzvduqvK9NzSBiXgNqJGsJ1SF_2YlZaIA4KcvJFsZbAymLQUq1EkLrDbh47Ijjo1rsl994RBKoFe6UJtzWaVub7S3kaphEbFCebMEQJ64rBdkIabMZYhZNLY1YuEa8mjqRtwBlz90DeocbRrGVWNZWrYxKCx4TYU9NO9YI0SGQ9kOG9KewM_-GgPjQqkqj1Opw",
    tags: ["Mansion"],
    status: "",
    agent: {
      name: "Jane Doe",
      agency: "The Agency",
      initials: "JD",
      avatar: null,
    },
    badges: ["MANSION"],
  },
  {
    id: 4,
    price: "$19,995,000",
    address: "1200 Laurel Way, Beverly Hills, CA 90210",
    beds: 6,
    baths: 8,
    sqft: "9,500",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBeDhJC2YLEV4dyLKXLZZzIKhDYeeMuAsjPiRQrzNUnFYcal2qgUGVA6oGKYZi_ma1iJjNyohg8ktWN8bJGW6O6XwxXbHv6LnsRjZmXSMR7RWP4aS6pfpvOIhn5_Mgb6OTh8xjEyhQmQrV2OihbpjLOgzN4rno7m8jxG78RbM307p1eWOO_p_aPL1A4iFR1glyeTbeWotZ3pj1YZZFxSuJN5f35kZx9YBgmk1zhEQlGguJJybVqlUoOfAwXcEM4aamj0XOQfGI6RA",
    tags: ["Estate"],
    status: "",
    agent: {
      name: "Robert Ellis",
      agency: "Sotheby's",
      initials: "RE",
      avatar: null,
    },
    badges: ["ESTATE"],
  },
  {
    id: 5,
    price: "$11,500,000",
    address: "1677 N Doheny Dr, Los Angeles, CA 90069",
    beds: 5,
    baths: 6,
    sqft: "5,200",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAVPh6VmNeYjSH7OEhCt6Cs5OOGVBdLM_1fRtXwkvW5vgRj9D9Xoy-Tba7Rd7VVPui6JacVJSjiHF5QLuIn_GMM9Lk3B0ahWM8ky7CKKH1TSvCavZL8KNdko18n0AUsWEm7c-LBlM_TTqNvyCVRdXYa7xd2VXbdzkV7OO5aEpujbzZh8kANIv2b0qGL-PlY5YneMbc_iCfJvkyDnYcZ75eLACLK8YN0c3T9sJJIAsApUMBN0irPYwLXY-iKjTFonJrMC0KoNbUGKg",
    tags: ["Featured", "Modern"],
    status: "",
    agent: {
      name: "Alexander Sterling",
      agency: "Boundry Excl.",
      initials: "AS",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAdTntM70yGExbmDFrThMiujYqiU8s2IGgf7-hNl-ZN-VNa-4HdmPFQ5KydzZKdCOhc2ZNJZP6Eb605aiW6-jwO4ktTB2IZlPW9M2KyLx4tMOyTQ92F2e5uGfXSBFQ849-aQMOB8v0FlMmtPoOoweoLKVIYsuuKY5z9-fYJ-Rx3ileORhBOxaAceS73uOixVEqqZsO03zXFq2nuLyzXkmQ5yLQbUvMnne-IgcCDGW9krAVpEBcd5Or261U7fywkx5z_aavqtAW_tA",
    },
    badges: ["FEATURED", "MODERN"],
  },
  {
    id: 6,
    price: "$28,500,000",
    address: "800 Tortuoso Way, Los Angeles, CA 90077",
    beds: 7,
    baths: 9,
    sqft: "10,200",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBCB4aDWpbjXsMZIaPDnQ67ETslob4DqWiiyRlqtU3OPzhrGTumnjDyP-LA8JihIvQLTFFdMbfYDvVve3MgbOcIwUW88EOR2kvdeGZkairV1YnoVBPPi1Yi-QXB7JOSns7ABEzwdlUopcVShljquxikhwY6he9V_4JqaNsMk5bSvCX728o0X39quYodMS1-ScmyAPA-TlPJ09KAgVMNm2dDtB8JiM2WsV6adizhBkYcyZcyh-7veZ1uj1p6in4vmI0qBktKtt7-hA",
    tags: ["Estate"],
    status: "",
    agent: {
      name: "Sarah Jones",
      agency: "Christie's",
      initials: "SJ",
      avatar: null,
    },
    badges: ["ESTATE"],
  },
];

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const currentFilters = Object.fromEntries([...searchParams]);

  const { data, isLoading, isError, error } =
    useGetListingsQuery(currentFilters);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-stone-800 dark:text-stone-200 font-display antialiased selection:bg-primary/30 selection:text-primary-dark">
      <Navbar />
      {/* Main Content Area */}
      <div className="max-w-[1600px] mt-11 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <FiltersSidebar />

          {/* Listings */}
          <main className="col-span-12 lg:col-span-9 xl:col-span-9 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
              <h1 className="text-xl mt-25 md:text-2xl font-serif text-stone-900 dark:text-white">
                <span className="font-normal">
                  {data?.totalMatches || 0} Properties Found
                </span>
              </h1>
              <div className="flex gap-3">
                <div className="relative group">
                  <select className="appearance-none bg-transparent pl-3 pr-8 py-2 text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-primary cursor-pointer focus:outline-none font-body">
                    <option>Sort: Price (High to Low)</option>
                    <option>Sort: Price (Low to High)</option>
                    <option>Sort: Newest First</option>
                  </select>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none text-lg">
                    <ChevronDown />
                  </span>
                </div>
                <div className="h-4 w-px bg-stone-300 dark:bg-stone-700"></div>
                <div className="relative group">
                  <select className="appearance-none bg-transparent pl-3 pr-8 py-2 text-sm font-medium text-stone-700 dark:text-stone-300 hover:text-primary cursor-pointer focus:outline-none font-body">
                    <option>Sqft (High to Low)</option>
                    <option>Sqft (Low to High)</option>
                  </select>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none text-lg">
                    <ChevronDown />
                  </span>
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
              <nav className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-stone-200 dark:border-stone-700 text-stone-500 hover:border-primary hover:text-primary transition-colors cursor-pointer">
                  <MoveLeft className="w-4 h-4" />
                </button>

                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-medium cursor-pointer">
                  1
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-primary hover:text-primary transition-colors text-sm font-medium cursor-pointer">
                  2
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-primary hover:text-primary transition-colors text-sm font-medium cursor-pointer">
                  3
                </button>
                <span className="px-2 text-stone-400">...</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-primary hover:text-primary transition-colors text-sm font-medium cursor-pointer">
                  8
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-stone-200 dark:border-stone-700 text-stone-500 hover:border-primary hover:text-primary transition-colors cursor-pointer">
                  <MoveRight className="w-4 h-4" />
                </button>
              </nav>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
