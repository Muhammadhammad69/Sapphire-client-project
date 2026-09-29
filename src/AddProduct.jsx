import React, { useState } from 'react';
import axios from 'axios';

function AddProduct({ onProductAdded }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title || !price || !description || !image || !category) {
      setError('Please fill in all fields.');
      return;
    }

    if (isNaN(price) || Number(price) <= 0) {
      setError('Please enter a valid price greater than 0.');
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/products', {
        title,
        price: Number(price),
        description,
        image,
        category
      });
      setSuccess('Product added successfully!');
      setTitle('');
      setPrice('');
      setDescription('');
      setImage('');
      setCategory('');
      setLoading(false);
      onProductAdded();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add product.');
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', marginBottom: '30px', maxWidth: '600px' }}>
      <h3>Add New Product</h3>
      {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
      {success && <p style={{ color: 'green', fontSize: '14px' }}>{success}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Product Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="number" 
          placeholder="Price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="text" 
          placeholder="Image URL" 
          value={image} 
          onChange={(e) => setImage(e.target.value)} 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="text" 
          placeholder="Category" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button 
          type="submit" 
          disabled={loading} 
          style={{ padding: '10px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;