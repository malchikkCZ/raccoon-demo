import React from 'react';
import renderHydrogen from '@shopify/hydrogen/entry-server';
import {
  Router,
  FileRoutes,
  ShopifyProvider,
  CartProvider,
  Route,
} from '@shopify/hydrogen';
import { Suspense } from 'react';
import Layout from './components/Layout.server';

function App() {
  return (
    <Suspense fallback={null}>
      <ShopifyProvider>
        <CartProvider>
          <Router>
            <FileRoutes />
            <Route path="*" page={<NotFound />} />
          </Router>
        </CartProvider>
      </ShopifyProvider>
    </Suspense>
  );
}

function NotFound() {
  return (
    <Layout>
      <div className="container">
        <div>Page not found</div>
      </div>
    </Layout>
  );
}

export default renderHydrogen(App);
