import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { login } from '../../redux/Auth/Action';
import LoadingBar from 'react-top-loading-bar';
import { Toaster, toast } from 'react-hot-toast';

const InputField = ({ label, type, name, value, onChange, placeholder, icon: Icon, onIconClick }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
      {label}<sup className="text-red-500">*</sup>
    </label>
    <div className="relative">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
      {Icon && (
        <span className="absolute right-0 top-0 mt-2 mr-3 text-gray-500 cursor-pointer">
          <Icon onClick={onIconClick} />
        </span>
      )}
    </div>
  </div>
);

const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProgress(30);
    setIsLoggedIn(true);
    try {
      await dispatch(login(userData));
      setProgress(100);
      toast.success('Login successful');
      
      // Check the previous page
      const previousPage = document.referrer;
      if (previousPage.includes('/unauthorized')) {
        navigate('/'); // or navigate to a default page
      } else {
        setTimeout(() => {
          navigate(-1);
        }, 500);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setProgress(0);
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <Toaster />
      <LoadingBar
        color="#4F46E5"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Email Address"
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Enter email address"
        />
        <InputField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Enter password"
          icon={showPassword ? AiOutlineEye : AiOutlineEyeInvisible}
          onIconClick={() => setShowPassword(!showPassword)}
        />
        <div className="flex items-center justify-between mb-6">
          <div></div>
          <Link to="/forgotPassword" className="text-sm text-indigo-600 hover:text-indigo-800">
            Forgot Password?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
        >
          Log In
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{' '}
        <Link to="/signup" className="text-indigo-600 hover:text-indigo-800">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;