
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
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.33 3.43 16.79L2 22L7.32 20.59C8.72 21.33 10.34 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2ZM12.04 20.14C10.58 20.14 9.15 19.71 7.96 19L7.54 18.76L4.22 19.65L5.15 16.41L4.88 15.97C4.03 14.65 3.57 13.13 3.57 11.91C3.57 7.29 7.39 3.47 12.04 3.47C16.69 3.47 20.51 7.29 20.51 11.91C20.51 16.53 16.69 20.14 12.04 20.14ZM17.46 14.47C17.23 14.36 16.07 13.8 15.88 13.73C15.69 13.66 15.55 13.62 15.41 13.85C15.27 14.08 14.93 14.52 14.79 14.67C14.66 14.81 14.52 14.83 14.28 14.72C14.05 14.61 13.19 14.31 12.16 13.38C11.35 12.64 10.79 11.72 10.65 11.49C10.51 11.26 10.62 11.14 10.73 11.03C10.83 10.93 10.97 10.75 11.11 10.59C11.24 10.44 11.29 10.32 11.38 10.15C11.48 9.98 11.43 9.84 11.36 9.73C11.29 9.62 10.85 8.47 10.67 8.04C10.5 7.61 10.32 7.66 10.18 7.65H10.17C10.03 7.65 9.81 7.7 9.62 7.93C9.44 8.16 8.94 8.62 8.94 9.72C8.94 10.81 9.65 11.84 9.77 12C9.89 12.16 10.86 13.63 12.32 14.24C12.86 14.48 13.24 14.61 13.52 14.7C13.95 14.82 14.29 14.79 14.48 14.72C14.71 14.63 15.55 14.13 15.74 13.85C15.93 13.57 15.93 13.34 15.88 13.23C15.83 13.12 15.69 13.05 15.55 12.98C15.41 12.91 15.24 12.85 15.08 12.8C14.94 12.73 14.81 12.69 14.7 12.53C14.58 12.36 14.81 12.64 15.31 13.18C15.82 13.73 16.22 13.98 16.56 14.13C16.85 14.26 17.08 14.24 17.23 14.18C17.37 14.13 17.68 14.6 17.46 14.47Z"
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

