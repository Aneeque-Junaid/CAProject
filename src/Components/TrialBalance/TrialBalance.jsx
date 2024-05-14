import React, { useEffect, useState } from 'react';
import './TrialBalance.css'; // Import CSS file

const TrialBalance = () => {
    const [trialBalanceData, setTrialBalanceData] = useState([]);

    useEffect(() => {
        // Fetch data from the server
        fetch('http://localhost:5000/account/getAllAccountDetails')
            .then(response => response.json())
            .then(data => setTrialBalanceData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Function to calculate total debit and credit for each account
    const calculateTotal = (details) => {
        let totalDebit = 0;
        let totalCredit = 0;
        details.forEach(detail => {
            if (detail.debit) totalDebit += detail.debit;
            if (detail.credit) totalCredit += detail.credit;
        });
        return { totalDebit, totalCredit };
    };

    // Function to calculate total debit and credit for all accounts
    const calculateGrandTotal = () => {
        let grandTotalDebit = 0;
        let grandTotalCredit = 0;
        trialBalanceData.forEach(account => {
            const { totalDebit, totalCredit } = calculateTotal(account.details);
            grandTotalDebit += totalDebit;
            grandTotalCredit += totalCredit;
        });
        return { grandTotalDebit, grandTotalCredit };
    };

    const grandTotal = calculateGrandTotal();

    return (
        <div className="trial-balance-container">
            <h2>Trial Balance</h2>
            <table className="trial-balance-table">
                <thead>
                    <tr>
                        <th>Account Name</th>
                        <th>Total Debit</th>
                        <th>Total Credit</th>
                    </tr>
                </thead>
                <tbody>
                    {trialBalanceData.map(account => (
                        <tr key={account.accountId}>
                            <td>{account.accountName}</td>
                            <td>{calculateTotal(account.details).totalDebit}</td>
                            <td>{calculateTotal(account.details).totalCredit}</td>
                        </tr>
                    ))}
                    <tr className="total-row">
                        <td><strong>Total</strong></td>
                        <td>{grandTotal.grandTotalDebit}</td>
                        <td>{grandTotal.grandTotalCredit}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TrialBalance;