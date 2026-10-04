import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, clearError } from './store/productsSlice';
import FilterBar from './components/FilterBar';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';

export default function App() {
  const dispatch = useDispatch();
  const { filters, status, error } = useSelector((s) => s.products);

  // Re-fetch whenever the filters change
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, filters]);

  return (
    <div className="container">
      <h1>Inventory Manager</h1>

      {error && (
        <div className="error" onClick={() => dispatch(clearError())}>
          {error} <small>(click to dismiss)</small>
        </div>
      )}

      <ProductForm />
      <FilterBar />
      {status === 'loading' && <p className="muted">Loading...</p>}
      <ProductTable />
    </div>
  );
}
