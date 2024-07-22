import React from 'react';
import CreateAccount from "../Components/CreateAccount/CreateAccount"
import TrialBalance from "../Components/TrialBalance/TrialBalance"


const AccountsPage = () => {
  return (
    <div>
      <h2>Accounts</h2>
      <CreateAccount />
      <TrialBalance />

    </div>
  );
}

export default AccountsPage;
