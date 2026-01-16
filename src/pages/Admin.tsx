import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Users,
  Phone,
  Settings,
  LogOut,
} from 'lucide-react';
import { Button, Input } from '../components/ui';
import { AdminProducts } from '../components/admin/AdminProducts';
import { AdminB2B } from '../components/admin/AdminB2B';
import { AdminContact } from '../components/admin/AdminContact';
import { AdminSite } from '../components/admin/AdminSite';

// Simple auth (in production, use proper auth)
const ADMIN_PASSWORD = 'pane2024';

type TabType = 'products' | 'b2b' | 'contact' | 'site';

const tabs = [
  { id: 'products' as TabType, label: 'Prodotti', icon: Package },
  { id: 'b2b' as TabType, label: 'B2B', icon: Users },
  { id: 'contact' as TabType, label: 'Contatti', icon: Phone },
  { id: 'site' as TabType, label: 'Sito', icon: Settings },
];

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Password non corretta');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-granite-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="font-display text-2xl font-bold text-granite-950 mb-2">
                Area Admin
              </h1>
              <p className="text-granite-600">
                Il Pane dei Fratelli
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={authError}
                placeholder="Inserisci la password"
                autoFocus
              />
              <Button type="submit" variant="primary" fullWidth>
                Accedi
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<TabType>('products');

  return (
    <div className="min-h-screen bg-farina-100">
      {/* Header */}
      <header className="bg-granite-950 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6" />
              <span className="font-display text-lg font-semibold">
                Admin Panel
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-white hover:bg-granite-800"
            >
              <LogOut className="w-4 h-4" />
              Esci
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 -mb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors
                    ${
                      activeTab === tab.id
                        ? 'text-white border-b-2 border-forno-400'
                        : 'text-granite-400 hover:text-granite-300'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'products' && <AdminProducts />}
        {activeTab === 'b2b' && <AdminB2B />}
        {activeTab === 'contact' && <AdminContact />}
        {activeTab === 'site' && <AdminSite />}
      </div>
    </div>
  );
}
