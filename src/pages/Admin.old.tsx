import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Star,
  StarOff,
  Save,
  X,
  AlertTriangle,
  RefreshCw,
  LogOut,
} from 'lucide-react';
import { useProducts } from '../context/ProductsContext';
import { productCategories, generateProductId, createProductSlug } from '../data/products';
import { Button, Input, Textarea, Select, Checkbox, Badge } from '../components/ui';
import type { Product } from '../types';

// Simple auth (in production, use proper auth)
const ADMIN_PASSWORD = 'pane2024';

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

// Dashboard Component
function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetToInitial,
    lastUpdated,
  } = useProducts();

  const [activeView, setActiveView] = useState<'list' | 'edit'>('list');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const stats = {
    total: products.length,
    available: products.filter(p => p.available).length,
    featured: products.filter(p => p.featured).length,
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setActiveView('edit');
  };

  const handleNew = () => {
    const newProduct: Product = {
      id: generateProductId(),
      name: '',
      slug: '',
      category: 'pani-classici',
      description: '',
      shortDescription: '',
      price: null,
      priceNote: 'Prezzo su richiesta',
      unit: 'kg',
      minOrder: undefined,
      image: '/images/products/default.jpg',
      available: true,
      featured: false,
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setEditingProduct(newProduct);
    setActiveView('edit');
  };

  const handleSave = (product: Product) => {
    const productWithSlug = {
      ...product,
      slug: createProductSlug(product.name),
      updatedAt: new Date().toISOString(),
    };

    if (products.find(p => p.id === product.id)) {
      updateProduct(productWithSlug);
    } else {
      addProduct(productWithSlug);
    }

    setActiveView('list');
    setEditingProduct(null);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setShowDeleteConfirm(null);
  };

  const handleToggleAvailable = (product: Product) => {
    updateProduct({ ...product, available: !product.available });
  };

  const handleToggleFeatured = (product: Product) => {
    updateProduct({ ...product, featured: !product.featured });
  };

  return (
    <div className="min-h-screen bg-farina-100">
      {/* Header */}
      <header className="bg-granite-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-6 h-6" />
              <span className="font-display text-lg font-semibold">
                Admin Panel
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-granite-400">
                Ultimo salvataggio: {lastUpdated ? new Date(lastUpdated).toLocaleString('it-IT') : 'Mai'}
              </span>
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
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeView === 'list' ? (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-granite-100 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-granite-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-granite-950">{stats.total}</p>
                    <p className="text-sm text-granite-500">Prodotti Totali</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-granite-950">{stats.available}</p>
                    <p className="text-sm text-granite-500">Disponibili</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-granite-950">{stats.featured}</p>
                    <p className="text-sm text-granite-500">In Evidenza</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-semibold text-granite-950">
                Gestione Prodotti
              </h2>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowResetConfirm(true)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </Button>
                <Button variant="primary" onClick={handleNew}>
                  <Plus className="w-5 h-5" />
                  Nuovo Prodotto
                </Button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-farina-50 border-b border-granite-100">
                    <th className="text-left text-sm font-semibold text-granite-600 px-6 py-4">
                      Prodotto
                    </th>
                    <th className="text-left text-sm font-semibold text-granite-600 px-6 py-4">
                      Categoria
                    </th>
                    <th className="text-left text-sm font-semibold text-granite-600 px-6 py-4">
                      Prezzo
                    </th>
                    <th className="text-center text-sm font-semibold text-granite-600 px-6 py-4">
                      Stato
                    </th>
                    <th className="text-right text-sm font-semibold text-granite-600 px-6 py-4">
                      Azioni
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-granite-100 hover:bg-farina-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-granite-100 rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-granite-400" />
                          </div>
                          <div>
                            <p className="font-medium text-granite-950">{product.name}</p>
                            <p className="text-sm text-granite-500 line-clamp-1">
                              {product.shortDescription}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge>
                          {productCategories.find(c => c.id === product.category)?.name}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-granite-600">
                        {product.priceNote || `€${product.price}/${product.unit}`}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleToggleAvailable(product)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              product.available
                                ? 'bg-green-100 text-green-600'
                                : 'bg-granite-100 text-granite-400'
                            }`}
                            title={product.available ? 'Disponibile' : 'Non disponibile'}
                          >
                            {product.available ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleToggleFeatured(product)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              product.featured
                                ? 'bg-yellow-100 text-yellow-600'
                                : 'bg-granite-100 text-granite-400'
                            }`}
                            title={product.featured ? 'In evidenza' : 'Non in evidenza'}
                          >
                            {product.featured ? <Star className="w-4 h-4" /> : <StarOff className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(product)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowDeleteConfirm(product.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <ProductEditor
            product={editingProduct!}
            onSave={handleSave}
            onCancel={() => {
              setActiveView('list');
              setEditingProduct(null);
            }}
          />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <Modal onClose={() => setShowDeleteConfirm(null)}>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-display text-xl font-semibold text-granite-950 mb-2">
                Conferma Eliminazione
              </h3>
              <p className="text-granite-600 mb-6">
                Sei sicuro di voler eliminare questo prodotto? L'azione non può essere annullata.
              </p>
              <div className="flex items-center justify-center gap-3">
                <Button variant="ghost" onClick={() => setShowDeleteConfirm(null)}>
                  Annulla
                </Button>
                <Button variant="danger" onClick={() => handleDelete(showDeleteConfirm)}>
                  Elimina
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <Modal onClose={() => setShowResetConfirm(false)}>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-display text-xl font-semibold text-granite-950 mb-2">
                Reset Prodotti
              </h3>
              <p className="text-granite-600 mb-6">
                Questo ripristinerà i prodotti ai valori iniziali. Tutte le modifiche andranno perse.
              </p>
              <div className="flex items-center justify-center gap-3">
                <Button variant="ghost" onClick={() => setShowResetConfirm(false)}>
                  Annulla
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    resetToInitial();
                    setShowResetConfirm(false);
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// Product Editor Component
function ProductEditor({
  product,
  onSave,
  onCancel,
}: {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Product>(product);
  const [errors, setErrors] = useState<Partial<Record<keyof Product, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name as keyof Product]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof Product, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Il nome è obbligatorio';
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'La descrizione breve è obbligatoria';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-semibold text-granite-950">
          {product.name ? 'Modifica Prodotto' : 'Nuovo Prodotto'}
        </h2>
        <Button variant="ghost" onClick={onCancel}>
          <X className="w-5 h-5" />
          Annulla
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Input
            label="Nome Prodotto"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            required
            placeholder="es. Pagnotta Classica"
          />

          <Select
            label="Categoria"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={productCategories.map(c => ({
              value: c.id,
              label: `${c.icon} ${c.name}`,
            }))}
          />
        </div>

        <div className="mb-6">
          <Input
            label="Descrizione Breve"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            error={errors.shortDescription}
            required
            placeholder="Una riga che descrive il prodotto"
          />
        </div>

        <div className="mb-6">
          <Textarea
            label="Descrizione Completa"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Descrizione dettagliata del prodotto..."
          />
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <Input
            label="Prezzo (opzionale)"
            name="price"
            type="number"
            step="0.01"
            value={formData.price || ''}
            onChange={handleChange}
            placeholder="0.00"
          />

          <Input
            label="Nota Prezzo"
            name="priceNote"
            value={formData.priceNote || ''}
            onChange={handleChange}
            placeholder="es. Prezzo su richiesta"
          />

          <Input
            label="Unità"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            placeholder="kg, pz, etc."
          />

          <Input
            label="Ordine Minimo"
            name="minOrder"
            type="number"
            value={formData.minOrder || ''}
            onChange={handleChange}
            placeholder="0"
          />
        </div>

        <div className="flex items-center gap-8 mb-8 p-4 bg-farina-50 rounded-lg">
          <Checkbox
            name="available"
            checked={formData.available}
            onChange={handleChange}
            label="Disponibile sul sito"
          />

          <Checkbox
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            label="In evidenza"
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" type="button" onClick={onCancel}>
            Annulla
          </Button>
          <Button type="submit" variant="primary">
            <Save className="w-5 h-5" />
            Salva Prodotto
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

// Modal Component
function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-granite-950/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
