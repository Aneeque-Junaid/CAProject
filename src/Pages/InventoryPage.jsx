// Journal.jsx
import React from 'react';
import AddToInventory from '../Components/AddToInventory/AddToInventory';
import Inventory from '../Components/Inventory/Inventory';
import InventoryReturn from '../Components/InventoryReturn/InventoryReturn';

const InventoryPage = () => {
  return (
    <div>
      <h2>Inventory</h2>
      <AddToInventory />
      <Inventory />
      <InventoryReturn/>

    </div>
  );
}

export default InventoryPage;
