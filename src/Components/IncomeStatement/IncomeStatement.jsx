import React, { useState, useEffect } from 'react';
import './IncomeStatement.css';

const IncomeStatement = () => {
    const [data, setData] = useState({ revenues: [], expenses: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/statement/income')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const totalRevenue = data.revenues.reduce((sum, item) => sum + item.total, 0);
    const totalExpense = data.expenses.reduce((sum, item) => sum + item.total, 0);
    const netIncome = totalRevenue - totalExpense;

    return (
        <div className="income-statement">
            <h1>Income Statement</h1>
            <div className="section">
                <h2>Revenues</h2>
                {data.revenues.map((item) => (
                    <div key={item.accountId} className="item">
                        <span className="account-name">{item.accountName}</span>
                        <span className="total">${item.total.toFixed(2)}</span>
                    </div>
                ))}
                <div className="item total-amount">
                    <span className="account-name">Total Revenue</span>
                    <span className="total">${totalRevenue.toFixed(2)}</span>
                </div>
            </div>
            <div className="section">
                <h2>Expenses</h2>
                {data.expenses.map((item) => (
                    <div key={item.accountId} className="item">
                        <span className="account-name">{item.accountName}</span>
                        <span className="total">${item.total.toFixed(2)}</span>
                    </div>
                ))}
                <div className="item total-amount">
                    <span className="account-name">Total Expense</span>
                    <span className="total">${totalExpense.toFixed(2)}</span>
                </div>
            </div>
            <div className="net-income">
                <h2>Net Income</h2>
                <div className="item">
                    <span className="account-name">Net Income</span>
                    <span className="total">${netIncome.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default IncomeStatement;
