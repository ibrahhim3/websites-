import { useState } from 'react';
import axios from 'axios';

function VerifyCodePage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleVerification = async () => {
    try {
      const response = await axios.post('/api/verify-code', { email, code });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Something went wrong. Try again.'
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Verify Code</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        />
        <input
          type="text"
          placeholder="Enter verification code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        />
        <button
          onClick={handleVerification}
          className="w-full bg-blue-500 text-white p-2 rounded-md"
        >
          Verify
        </button>
        {message && (
          <p className={`mt-4 text-center ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default VerifyCodePage;
