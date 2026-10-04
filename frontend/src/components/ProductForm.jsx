import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveProduct, cancelEdit } from '../store/productsSlice';

const EMPTY = { name: '', category: '', quantity: '', price: '' };

export default function ProductForm() {
  const dispatch = useDispatch();
  const editing = useSelector((s) => s.products.editing);
  const [form, setForm] = useState(EMPTY);

  // Fill the form when a row is being edited, reset when done
  useEffect(() => {
    setForm(editing ? { ...editing } : EMPTY);
  }, [editing]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...(editing ? { id: editing.id } : {}),
      name: form.name.trim(),
      category: form.category.trim(),
      quantity: Number(form.quantity),
      price: Number(form.price),
    };
    const result = await dispatch(saveProduct(payload));
    if (result.meta.requestStatus === 'fulfilled') setForm(EMPTY);
  };

  return (
    <form className="card form" onSubmit={onSubmit}>
      <h2>{editing ? `Edit product #${editing.id}` : 'Add product'}</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
      <input name="category" placeholder="Category" value={form.category} onChange={onChange} required />
      <input name="quantity" type="number" min="0" placeholder="Quantity" value={form.quantity} onChange={onChange} required />
      <input name="price" type="number" min="0.01" step="0.01" placeholder="Price" value={form.price} onChange={onChange} required />
      <div className="actions">
        <button type="submit">{editing ? 'Update' : 'Add'}</button>
        {editing && (
          <button type="button" className="secondary" onClick={() => dispatch(cancelEdit())}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
