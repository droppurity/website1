
"use client";

import Link from 'next/link';
import { Droplet, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { useState, useEffect, useRef } from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/plans', label: 'Our Plans' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  const HEADER_HEIGHT_THRESHOLD = 56; // Approx 3.5rem (h-14 value)

  useEffect(() => {
    const controlHeaderVisibility = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setShowHeader(true);
        lastScrollY.current = 0;
        return;
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > HEADER_HEIGHT_THRESHOLD) {
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY.current) {
        setShowHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };

    if (typeof window !== "undefined") {
      window.addEventListener('scroll', controlHeaderVisibility, { passive: true });
      return () => {
        window.removeEventListener('scroll', controlHeaderVisibility);
      };
    }
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  return (
    <header
      className={`bg-card shadow-sm sticky top-0 z-50 transition-transform duration-300 ease-in-out ${
        showHeader ? 'transform-none' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14"> {/* Reduced height from h-16 to h-14 */}
          <Link href="/" className="flex items-center gap-2">
            <Droplet className="w-7 h-7 sm:w-8 sm:h-8 text-primary" /> {/* Slightly smaller icon for smaller header */}
            <span className="text-lg sm:text-xl font-bold text-foreground">Droppurity</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4">
            {navItems.map((item) => (
              <Button key={item.label} variant="ghost" asChild>
                <Link href={item.href} className="text-foreground hover:text-primary">
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-card p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center p-4 border-b">
                    <SheetTitle asChild>
                      <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                        <Droplet className="w-7 h-7 text-primary" />
                        <span className="text-lg font-bold text-foreground">Droppurity</span>
                      </Link>
                    </SheetTitle>
                  </div>
                  <nav className="flex flex-col gap-2 p-4 flex-grow overflow-y-auto">
                    {navItems.map((item) => (
                      <Button
                        key={item.label}
                        variant="ghost"
                        className="justify-start text-lg py-3"
                        asChild
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link href={item.href}>
                          {item.label}
                        </Link>
                      </Button>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
