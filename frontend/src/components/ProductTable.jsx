import { useDispatch, useSelector } from 'react-redux';
import { removeProduct, startEdit } from '../store/productsSlice';

export default function ProductTable() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.products);

  if (status !== 'loading' && items.length === 0) {
    return <p className="muted">No products found.</p>;
  }

  const onDelete = (p) => {
    if (window.confirm(`Delete "${p.name}"?`)) dispatch(removeProduct(p.id));
  };

  return (
    <div className="card">
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Category</th><th>Qty</th><th>Price</th><th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id} className={p.quantity < 10 ? 'low' : ''}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.quantity}</td>
              <td>${Number(p.price).toFixed(2)}</td>
              <td className="row-actions">
                <button className="secondary" onClick={() => dispatch(startEdit(p))}>Edit</button>
                <button className="danger" onClick={() => onDelete(p)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
