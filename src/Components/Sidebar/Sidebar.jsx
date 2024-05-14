import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <h2 className="sidebar-title">Navigation</h2>
        <ul className="sidebar-list">
          <li className="sidebar-item"><Link to="/journal" className="sidebar-link">Journal</Link></li>
          <li className="sidebar-item"><Link to="/account" className="sidebar-link">Account</Link></li>
          <li className="sidebar-item"><Link to="/sales" className="sidebar-link">Sales</Link></li>
          <li className="sidebar-item"><Link to="/inventory" className="sidebar-link">Inventory</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
