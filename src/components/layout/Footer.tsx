
import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Linkedin, Facebook, Instagram, Youtube, MessageCircle, ArrowUpCircle } from 'lucide-react';

const footerSections = [
  {
    title: 'Premium Drinking Water',
    links: [
      { label: 'Home', href: '/' }, // Added Home link here
      { label: 'Plans', href: '/plans' },
      { label: 'How it works', href: '/#how-it-works' }, // Assuming an ID on the homepage
      { label: 'Droppurity Advantage', href: '/about#advantage' }, // Assuming an ID on about page
      { label: 'Customer Stories', href: '/#testimonials' }, // Assuming an ID
      { label: 'Our Products', href: '/plans' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '#' }, // Placeholder
      { label: 'Blog', href: '#' }, // Placeholder
      { label: 'FAQs', href: '#' }, // Placeholder
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Terms',
    links: [
      { label: 'Privacy Policy', href: '#' }, // Placeholder
      { label: 'Terms of Use', href: '#' }, // Placeholder
    ],
  },
];

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: MessageCircle, href: '#', label: 'WhatsApp' }, // Placeholder for WhatsApp
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Logo and Address */}
          <div className="md:col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="Droppurity Logo" width={178} height={48} className="object-contain" />
            </Link>
            <p className="text-sm opacity-90">
              Smart Purifiers on Rent. Free Maintenance for Life.
            </p>
            <p className="text-sm opacity-90">
              #9/A, Chukki complex, 19th Main Rd, Sector 3, HSR layout, Bengaluru, Karnataka 560102 (Placeholder Address)
            </p>
          </div>

          {/* Columns 2, 3: Link Sections */}
          {footerSections.slice(0, 2).map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-yellow-300">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm hover:underline opacity-90 hover:opacity-100 transition-opacity">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Column 1 (continued or new content): Terms */}
             {footerSections.slice(2).map((section) => (
                <div key={section.title} className="space-y-4 lg:col-start-1">
                  <h3 className="text-lg font-semibold text-yellow-300">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="text-sm hover:underline opacity-90 hover:opacity-100 transition-opacity">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
            ))}

            {/* Column 2 (continued or new content): Refer & Earn */}
            <div className="space-y-4 lg:col-start-2">
                <h3 className="text-lg font-semibold text-yellow-300">Refer & Earn</h3>
                <ul className="space-y-2">
                    <li>
                        <Link href="#" className="text-sm hover:underline opacity-90 hover:opacity-100 transition-opacity">
                            Refer now
                        </Link>
                    </li>
                </ul>
            </div>
        </div>


        {/* Social Media and Scroll to Top */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex space-x-5">
            {socialLinks.map((social) => (
              <Link key={social.label} href={social.href} aria-label={social.label} className="opacity-80 hover:opacity-100 transition-opacity">
                <social.icon className="w-6 h-6" />
              </Link>
            ))}
          </div>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUpCircle className="w-6 h-6 text-primary-foreground" />
          </button>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-xs opacity-70">
          <p>&copy; {new Date().getFullYear()} Droppurity. All rights reserved. Smart Purifiers on Rent.</p>
        </div>
      </div>
    </footer>
  );
}
