import React, { useState, useEffect } from 'react';
import './BalanceSheet.css';

const BalanceSheet = () => {
    const [data, setData] = useState({ assets: [], liabilities: [], equities: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/statement/balanceSheet')
            .then(response => response.json())
            .then(data => {
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

    const totalAssets = data.assets.reduce((sum, item) => sum + item.total, 0);
    const totalLiabilities = data.liabilities.reduce((sum, item) => sum + item.total, 0);
    const totalEquities = data.equities.reduce((sum, item) => sum + item.total, 0);
    const totalLiabilitiesAndEquities = totalLiabilities + totalEquities;

    return (
        <div className="balance-sheet">
            <h1>Balance Sheet</h1>
            <div className="section">
                <h2>Assets</h2>
                {data.assets.map((item) => (
                    <div key={item.accountId} className="item">
                        <span className="account-name">{item.accountName}</span>
                        <span className="total">${item.total.toFixed(2)}</span>
                    </div>
                ))}
                <div className="item total-amount">
                    <span className="account-name">Total Assets</span>
                    <span className="total">${totalAssets.toFixed(2)}</span>
                </div>
            </div>
            <div className="section">
                <h2>Liabilities</h2>
                {data.liabilities.map((item) => (
                    <div key={item.accountId} className="item">
                        <span className="account-name">{item.accountName}</span>
                        <span className="total">${item.total.toFixed(2)}</span>
                    </div>
                ))}
                <div className="item total-amount">
                    <span className="account-name">Total Liabilities</span>
                    <span className="total">${totalLiabilities.toFixed(2)}</span>
                </div>
            </div>
            <div className="section">
                <h2>Equities</h2>
                {data.equities.map((item) => (
                    <div key={item.accountId} className="item">
                        <span className="account-name">{item.accountName}</span>
                        <span className="total">${item.total.toFixed(2)}</span>
                    </div>
                ))}
                <div className="item total-amount">
                    <span className="account-name">Total Equities</span>
                    <span className="total">${totalEquities.toFixed(2)}</span>
                </div>
            </div>
            <div className="section net-total">
                <div className="item">
                    <span className="account-name">Total Liabilities and Equities</span>
                    <span className="total">${totalLiabilitiesAndEquities.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default BalanceSheet;
