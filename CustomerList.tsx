// src/components/CustomerList.tsx
import React from 'react';
import { Customer } from './customer'; // Import the Customer interface

interface CustomerListProps {
  customers: Customer[];
  onSelect: (customerId: string) => void;
  selectedCustomerId: string | null;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onSelect, selectedCustomerId }) => {
  return (
    <div className="customer-list">
      <h2>Customer List</h2>
      <ul>
        {customers.map(customer => (
          <li
            key={customer.id}
            className={selectedCustomerId === customer.id ? 'selected' : ''}
            onClick={() => onSelect(customer.id)}
          >
            {customer.name} - {customer.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
