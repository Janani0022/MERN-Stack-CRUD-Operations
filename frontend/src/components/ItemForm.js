import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ItemForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: ''
  });

  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { name, description, category, price } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!category.trim()) newErrors.category = 'Category is required';
    if (!price) newErrors.price = 'Price is required';
    else if (isNaN(price) || parseFloat(price) <= 0) newErrors.price = 'Price must be a positive number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (!validateForm() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const newItem = {
        name,
        description,
        category,
        price: parseFloat(price)
      };

      await axios.post('http://localhost:5000/api/items', newItem);
      
      // Show toast notification
      toast.success('Item added successfully');
      
      // Navigate after a brief delay to allow toast to be visible
      setTimeout(() => {
        navigate('/');
      }, 800);
      
    } catch (err) {
      console.error(err);
      setError('Failed to add item');
      toast.error('Failed to add item');
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Add New Item</h1>
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={onSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className={`shadow appearance-none border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            id="name"
            type="text"
            placeholder="Enter name"
            name="name"
            value={name}
            onChange={onChange}
          />
          {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className={`shadow appearance-none border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            id="description"
            rows="3"
            placeholder="Enter description"
            name="description"
            value={description}
            onChange={onChange}
          ></textarea>
          {errors.description && <p className="text-red-500 text-xs italic mt-1">{errors.description}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <input
            className={`shadow appearance-none border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            id="category"
            type="text"
            placeholder="Enter category"
            name="category"
            value={category}
            onChange={onChange}
          />
          {errors.category && <p className="text-red-500 text-xs italic mt-1">{errors.category}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className={`shadow appearance-none border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            id="price"
            type="number"
            step="0.01"
            placeholder="Enter price"
            name="price"
            value={price}
            onChange={onChange}
          />
          {errors.price && <p className="text-red-500 text-xs italic mt-1">{errors.price}</p>}
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Item'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;