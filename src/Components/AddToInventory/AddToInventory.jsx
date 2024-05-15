import React, { useState, useEffect } from 'react';
import './AddToInventory.css';

const AddToInventory = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        brand: '',
        pricePaid: '',
        quantity: '',
        paidWithAccount: ''
    });
    const [touchedDropdown, setTouchedDropdown] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDropdownBlur = () => {
        setTouchedDropdown(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.paidWithAccount && touchedDropdown) {
            fetch('http://localhost:5000/inventory/addToInventory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Item added successfully:', data);
                setFormData({
                    name: '',
                    category: '',
                    brand: '',
                    pricePaid: '',
                    quantity: '',
                    paidWithAccount: ''
                });
                setFormSubmitted(true);
            })
            .catch(error => console.error('Error adding item:', error));
        } else {
            console.error('Please select an account.');
        }
    };

    useEffect(() => {
        if (formSubmitted) {
            window.location.reload();
        }
    }, [formSubmitted]);

    return (
        <div className="add-to-inventory-container">
            <h2>Add to Inventory</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="brand">Brand:</label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pricePaid">Price Paid:</label>
                    <input
                        type="number"
                        id="pricePaid"
                        name="pricePaid"
                        value={formData.pricePaid}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="paidWithAccount">Paid With Account:</label>
                    <select
                        id="paidWithAccount"
                        name="paidWithAccount"
                        value={formData.paidWithAccount}
                        onChange={handleChange}
                        onBlur={handleDropdownBlur}
                        required
                        className={touchedDropdown && !formData.paidWithAccount ? 'invalid' : ''}
                    >
                        <option value="">Select an account</option>
                        <option value="cash">Cash</option>
                        <option value="accounts_payable">Accounts Payable</option>
                    </select>
                    {touchedDropdown && !formData.paidWithAccount && (
                        <div className="error-message">Please select an account.</div>
                    )}
                </div>
                <button type="submit">Add Item</button>
            </form>
        </div>
    );
};

export default AddToInventory;
