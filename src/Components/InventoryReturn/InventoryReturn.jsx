import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryReturn = () => {
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [returnToAccount, setReturnToAccount] = useState('');
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
    if (!returnToAccount) {
      setErrorMessage('Please select return to account option.');
      return;
    }

    // Forming the request body
    const requestBody = {
      id: itemId,
      quantity: quantity,
      returnToAccount: returnToAccount
    };

    // Making the API call to return inventory
    axios.post('http://localhost:5000/inventory/returnInventory', requestBody)
      .then(response => {
        setSuccessMessage('Inventory returned successfully.');
        setErrorMessage('');
        // Clearing form fields
        setItemId('');
        setQuantity(0);
        setReturnToAccount('');
      })
      .catch(error => {
        setSuccessMessage('');
        setErrorMessage('Error returning inventory.');
        console.error('Error returning inventory:', error);
      });
  };

  return (
    <div className="inventory-return-container">
      <h2>Inventory Return</h2>
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
      <div className="form-group">
        <label htmlFor="returnToAccount">Return to Account:</label>
        <select id="returnToAccount" value={returnToAccount} onChange={(e) => setReturnToAccount(e.target.value)}>
          <option value="">Select an option</option>
          <option value="cash">Cash</option>
          <option value="account_receivable">account_receivable</option>
        </select>
      </div>
      <button onClick={handleReturnSubmit}>Return</button>
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default InventoryReturn;
