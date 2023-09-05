import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ResellerEmailResolver({ resellerId }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const resolveResellerEmail = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post('http://api.dcvip.one/api/reseller-email', { resellerId });
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error resolving reseller email:', error);
        // Handle the error, e.g., show an error message
      } finally {
        setIsLoading(false);
      }
    };

    resolveResellerEmail();
  }, [resellerId]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        email && <p>{email}</p>
      )}
    </div>
  );
}

export default ResellerEmailResolver;
