import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/use-auth';
import { Button } from '../components/ui/button';
import { 
  Brain, 
  Bell, 
  Menu, 
  X,
  Home,
  MessageCircle,
  BookOpen,
  GraduationCap,
  Users,
  BarChart3
} from 'lucide-react';

export function Navigation() {
  const location = useLocation();
  const { user, signOut, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '', label: 'Home', icon: Home },
    { href: '/app/chat', label: 'AI Therapist', icon: MessageCircle },
    { href: '/app/journal', label: 'Journal', icon: BookOpen },
    { href: '/app/learning', label: 'Learn', icon: GraduationCap },
    { href: '/app/therapists', label: 'Therapists', icon: Users },
    { href: '/app/dashboard', label: 'Dashboard', icon: BarChart3 },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
                <Brain className="text-white h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">
                Checkmate
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <span
                  className={`text-slate-600 hover:text-primary transition-colors duration-200 font-medium cursor-pointer ${
                    location.pathname === item.href ? 'text-primary' : ''
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            )}
            
            

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 py-4"
          >
            <div className="space-y-3">
              {navItems.map((item) => (
                <Link key={item.href} to={item.href}>
                  <div
                    className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer ${
                      location.pathname === item.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              ))}
              {isAuthenticated && (
                <button
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left flex items-center space-x-3 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  <span className="font-medium">Sign Out</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
