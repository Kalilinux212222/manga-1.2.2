import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '' // Added password to initial state
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);
    console.log('Sending login request to http://localhost:5001/api/login with data:', formData);

    try {
        const response = await axios.post('http://localhost:5001/api/login', formData, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 10000
        });
        console.log('Login response:', response.data);
        setSubmissionStatus({
            type: 'success',
            message: response.data.message
        });

        // Store user data correctly
        const userData = response.data.userData; // Ensure this is the correct path to user data
        localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage

        // Redirect to main page after successful login
        setTimeout(() => {
            navigate('/'); // Redirect to home page (adjust path as needed)
        }, 1000); // Optional delay to show success message

    } catch (error) {
        console.error('Login failed:', error.message, error.config);
        let errorMessage = 'An error occurred. Please try again.';
        if (axios.isAxiosError(error) && error.response) {
            errorMessage = error.response.data.message || errorMessage;
        } else if (error.request) {
            errorMessage = 'Unable to connect to the server. Please check your internet connection.';
        }
        setSubmissionStatus({
            type: 'error',
            message: errorMessage
        });
    } finally {
        setIsSubmitting(false);
    }
};

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <h2 className="font-semibold text-xl text-gray-600">Mobibeezz</h2>
        <p className="text-gray-500 mb-6">Log In to Your Account</p>

        <form onSubmit={handleSubmit} className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
            <div>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="email@domain.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password" // Fixed id (was incorrectly set to "email")
                value={formData.password}
                onChange={handleChange}
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white rounded px-4 py-2 disabled:bg-blue-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Log In'}
            </button>

            {submissionStatus && (
              <p className={`mt-4 ${submissionStatus.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                {submissionStatus.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;