import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';
import EditItem from './components/EditItem';

const App = () => {
  return (
    <Router>
      <div className="container mx-auto px-4 py-8">
        {/* Add ToastContainer at the App level */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/add" element={<ItemForm />} />
          <Route path="/edit/:id" element={<EditItem />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;