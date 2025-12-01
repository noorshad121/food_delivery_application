import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import {Route,Routes } from 'react-router-dom';
import Add from './pages/Add/Add.jsx';
import List from "./pages/List/List.jsx";
import Order from "./pages/Orders/Order.jsx"
import { ToastContainer } from 'react-toastify';

const url = "http://localhost:8000"
const App = () => {
  return (
    <div>
      <ToastContainer position='top-center' />
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
           <Route path="/list" element={<List url={url} />} />
            <Route path="/order" element={<Order url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
