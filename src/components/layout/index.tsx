import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppFloat } from './WhatsAppFloat';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Grain overlay for texture */}
      <div className="grain-overlay" aria-hidden="true" />
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* WhatsApp Floating Button */}
      <WhatsAppFloat />
    </div>
  );
}

export { Header } from './Header';
export { Footer } from './Footer';
export { WhatsAppFloat } from './WhatsAppFloat';
