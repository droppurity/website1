
"use client";

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function WhatsAppButton() {
  // Replace with your actual WhatsApp number including country code without '+' or '00'
  const phoneNumber = "12345678900"; // Example: Indian number 91XXXXXXXXXX
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <Link
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-40",
        "w-14 h-14 rounded-full bg-green-500 text-white",
        "flex items-center justify-center shadow-lg",
        "hover:bg-green-600 transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      )}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </Link>
  );
}
