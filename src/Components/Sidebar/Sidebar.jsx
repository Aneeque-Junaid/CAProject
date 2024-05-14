import React from 'react';
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar-container">
            <div className="sidebar">
                <h2 className="sidebar-title">Navigation</h2>
                <ul className="sidebar-list">
                    <li className="sidebar-item"><a href="/account" className="sidebar-link">Accounts</a></li>
                    <li className="sidebar-item"><a href="/journal" className="sidebar-link">Journal</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
