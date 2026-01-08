import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ProductsProvider } from './context/ProductsContext';
import { Layout } from './components/layout';
import { HomePage } from './pages/Home';
import { ProductsPage } from './pages/Products';
import { ContactPage } from './pages/Contact';
import { AdminPage } from './pages/Admin';
import './styles/globals.css';

// Lazy load less critical pages
const AboutPage = React.lazy(() => import('./pages/About').then(m => ({ default: m.AboutPage })));
const B2BPage = React.lazy(() => import('./pages/B2B').then(m => ({ default: m.B2BPage })));
const NotFoundPage = React.lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFoundPage })));

function App() {
  return (
    <HelmetProvider>
      <ProductsProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes with Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="prodotti" element={<ProductsPage />} />
              <Route path="contatti" element={<ContactPage />} />
              <Route
                path="chi-siamo"
                element={
                  <React.Suspense fallback={<PageLoader />}>
                    <AboutPage />
                  </React.Suspense>
                }
              />
              <Route
                path="ristoranti"
                element={
                  <React.Suspense fallback={<PageLoader />}>
                    <B2BPage />
                  </React.Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <React.Suspense fallback={<PageLoader />}>
                    <NotFoundPage />
                  </React.Suspense>
                }
              />
            </Route>

            {/* Admin route without Layout */}
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </BrowserRouter>
      </ProductsProvider>
    </HelmetProvider>
  );
}

// Page loader component
function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-granite-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// Mount app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
