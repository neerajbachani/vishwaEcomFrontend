import React from 'react';
import { Link } from 'react-router-dom';

const UnAuthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-700">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in">
          Unauthorized Access
        </h1>
        <p className="text-gray-600 mb-6 animate-fade-in">
          You are not authorized to access this page. Please sign up or log in to continue.
        </p>
        <Link
          to="/signin"
          className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
        >
          Go to Sign In
        </Link>
      </div>
    </div>
  );
};

export default UnAuthorizedPage;
