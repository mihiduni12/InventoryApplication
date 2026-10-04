import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../store/productsSlice';

export default function FilterBar() {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.products.filters);
  const [category, setCategory] = useState(filters.category);

  const applyCategory = (e) => {
    e.preventDefault();
    dispatch(setFilters({ category: category.trim() }));
  };

  return (
    <div className="card filter-bar">
      <form onSubmit={applyCategory}>
        <input
          placeholder="Filter by category (e.g. Oils)"
          value={category}
          disabled={filters.lowStockOnly}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit" disabled={filters.lowStockOnly}>Search</button>
      </form>

      <label>
        <input
          type="checkbox"
          checked={filters.lowStockOnly}
          onChange={(e) => dispatch(setFilters({ lowStockOnly: e.target.checked }))}
        />
        Low stock only (&lt; 10)
      </label>
    </div>
  );
}
