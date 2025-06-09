
"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';

// WhatsApp SVG Icon
const WhatsAppIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.05 4.94A9.859 9.859 0 0 0 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10a9.964 9.964 0 0 0 6.785-2.549l.002-.001.002-.002.001-.002A9.859 9.859 0 0 0 22 12c0-2.694-1.076-5.14-2.95-6.998L19.05 4.94zm-7.046 12.084c-2.106 0-4.12-.597-5.823-1.646l-.41-.246-3.368.883.898-3.285-.265-.423a7.958 7.958 0 0 1-1.243-4.409c0-4.418 3.59-8.008 8.008-8.008s8.008 3.59 8.008 8.008c0 4.418-3.59 8.008-8.008 8.008zm3.608-3.399c-.19-.096-1.127-.556-1.302-.618s-.302-.096-.43.096c-.127.191-.493.618-.604.745s-.223.144-.412.048c-.19-.096-.802-.295-1.528-.942s-1.188-1.393-1.394-1.64c-.205-.246-.023-.38.072-.507.09-.122.19-.19.286-.302.096-.112.144-.19.217-.318s.048-.24-.024-.36c-.072-.122-.43-.996-.587-1.363s-.307-.31-.43-.315h-.39c-.127 0-.27.048-.412.24s-.54.528-.54 1.286c0 .758.552 1.495.627 1.613s1.075 1.64 2.603 2.29c1.528.65 2.06.812 2.702 1.024.642.212 1.14.18 1.536.103.444-.09.915-.36 1.203-.83.288-.47.288-.88.203-1.008s-.14-.16-.3-.256z"
    />
  </svg>
);


export default function WhatsAppButton() {
  // Replace with your actual WhatsApp number including country code without '+' or '00'
  const phoneNumber = "917979784087"; // Updated with your corrected number + country code for India
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
      <WhatsAppIcon />
    </Link>
  );
}

