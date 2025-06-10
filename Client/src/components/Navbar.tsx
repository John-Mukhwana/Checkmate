import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {  Menu, User, X } from "lucide-react";
import { useAuthContext } from "../components/AuthProvider";
import { signOutUser } from "../lib/auth";
import { motion, AnimatePresence } from "framer-motion";
import logo from '../assets/logo.svg';

interface NavbarProps {
  isPublic?: boolean;
}

export function Navbar({ isPublic = false }: NavbarProps) {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser } = useAuthContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOutUser();
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleGetStarted = () => {
    navigate("/login");
  };

  const handleLinkAccount = () => {
    // Navigate to dashboard with link account focus
    navigate("/app/dashboard");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const publicNavItems = [
    { href: "/#home", label: "Home" },
    { href: "/#features", label: "Features" },
    { href: "/#about", label: "About" },
  ];

  const appNavItems = [
    { href: "/app/chat", label: "Chat" },
    { href: "/app/journal", label: "Journal" },
    { href: "/app/learning", label: "Learning" },
    { href: "/app/therapists", label: "Therapists" },
    { href: "/app/dashboard", label: "Dashboard" },
  ];

  const navItems = isPublic ? publicNavItems : appNavItems;

  return (
    <nav className="bg-[hsl(215,25%,35%)] text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            
            {/* <Brain className="text-2xl text-[hsl(45,100%,70%)] mr-3" /> */}
             <div className="bg-[hsl(0,0%,100%)] rounded-xl p-1 mr-3 flex items-center justify-center">
    <img
      src={logo}
      alt="Checkmate Logo"
      className="w-8 h-8 object-contain"
    />
  </div>
  
            <Link to={isAuthenticated ? "/app" : "/"}>
              <span className="text-xl font-bold cursor-pointer">Checkmate</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <span className="text-white hover:text-[hsl(45,100%,70%)] transition-colors cursor-pointer">
                  {item.label}
                </span>
              </Link>
            ))}
            
            {isPublic ? (
              <Button 
                onClick={handleGetStarted}
                className="bg-[hsl(45,100%,70%)] text-[hsl(215,25%,35%)] hover:bg-yellow-300 transition-colors"
              >
                Get Started
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-[hsl(45,100%,70%)]">
                    <User className="text-2xl" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/app/dashboard")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLinkAccount}>
                    Link Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={toggleMobileMenu}
              className="text-white"
            >
              {mobileMenuOpen ? <X className="text-xl" /> : <Menu className="text-xl" />}
            </Button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[hsl(215,25%,35%)] border-t border-gray-600 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link key={item.href} to={item.href}>
                  <span 
                    className="block px-3 py-2 text-white hover:text-[hsl(45,100%,70%)] cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
              
              {isPublic ? (
                <Button
                  onClick={() => {
                    handleGetStarted();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-[hsl(45,100%,70%)] hover:bg-gray-700 rounded"
                  variant="ghost"
                >
                  Get Started
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      navigate("/app/dashboard");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded"
                    variant="ghost"
                  >
                    Profile
                  </Button>
                  <Button
                    onClick={() => {
                      handleLinkAccount();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded"
                    variant="ghost"
                  >
                    Link Account
                  </Button>
                  <Button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-white hover:bg-gray-700 rounded"
                    variant="ghost"
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
