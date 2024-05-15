import React, { useEffect, useState } from 'react';
import './Inventory.css'; 

const Inventory = () => {
    const [inventoryData, setInventoryData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/inventory/getAllItems')
            .then(response => response.json())
            .then(data => setInventoryData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="inventory-container">
            <h2>Inventory</h2>
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {inventoryData.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.SKU}</td>
                            <td>{item.category}</td>
                            <td>{item.brand}</td>
                            <td>{item.unit_price}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Inventory;