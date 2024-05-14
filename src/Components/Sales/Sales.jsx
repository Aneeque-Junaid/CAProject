import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sales.css';

const Sales = () => {
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [items, setItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetching all items
    axios.get('http://localhost:5000/inventory/getAllItems')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  const handleSaleSubmit = () => {
    if (!itemId) {
      setErrorMessage('Please select an item.');
      return;
    }

    // Forming the request body
    const requestBody = {
      id: itemId,
      quantity: quantity
    };

    // Making the API call to sell item
    axios.post('http://localhost:5000/sale/sellItem', requestBody)
      .then(response => {
        setSuccessMessage('Item sold successfully.');
        setErrorMessage('');
        // Clear fields and refresh form
        setItemId('');
        setQuantity(0);
        // Fetch items again to update dropdown
        axios.get('http://localhost:5000/inventory/getAllItems')
          .then(response => {
            setItems(response.data);
          })
          .catch(error => {
            console.error('Error fetching items:', error);
          });
      })
      .catch(error => {
        setSuccessMessage('');
        setErrorMessage('Error selling item.');
        console.error('Error selling item:', error);
      });
  };

  return (
    <div className="sales-container">
      <h2>Sales</h2>
      <div className="form-group">
        <label htmlFor="item">Select Item:</label>
        <select id="item" value={itemId} onChange={(e) => setItemId(e.target.value)}>
          <option value="">Select an item</option>
          {items.map(item => (
            <option key={item.id} value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Quantity:</label>
        <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </div>
      <button onClick={handleSaleSubmit}>Sell</button>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default Sales;
