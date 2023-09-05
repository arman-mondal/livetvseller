import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SubAdminEmailReslover({ subadminId }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const resolveResellerEmail = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post('https://api.dcvip.one/api/subadmin-email', { subadminId });
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error resolving reseller email:', error);
        // Handle the error, e.g., show an error message
      } finally {
        setIsLoading(false);
      }
    };

    resolveResellerEmail();
  }, [subadminId]);

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

export default SubAdminEmailReslover;
