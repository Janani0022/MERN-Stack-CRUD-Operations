import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">MERN CRUD</Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-indigo-200 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/add" className="hover:text-indigo-200 transition-colors">Add Item</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;