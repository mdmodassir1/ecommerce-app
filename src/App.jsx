import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ReviewProvider } from './context/ReviewContext';
import { AdminProvider } from './context/AdminContext';  
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AdminProvider>    
          <WishlistProvider>
            <ReviewProvider>
              <CartProvider>
                <div className="App">
                  <Header />
                  <main className="main-content">
                    <AppRoutes />
                  </main>
                  <Footer />
                </div>
              </CartProvider>
            </ReviewProvider>
          </WishlistProvider>
        </AdminProvider>    
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;