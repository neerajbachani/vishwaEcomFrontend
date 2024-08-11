


import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../redux/Auth/Action';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import LoadingBar from 'react-top-loading-bar';
import { Toaster, toast } from 'react-hot-toast';
import { showSuccessToast, showErrorToast } from '../toast';

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

  function changeHandler(event) {
    setUserData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    setProgress(30);
    setIsLoggedIn(true);
    try {
      await dispatch(login(userData));
      window.location.reload();
      setProgress(100);
      showSuccessToast('Login successful');
      setTimeout(() => {
        navigate(-1);
      }, 500); // Adjust the delay as needed
    } catch (error) {
      console.error('Login failed:', error);
      setProgress(0);
      showErrorToast('Invalid email or password');
    }
  }

  return (
    <div>
       <Toaster />
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <form onSubmit={submitHandler}>
        <div className=' flex flex-col gap-5'>
          <label>
            <p className=' font-poppins text-xl'>
              Email Address<sup>*</sup>
            </p>
            <input
              required
              type="email"
              value={userData.email}
              onChange={changeHandler}
              placeholder="Enter email id"
              name="email"
              className='border border-light-bg-color w-60 pl-2 py-3 rounded-2xl text-xl'
            />
          </label>
          <label>
            <p className=' font-poppins text-xl'>
              Password<sup>*</sup>
            </p>
            <div className='relative'>
              <input
                required
                type={showPassword ? ("text") : ("password")}
                value={userData.password}
                onChange={changeHandler}
                placeholder="Enter Password"
                name="password"
                className='border border-light-bg-color w-60 pl-2 py-3 rounded-2xl text-xl'
              />
              <span className='absolute bottom-5 text-2xl ml-5' onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)}
              </span>
            </div>
            <Link to="/forgotPassword">
              <p className=' text-secondary-dark-color font-poppins ml-[10rem] mt-2 text-xl'>
                Forgot Password
              </p>
            </Link>
          </label>
          <button className=' mt-10 rounded-2xl text-whitecolor bg-secondary-dark-color hover:bg-primarycolor transition-all transition-500ms font-poppins text-xl px-7 py-3 w-full '>
            Log In
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm