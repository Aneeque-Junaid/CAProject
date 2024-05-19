import React from 'react';
import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import InventoryPage from './Pages/InventoryPage';
import JournalPage from './Pages/JournalPage';
import SalesPage from './Pages/SalesPage';
import AccountsPage from './Pages/AccountsPage';
import IncomeStatement from './Components/IncomeStatement/IncomeStatement';
import BalanceSheet from "./Components/BalanceSheet/BalanceSheet"

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
            <Route path="/incomeStatement" element={<IncomeStatement />} />
            <Route path="/balanceSheet" element={<BalanceSheet />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
