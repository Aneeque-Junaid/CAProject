import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./PostToJournal.css";

const PostToJournal = () => {
    const [debitFields, setDebitFields] = useState([{ account: '', amount: '' }]);
    const [creditFields, setCreditFields] = useState([{ account: '', amount: '' }]);
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [accountOptions, setAccountOptions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/account/getAllAccounts')
            .then(response => response.json())
            .then(data => {
                let accounts = [];
                data.forEach(element => {
                    accounts.push(element.account);
                });
                setAccountOptions(['none', ...accounts]);
            })
            .catch(error => console.error('Error fetching account options:', error));
    }, []);

    const handleDebitFieldChange = (index, key, value) => {
        const newFields = [...debitFields];
        newFields[index][key] = value;
        setDebitFields(newFields);
    };

    const handleCreditFieldChange = (index, key, value) => {
        const newFields = [...creditFields];
        newFields[index][key] = value;
        setCreditFields(newFields);
    };

    const handleAddDebitField = () => {
        setDebitFields([...debitFields, { account: '', amount: '' }]);
    };

    const handleAddCreditField = () => {
        setCreditFields([...creditFields, { account: '', amount: '' }]);
    };

    const handleRemoveDebitField = (index) => {
        const newFields = [...debitFields];
        newFields.splice(index, 1);
        setDebitFields(newFields);
    };

    const handleRemoveCreditField = (index) => {
        const newFields = [...creditFields];
        newFields.splice(index, 1);
        setCreditFields(newFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const isAnyDebitFieldEmpty = debitFields.some(field => field.account === '' || field.account === 'none');
        const isAnyCreditFieldEmpty = creditFields.some(field => field.account === '' || field.account === 'none');

        if (isAnyDebitFieldEmpty || isAnyCreditFieldEmpty) {
            alert('Please select an account for all debit and credit fields.');
            return;
        }

        const debitData = debitFields.map(({ account, amount }) => [account, parseInt(amount)]);
        const creditData = creditFields.map(({ account, amount }) => [account, parseInt(amount)]);
        const formData = {
            date: date,
            description: description,
            debit: debitData,
            credit: creditData,
        };

        try {
            const response = await axios.post('http://localhost:5000/journal/post', formData);
            console.log('Form submitted successfully:', response.data);

            // Clear form fields after successful submission
            setDate('');
            setDescription('');
            setDebitFields([{ account: '', amount: '' }]);
            setCreditFields([{ account: '', amount: '' }]);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form className="post-to-journal-form" onSubmit={handleSubmit}>
            <div>
                <label>Date:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="date-input" />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="description-input" />
            </div>

            <section className="debit-section">
                <h2>Debit</h2>
                {debitFields.map((field, index) => (
                    <div key={index} className="debit-field">
                        <select
                            required={true}
                            value={field.account}
                            onChange={(e) => handleDebitFieldChange(index, 'account', e.target.value)}
                            className="account-dropdown"
                        >
                            {accountOptions.map((option, idx) => (
                                <option key={idx} value={option}>{option}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            value={field.amount}
                            onChange={(e) => handleDebitFieldChange(index, 'amount', e.target.value)}
                            className="amount-input"
                        />
                        {index > 0 && <button type="button" onClick={() => handleRemoveDebitField(index)} className="remove-field-button">&#10005;</button>}
                    </div>
                ))}
                <button type="button" onClick={handleAddDebitField} className="add-field-button">Add Debit Field</button>
            </section>

            <section className="credit-section">
                <h2>Credit</h2>
                {creditFields.map((field, index) => (
                    <div key={index} className="credit-field">
                        <select
                            required={true}
                            value={field.account}
                            onChange={(e) => handleCreditFieldChange(index, 'account', e.target.value)}
                            className="account-dropdown"
                        >
                            {accountOptions.map((option, idx) => (
                                <option key={idx} value={option}>{option}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            value={field.amount}
                            onChange={(e) => handleCreditFieldChange(index, 'amount', e.target.value)}
                            className="amount-input"
                        />
                        {index > 0 && <button type="button" onClick={() => handleRemoveCreditField(index)} className="remove-field-button">&#10005;</button>}
                    </div>
                ))}
                <button type="button" onClick={handleAddCreditField} className="add-field-button">Add Credit Field</button>
            </section>

            <button type="submit" className="submit-button">Submit</button>
        </form>
    );
};

export default PostToJournal;
