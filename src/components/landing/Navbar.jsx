import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Store, User, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "../../store/api/authApi";
import { toast } from "sonner";
import { ThemeToggle } from "../ThemeToggle";

const navLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Properties", href: "/search" },
  // { label: "Option 3", href: "/contact-us" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      if (window.scrollY > 40) setIsOpen(false); // Close mobile menu when scrolling down
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoutHandler = async () => {
    try {
      await logout().unwrap();
      toast.success("Logged out successfully", {
        position: "top-right",
        duration: 2000,
      });
      navigate("/auth");
    } catch (error) {
      toast.error(error.data?.message || "Logout failed", {
        position: "top-right",
      });
    }
  };

  return (
    <nav
      className={`fixed font-[Inter] z-50 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] backdrop-blur-3xl border border-white/20 dark:border-white/10 rounded-full shadow-2xl group ${
        isScrolled
          ? "top-0 mt-0 bg-white/10 dark:bg-stone-900/20 -translate-y-[60%] hover:translate-y-4"
          : "top-6 bg-white/20 dark:bg-stone-900/30 translate-y-0"
      }`}
    >
      <div className="mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="shrink-0 flex items-center cursor-pointer">
            <Link to={"/"} className="flex items-center">
              {/* Logo Image */}
              <img
                src="/favicon.svg"
                className="w-12 h-12 md:w-14 md:h-14 object-contain"
                alt="Boundry Logo"
              />

              {/* Text and Dot Wrapper */}
              <div className="flex items-baseline">
                <span className="font-serif text-xl md:text-2xl font-bold tracking-tight text-boundry-primary">
                  Boundry
                </span>
                {/* The Dot as a full stop */}
                <span className="h-1.5 w-1.5 rounded-full bg-gray-800 dark:bg-gray-200 ml-0.5 mb-1.5" />
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-semibold text-gray-900 dark:text-gray-100 hover:text-[#f38963] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <ThemeToggle />
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full cursor-pointer h-9 w-9 md:h-10 md:w-10"
                  >
                    <Avatar className="h-8 w-8 md:h-8 md:h-8">
                      <AvatarImage src={user?.avatar?.url} alt="user" />
                      <AvatarFallback className="uppercase text-white bg-gray-800 text-xs">
                        {user ? user.username[0] : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="border-0 w-44 mt-2 font-[Inter] bg-white/60 dark:bg-stone-900/60 backdrop-blur-2xl dark:text-white shadow-2xl rounded-2xl p-2">
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="rounded-lg hover:bg-white/20">
                      <Link
                        to={"/u/profile"}
                        className="flex flex-row items-center gap-3 w-full py-1"
                      >
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="rounded-lg hover:bg-white/20">
                      <Link
                        to={"/u/listings"}
                        className="flex flex-row items-center gap-3 w-full py-1"
                      >
                        <Store className="w-4 h-4" />
                        <span>My Listings</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="my-2 bg-white/10 dark:bg-stone-800/10" />

                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      variant="destructive"
                      className="rounded-lg hover:bg-red-500/10"
                    >
                      <Link
                        to={"/"}
                        onClick={logoutHandler}
                        className="flex flex-row items-center gap-3 w-full py-1"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to={"/auth"}
                className="hidden md:block bg-boundry-primary hover:bg-gray-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-boundry-primary/20 cursor-pointer"
              >
                Get Started
              </Link>
            )}
            {isAuthenticated ? (
              <Link
                to={"/u/listings/new"}
                className="hidden md:flex bg-boundry-primary hover:bg-boundry-primary-dark text-white transition-all px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-boundry-primary/20 cursor-pointer"
              >
                List Property
              </Link>
            ) : (
              <Link
                to={"/auth"}
                className="hidden md:block text-sm font-semibold text-gray-900 dark:text-gray-100 hover:text-[#f38963] transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex items-center p-2 text-gray-900 dark:text-white hover:text-[#f38963] transition-colors focus:outline-none cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 mt-4 w-full bg-white dark:bg-stone-900 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 dark:border-white/10 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-top ${
          isOpen
            ? "opacity-100 pointer-events-auto scale-100 translate-y-0"
            : "opacity-0 pointer-events-none scale-95 -translate-y-4"
        }`}
      >
        <div className="px-6 py-8 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="block px-6 py-4 rounded-3xl text-lg font-semibold text-gray-900 dark:text-gray-100 hover:bg-white/20 dark:hover:bg-white/5 hover:text-[#f38963] transition-all"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <Link
              to={"/u/listings/new"}
              className="block px-6 py-4 rounded-3xl text-lg font-semibold text-gray-900 dark:text-gray-100 hover:bg-white/20 dark:hover:bg-white/5 hover:text-[#f38963] transition-all"
              onClick={() => setIsOpen(false)}
            >
              List Property
            </Link>
          ) : (
            <div className="flex flex-col space-y-3 pt-6 border-t border-white/10 dark:border-white/5">
              <Link
                to={"/auth"}
                className="block px-6 py-4 rounded-3xl text-lg font-semibold text-gray-900 dark:text-gray-100 hover:bg-white/20 dark:hover:bg-white/5 hover:text-[#f38963] transition-all"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to={"/auth"}
                className="block px-6 py-5 rounded-3xl text-lg font-bold bg-boundry-primary text-white text-center hover:bg-gray-800 transition-all shadow-xl shadow-boundry-primary/30"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
