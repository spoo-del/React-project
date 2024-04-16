// src/App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import CustomerList from './CustomerList';
import CustomerDetails from './CustomerDetails';
import { Customer } from './customer'; // Import the Customer interface

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      // Convert 'id' to string in the returned data
      setCustomers(data.map((user: any) => ({
        id: String(user.id),
        name: user.name,
        title: user.company.name,
        address: user.address.street,
      })));
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomerId(customerId);
  };

  return (
    <div className="app">
      <CustomerList
        customers={customers}
        onSelect={handleSelectCustomer}
        selectedCustomerId={selectedCustomerId}
      />
      <CustomerDetails
        customer={customers.find(customer => customer.id === selectedCustomerId) || null}
      />
    </div>
  );
};

export default App;
