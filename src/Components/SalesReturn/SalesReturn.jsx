import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./SalesReturn.css"

const SalesReturn = () => {
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

  const handleReturnSubmit = () => {
    if (!itemId) {
      setErrorMessage('Please select an item.');
      return;
    }

    // Forming the request body
    const requestBody = {
      id: itemId,
      quantity: quantity
    };

    // Making the API call to return sale
    axios.post('http://localhost:5000/sale/saleReturn', requestBody)
      .then(response => {
        setSuccessMessage('Sale returned successfully.');
        setErrorMessage('');
        // Clearing form fields
        setItemId('');
        setQuantity(0);
      })
      .catch(error => {
        setSuccessMessage('');
        setErrorMessage('Error returning sale.');
        console.error('Error returning sale:', error);
      });
  };

  return (
    <div className="sales-return-container">
      <h2>Sales Return</h2>
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
      <button onClick={handleReturnSubmit}>Return</button>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default SalesReturn;
