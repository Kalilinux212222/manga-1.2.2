import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '', // Added password field to state
    address: '',
    city: '',
    country: '',
    state: '',
    zipcode: '',
    billingSame: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);
    console.log('Sending request to http://localhost:5001/api/register with data:', formData);
  
    try {
      const response = await axios.post('http://localhost:5001/api/register', formData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
      });
      console.log('Response:', response.data);
      setSubmissionStatus({ type: 'success', message: 'Registration successful!' });
    } catch (error) {
      console.error('Request failed:', error.message, error.config);
      setSubmissionStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Registration failed. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <h2 className="font-semibold text-xl text-gray-600">Mobibeezz</h2>
        <p className="text-gray-500 mb-6">Register Your Information With Us!</p>

        <form onSubmit={handleSubmit} className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="text-gray-600">
              <p className="font-medium text-lg">Personal Details</p>
              <p className="font-bold">Let's Start!</p>
            </div>

            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-5">
                  <label htmlFor="full_name">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    id="full_name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    required
                  />
                </div>

                <div className="md:col-span-5">
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

                <div className="md:col-span-5">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="Enter your password"
                    required
                    minLength="8" // Optional: minimum password length
                  />
                </div>

                <div className="md:col-span-3">
                  <label htmlFor="address">Address / Street</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="country">Country / Region</label>
                  <input
                    name="country"
                    type="text"
                    id="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="state">State / Province</label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="zipcode">Zip / Postal Code</label>
                  <input
                    type="text"
                    name="zipcode"
                    id="zipcode"
                    value={formData.zipcode}
                    onChange={handleChange}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    required
                  />
                </div>

                <div className="md:col-span-5">
                  <label>
                    <input
                      type="checkbox"
                      name="billingSame"
                      checked={formData.billingSame}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Billing address is the same as above
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white rounded px-4 py-2 disabled:bg-blue-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Register'}
          </button>

          {submissionStatus && (
            <p className={`mt-4 ${submissionStatus.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {submissionStatus.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;