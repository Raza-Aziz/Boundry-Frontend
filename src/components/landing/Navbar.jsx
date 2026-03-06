import { useState } from "react";
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

const navLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Properties", href: "/search" },
  // { label: "Option 3", href: "/contact-us" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

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
    <nav className="fixed font-[Inter] w-full z-50 top-0 transition-all duration-300 backdrop-blur-xl ">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="shrink-0 flex items-center cursor-pointer">
            <Link to={"/"} className="flex items-center">
              {/* Logo Image */}
              <img
                src="/favicon.svg"
                className="w-15 object-contain"
                alt="Boundry Logo"
              />

              {/* Text and Dot Wrapper */}
              <div className="flex items-baseline">
                <span className="font-serif text-2xl font-bold tracking-tight text-boundry-primary">
                  Boundry
                </span>
                {/* The Dot as a full stop */}
                <span className="h-1.5 w-1.5 rounded-full bg-gray-800 ml-0.5 mb-1.5" />
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-md font-medium text-gray-900 hover:text-[#f38963] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full cursor-pointer"
                  >
                    <Avatar>
                      <AvatarImage src={user?.avatar?.url} alt="user" />
                      <AvatarFallback className="uppercase text-white bg-gray-800">
                        {user ? user.username[0] : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="border-0 w-32 font-[Inter] bg-[#f9f8f3]">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link to={"/u/profile"} className="flex flex-row gap-2">
                        {" "}
                        <User />
                        <span>My Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={"/u/listings"} className="flex flex-row gap-2">
                        {" "}
                        <Store />
                        <span>My Listings</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive">
                      <Link
                        to={"/"}
                        onClick={logoutHandler}
                        className="flex flex-row gap-2"
                      >
                        {" "}
                        <LogOut className="text-red-650" />
                        <span>Log Out</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to={"/auth"}
                className="hidden md:block bg-boundry-primary hover:bg-gray-800 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-boundry-primary/20 cursor-pointer"
              >
                Get Started
              </Link>
            )}
            {isAuthenticated ? (
              <Link
                to={"/u/listings/new"}
                className="hidden md:flex bg-boundry-primary hover:bg-boundry-primary-dark text-white transition-all px-5 py-2.5 rounded-full text-sm font-medium shadow-lg shadow-boundry-primary/20 cursor-pointer"
              >
                List Property
              </Link>
            ) : (
              <Link
                to={"/auth"}
                className="hidden md:block text-sm font-medium text-gray-900 hover:text-[#f38963] transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden flex items-center p-2 text-gray-900 hover:text-[#f38963] transition-colors focus:outline-none cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-[#f9f8f3]/95 backdrop-blur-xl border-t border-gray-200 shadow-lg transition-all duration-300 ease-in-out origin-top ${
          isOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <div className="px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-200/50 hover:text-[#f38963] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          {isAuthenticated ? (
            <Link
              to={"/u/listings/new"}
              className="block px-3 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-200/50 hover:text-[#f38963] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              List Property
            </Link>
          ) : (
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
              <Link
                to={"/auth"}
                className="block px-3 py-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-200/50 hover:text-[#f38963] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to={"/auth"}
                className="block px-3 py-3 rounded-md text-base font-medium bg-boundry-primary text-white text-center hover:bg-gray-800 transition-colors"
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
