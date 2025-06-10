import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Navbar } from "../components/Navbar";
import { MessageCircle, BookOpen, GraduationCap, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Homepage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      icon: MessageCircle,
      title: "AI Therapy Chat",
      description: "Get personalized support with AI personas tailored to your needs",
      bgColor: "bg-[hsl(151,55%,82%)]/20",
      iconBg: "bg-[hsl(207,51%,65%)]",
    },
    {
      icon: BookOpen,
      title: "Secure Journaling",
      description: "Record thoughts with text or voice, stored securely on blockchain",
      bgColor: "bg-[hsl(45,100%,70%)]/20",
      iconBg: "bg-[hsl(45,100%,70%)]",
    },
    {
      icon: GraduationCap,
      title: "Learning Hub",
      description: "Interactive courses on anxiety, stress management, and mindfulness",
      bgColor: "bg-[hsl(207,51%,65%)]/20",
      iconBg: "bg-[hsl(151,55%,82%)]",
    },
    {
      icon: UserCheck,
      title: "Verified Therapists",
      description: "Book sessions with blockchain-verified mental health professionals",
      bgColor: "bg-[hsl(15,100%,68%)]/20",
      iconBg: "bg-[hsl(15,100%,68%)]",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar isPublic />
      
      {/* Hero Section */}
      <section className="gradient-hero py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            TelePsyche: Your Mental Wellness Companion
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
          >
            AI-guided therapy, secure journaling, verified therapists, and mental health education for all
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/login">
              <Button 
                size="lg"
                className="bg-[hsl(0,84%,60%)] text-white hover:bg-red-600 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign In with Google
              </Button>
            </Link>
            <Link href="/login">
              <Button 
                size="lg"
                className="bg-[hsl(45,100%,70%)] text-[hsl(215,25%,35%)] hover:bg-yellow-300 transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.04 12c0-5.50 4.48-10 10-10s10 4.50 10 10-4.48 10-10 10c-1.85 0-3.58-.51-5.07-1.38L2.04 12zM12 3.5c-4.69 0-8.5 3.81-8.5 8.5s3.81 8.5 8.5 8.5 8.5-3.81 8.5-8.5S16.69 3.5 12 3.5zM9 16l1.5-1.5L12 16l1.5-1.5L15 16V8l-1.5 1.5L12 8l-1.5 1.5L9 8v8z"/>
                </svg>
                Connect Wallet
              </Button>
            </Link>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('therapists')}
              className="border-2 border-white text-white hover:bg-white hover:text-[hsl(215,25%,35%)] transition-colors"
            >
              Explore Therapists
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-[hsl(210,11%,15%)] mb-16"
          >
            Comprehensive Mental Health Support
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="card-hover"
              >
                <Card className={`${feature.bgColor} p-6 text-center border-none`}>
                  <CardContent className="p-0">
                    <div className={`w-16 h-16 ${feature.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <feature.icon className="text-2xl text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-[hsl(210,11%,15%)] mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-[hsl(215,13.8%,44.1%)]">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[hsl(215,25%,35%)] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-white">
            <div>
              <h3 className="text-lg font-semibold mb-4">About TelePsyche</h3>
              <p className="text-gray-300">
                Your comprehensive mental wellness companion, providing AI-guided therapy, 
                secure journaling, and verified professional support.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#features" className="hover:text-[hsl(45,100%,70%)]">Features</a></li>
                <li><a href="#about" className="hover:text-[hsl(45,100%,70%)]">About</a></li>
                <li><a href="/login" className="hover:text-[hsl(45,100%,70%)]">Get Started</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 TelePsyche. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
