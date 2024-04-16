// src/components/CustomerDetails.tsx
import React, { useState, useEffect } from 'react';
import { Customer } from './customer'; // Import the Customer interface

// Define the CSS styles directly in the file
const styles = `
  .customer-details {
    padding: 20px;
  }

  .customer-details h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  .details {
    border: 1px solid #ccc;
    padding: 20px;
    margin-top: 10px;
  }

  .details p {
    margin: 5px 0;
  }

  .photo-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-top: 10px;
  }

  .photo-grid img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

interface CustomerDetailsProps {
  customer: Customer | null;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer }) => {
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`https://picsum.photos/v2/list?page=1&limit=9&seed=${Math.random()}`);
        const data = await response.json();
        const urls = data.map((photo: any) => photo.download_url);
        setPhotoUrls(urls);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    const intervalId = setInterval(() => {
      fetchPhotos(); // Fetch new photos every 10 seconds
    }, 10000);

    fetchPhotos(); // Initial fetch

    return () => clearInterval(intervalId); // Cleanup interval
  }, [customer]); // Run effect when customer changes

  return (
    <div className="customer-details">
      <style>{styles}</style> {/* Include the CSS styles */}
      <h2>Customer Details</h2>
      {customer ? (
        <div className="details">
          <p><strong>Name:</strong> {customer.name}</p>
          <p><strong>Title:</strong> {customer.title}</p>
          <p><strong>Address:</strong> {customer.address}</p>
          <div className="photo-grid">
            {photoUrls.map((photoUrl, idx) => (
              <img 
                key={idx} 
                src={photoUrl} 
                alt={`Photo ${idx}`} 
              />
            ))}
          </div>
        </div>
      ) : (
        <p>Please select a customer</p>
      )}
    </div>
  );
};

export default CustomerDetails;
