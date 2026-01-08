import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useContactContent } from '../../hooks/useContent';

export function WhatsAppFloat() {
  const { data: contactData } = useContactContent();

  const handleClick = () => {
    // Track click if analytics is available
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'floating_button',
      });
    }
  };

  if (!contactData) {
    return null; // Don't show if data not loaded yet
  }

  return (
    <motion.a
      href={contactData.info.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="
        fixed bottom-6 right-6 z-40
        w-14 h-14 md:w-16 md:h-16
        bg-whatsapp-500 text-white
        rounded-full shadow-lg
        flex items-center justify-center
        transition-all duration-300
        hover:bg-whatsapp-600 hover:scale-110 hover:shadow-xl
        focus:outline-none focus-visible:ring-4 focus-visible:ring-whatsapp-500/50
        group
      "
      aria-label="Contattaci su WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-whatsapp-500 animate-ping opacity-30" />

      {/* Icon */}
      <MessageCircle className="w-6 h-6 md:w-7 md:h-7 relative z-10" />

      {/* Tooltip */}
      <span
        className="
          absolute right-full mr-4 px-3 py-2
          bg-granite-950 text-white text-sm font-medium
          rounded-lg whitespace-nowrap
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          pointer-events-none
          hidden md:block
        "
      >
        Scrivici su WhatsApp
        <span className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-granite-950" />
      </span>
    </motion.a>
  );
}
