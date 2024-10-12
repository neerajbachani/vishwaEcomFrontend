import React, { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, register } from '../../redux/Auth/Action';
import LoadingBar from 'react-top-loading-bar';
import { Toaster, toast } from 'react-hot-toast';

const SignUpForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  function changeHandler(event) {
    setUserData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    try {
      event.preventDefault();
      if (userData.password !== userData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      setProgress(100);
      dispatch(
        register(userData, () => {
          setProgress(0);
          setIsLoggedIn(true);
          toast.success('Account created successfully');
          navigate('/home', { replace: true });
        })
      );
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      setProgress(0);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Toaster />
      <LoadingBar color="#f11946" progress={progress} />
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Create an Account</h2>
        
        {/* First Name and Last Name */}
        <div className="flex gap-4 mb-5">
          <div className="w-1/2">
            <label className="block mb-2 text-gray-600">First Name<sup>*</sup></label>
            <input
              required
              type="text"
              name="firstName"
              onChange={changeHandler}
              placeholder="John"
              value={userData.firstName}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-2 text-gray-600">Last Name<sup>*</sup></label>
            <input
              required
              type="text"
              name="lastName"
              onChange={changeHandler}
              placeholder="Doe"
              value={userData.lastName}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="mb-5">
          <label className="block mb-2 text-gray-600">Email Address<sup>*</sup></label>
          <input
            required
            type="email"
            name="email"
            onChange={changeHandler}
            placeholder="john.doe@example.com"
            value={userData.email}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password and Confirm Password */}
        <div className="mb-5">
          <label className="block mb-2 text-gray-600">Create Password<sup>*</sup></label>
          <div className="relative">
            <input
              required
              type={showPassword1 ? 'text' : 'password'}
              name="password"
              onChange={changeHandler}
              placeholder="Enter Password"
              value={userData.password}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span
              className="absolute right-3 top-3 text-xl cursor-pointer text-gray-600"
              onClick={() => setShowPassword1(!showPassword1)}
            >
              {showPassword1 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-gray-600">Confirm Password<sup>*</sup></label>
          <div className="relative">
            <input
              required
              type={showPassword2 ? 'text' : 'password'}
              name="confirmPassword"
              onChange={changeHandler}
              placeholder="Confirm Password"
              value={userData.confirmPassword}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span
              className="absolute right-3 top-3 text-xl cursor-pointer text-gray-600"
              onClick={() => setShowPassword2(!showPassword2)}
            >
              {showPassword2 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        >
          Create Account
        </button>

        {/* Already have an account */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link className="text-blue-500 hover:underline" to="/signin">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;

