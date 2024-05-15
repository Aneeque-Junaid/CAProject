import React, { useState } from 'react';
import axios from 'axios';
import './CreateAccount.css';

const CreateAccount = () => {
    const [accountName, setAccountName] = useState('');
    const [accountType, setAccountType] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const nameRegex = /^[a-zA-Z_]+$/;
        if (!nameRegex.test(accountName)) {
            alert('Account name must contain only letters and underscores');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/account/createAccount', {
                accountName,
                accountType
            });
            console.log('Account created successfully:', response.data);

            setAccountName('');
            setAccountType('');

            window.location.reload();
        } catch (error) {
            console.error('Error creating account:', error);
        }
    };

    return (
        <div className="create-account-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="accountName">Account Name:</label>
                    <input
                        type="text"
                        id="accountName"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        required
                        className="account-name-input"
                    />
                </div>
                <div>
                    <label htmlFor="accountType">Account Type:</label>
                    <select
                        id="accountType"
                        value={accountType}
                        onChange={(e) => setAccountType(e.target.value)}
                        required
                        className="account-type-dropdown"
                    >
                        <option value="">Select Account Type</option>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                        <option value="asset">Asset</option>
                        <option value="liability">Liability</option>
                    </select>
                </div>
                <button type="submit" className="create-account-button">Create Account</button>
            </form>
        </div>
    );
};

export default CreateAccount;
