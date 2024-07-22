import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./JournalTable.css";

const JournalTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/journal/getAllEntries');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="journal-table-container">
            <h2 className="table-heading">Journal Entries</h2>
            <table className="journal-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Account</th>
                        <th>Debit</th>
                        <th>Credit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{new Date(item.date).toLocaleDateString()}</td>
                            <td>{item.description}</td>
                            <td className="account-cell">
                                {item.documents.debit.map((entry, index) => (
                                    <div key={index}>
                                        <p>{entry.account}</p>
                                    </div>
                                ))}
                                {item.documents.credit.map((entry, index) => (
                                    <div key={index}>
                                        <p>{entry.account}</p>
                                    </div>
                                ))}
                            </td>
                            <td className="debit-cell">
                                {item.documents.debit.map((entry, index) => (
                                    <div key={index}>
                                        <p>{entry.amount}</p>
                                    </div>
                                ))}
                                {item.documents.credit.map(() => (
                                    <div key={item.id}>
                                        <p>.</p>
                                    </div>
                                ))}
                            </td>
                            <td className="credit-cell">
                                {item.documents.debit.map(() => (
                                    <div key={item.id}>
                                        <p>.</p>
                                    </div>
                                ))}
                                {item.documents.credit.map((entry, index) => (
                                    <div key={index}>
                                        <p>{entry.amount}</p>
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JournalTable;
