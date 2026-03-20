import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import productService from '../services/productService';
import Loader from '../components/Loader';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState('all');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => { loadProducts(); }, []);
  useEffect(() => { filterProducts(); }, [selected, location.search, products]);

  const loadProducts = async () => {
    setLoading(true);
    const all = await productService.getAll();
    setProducts(all);
    setFiltered(all);
    setCategories([...new Set(all.map(p => p.category))]);
    setLoading(false);
  };

  const filterProducts = () => {
    let filtered = [...products];
    if (selected !== 'all') filtered = filtered.filter(p => p.category === selected);
    const search = new URLSearchParams(location.search).get('search');
    if (search) {
      filtered = filtered.filter(p => 
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(filtered);
  };

  if (loading) return <Loader />;

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to MyStore</h1>
        <p>Discover amazing products at great prices</p>
      </div>

      <div className="home-container">
        <aside className="sidebar">
          <h3>Categories</h3>
          <ul>
            <li className={selected === 'all' ? 'active' : ''} onClick={() => setSelected('all')}>
              <span>All Products</span>
              <span className="count">{products.length}</span>
            </li>
            {categories.map(cat => (
              <li key={cat} className={selected === cat ? 'active' : ''} onClick={() => setSelected(cat)}>
                <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                <span className="count">{products.filter(p => p.category === cat).length}</span>
              </li>
            ))}
          </ul>
        </aside>

        <main>
          <div className="results">Showing {filtered.length} products</div>
          <ProductGrid products={filtered} />
        </main>
      </div>
    </div>
  );
};

export default Home;