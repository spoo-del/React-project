// src/App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders customer list and details components', () => {
  render(<App />);
  
  // Check if "Customer List" text is present
  const customerListElement = screen.getByText(/customer list/i);
  expect(customerListElement).toBeInTheDocument();

  // Check if "Customer Details" text is present
  const customerDetailsElement = screen.getByText(/customer details/i);
  expect(customerDetailsElement).toBeInTheDocument();
});
