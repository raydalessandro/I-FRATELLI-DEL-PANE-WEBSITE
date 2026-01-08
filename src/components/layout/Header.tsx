import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { mainNavigation, siteConfig } from '../../data/site';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300 ease-out
          ${isScrolled 
            ? 'bg-farina-100/95 backdrop-blur-md shadow-warm py-3' 
            : 'bg-transparent py-5'
          }
        `}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between" aria-label="Main navigation">
            <Link to="/" className="relative z-10 flex items-center gap-3">
              <img
                src="/images/logo.jpg"
                alt="Il Pane dei Fratelli"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover shadow-warm"
                width={56}
                height={56}
              />
              <div className="hidden sm:block">
                <span className="block font-display text-lg md:text-xl font-semibold text-granite-950">
                  Il Pane dei Fratelli
                </span>
                <span className="block text-xs text-granite-500 font-accent italic">
                  Dal 1979
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {mainNavigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`
                    relative text-sm font-medium transition-colors duration-200
                    ${isActive(item.href) 
                      ? 'text-granite-600' 
                      : 'text-granite-700 hover:text-granite-600'
                    }
                  `}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-granite-600 rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${siteConfig.phoneClean}`}
                className="flex items-center gap-2 text-sm text-granite-600 hover:text-granite-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">{siteConfig.phone}</span>
              </a>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-sm px-4 py-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>

            <button
              type="button"
              className="lg:hidden relative z-10 p-2 -mr-2 text-granite-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-granite-950/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-farina-100 shadow-2xl"
            >
              <div className="flex flex-col h-full pt-24 pb-8 px-6">
                <nav className="flex-1">
                  <ul className="space-y-1">
                    {mainNavigation.map((item, index) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={item.href}
                          className={`
                            block py-3 px-4 rounded-lg text-lg font-medium
                            ${isActive(item.href)
                              ? 'bg-granite-600 text-white'
                              : 'text-granite-700 hover:bg-granite-100'
                            }
                          `}
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <div className="pt-6 border-t border-granite-200 space-y-4">
                  <a
                    href={`tel:${siteConfig.phoneClean}`}
                    className="flex items-center gap-3 text-granite-700"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">{siteConfig.phone}</span>
                  </a>
                  
                  <a
                    href={siteConfig.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full justify-center"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Scrivici su WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
