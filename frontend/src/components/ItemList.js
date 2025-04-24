import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/items');
        setItems(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch items');
        setLoading(false);
        console.error(err);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`http://localhost:5000/api/items/${id}`);
        setItems(items.filter(item => item._id !== id));
        toast.success('Item deleted successfully');
      } catch (err) {
        console.error(err);
        setError('Failed to delete item');
        toast.error('Failed to delete item');
      }
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.price.toString().includes(searchTerm)
  );

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  return (
    <div>
      <Header />
      <div className="container mx-auto p-0">
        <ToastContainer />
        <h1 className="text-3xl font-bold mb-6 mt-4 text-center">Items</h1>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}

        <div className="flex justify-end mb-6"> 
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-xl w-1/3 bg-indigo-100"
          />
        </div>

        {filteredItems.length === 0 ? (
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6">
            No items found. <Link to="/add" className="underline font-medium">Add one</Link>
          </div>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.map(item => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap">{item.name}</td>
                    <td className="py-4 px-4">{item.description}</td>
                    <td className="py-4 px-4 whitespace-nowrap">{item.category}</td>
                    <td className="py-4 px-4 whitespace-nowrap">Rs.{item.price.toFixed(2)}</td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <Link
                        to={`/edit/${item._id}`}
                        className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-md mr-2 hover:bg-blue-700"
                      >
                        Edit
                      </Link>
                      <button
                        className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Link
          to="/add"
          className="mt-6 inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
        >
          Add New Item
        </Link>
      </div>
    </div>
  );
};

export default ItemList;
