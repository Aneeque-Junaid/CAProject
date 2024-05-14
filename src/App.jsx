// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import InventoryPage from './Pages/InventoryPage';
import JournalPage from './Pages/JournalPage';
import SalesPage from './Pages/SalesPage';
import AccountsPage from './Pages/AccountsPage';
import './App.css'; // Import your custom styles here

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/account" element={<AccountsPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
