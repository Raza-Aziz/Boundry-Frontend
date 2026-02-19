import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Store, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "../../store/api/authApi";
import { toast } from "sonner";

const navLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Buy", href: "/listings" },
  { label: "Option 3", href: "/contact-us" },
];

export default function Navbar() {
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
    <nav className="fixed font-[Inter] w-full z-50 top-0 transition-all duration-300 glass-panel">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="shrink-0 flex items-center  cursor-pointer">
            <span className="font-serif text-2xl font-bold tracking-tight text-boundry-primary">
              Boundry
            </span>
            <span className="h-1 w-1 rounded-full bg-gray-800 mt-4" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-900 hover:text-boundry-primary transition-colors"
              >
                {link.label}
              </a>
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
                      <AvatarImage
                        // src="https://github.com/raza-aziz.png"
                        alt="user"
                      />
                      <AvatarFallback className="uppercase text-white bg-gray-800">
                        {user ? user.username[0] : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-32 font-[Inter] bg-[#f9f8f3]">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User />
                      <Link to={"/profile"}>My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Store />
                      <Link to={"/"}>My Listings</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem variant="destructive">
                      <LogOut />
                      <Link to={"/"} onClick={logoutHandler}>
                        Log out
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to={"/auth"}
                // className="hidden md:block text-sm font-medium text-gray-900 hover:text-boundry-primary"
                className="bg-boundry-primary hover:bg-gray-800 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-boundry-primary/20 cursor-pointer"
              >
                Sign In
              </Link>
            )}
            {isAuthenticated ? (
              <Link className="bg-boundry-primary hover:bg-boundry-primary-dark text-white transition-all px-5 py-2.5 rounded-full text-sm font-medium shadow-lg shadow-boundry-primary/20 cursor-pointer">
                List Property
              </Link>
            ) : (
              <Link
                to={"/auth"}
                className="hidden md:block text-sm font-medium text-gray-900 hover:text-boundry-primary transition-colors"
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
