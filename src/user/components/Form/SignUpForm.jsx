import React, { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getUser, register } from '../../redux/Auth/Action';
import LoadingBar from 'react-top-loading-bar';
import { Toaster, toast } from 'react-hot-toast'; // Import from react-hot-toast

const SignUpForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
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
        toast.error('Passwords do not match'); // Display error toast
        return;
      }

      // Show loading bar
      setProgress(100);
      dispatch(
        register(userData, () => {
          setProgress(0); // Reset progress after register action is completed
          setIsLoggedIn(true);
          const accountData = { ...userData };
          console.log("printing account data ");
          console.log(accountData);

          toast.success('Account created successfully'); // Display success toast

          // Navigate to the previous page (-1)
          navigate(-1, { replace: true });

          // Reload the website
          window.location.reload();
        })
      );
    } catch (error) {
      console.error('Submit handler error:', error);
      toast.error('An error occurred. Please try again.'); // Display error toast
      setProgress(0); // Reset progress if an error occurs
    }
  }

  return (
    <div>
      <Toaster /> {/* Render the Toaster component */}
      <LoadingBar color="#f11946" progress={progress} />
      <form onSubmit={submitHandler}>
        {/* first name and lastName */}
        <div className=' my-3 flex flex-col gap-5'>
          <label>
            <p className=' font-poppins text-xl'>First Name<sup>*</sup></p>
            <input
              required
              type="text"
              name="firstName"
              onChange={changeHandler}
              placeholder="Enter First Name"
              value={userData.firstName}
              className='border border-light-bg-color w-60 pl-2 py-3 rounded-2xl text-xl'
            />
          </label>

          <label>
            <p className=' font-poppins text-xl'>Last Name<sup>*</sup></p>
            <input
              required
              type="text"
              name="lastName"
              onChange={changeHandler}
              placeholder="Enter Last Name"
              value={userData.lastName}
              className='border border-light-bg-color w-60 pl-2 py-3 rounded-2xl text-xl'
            />
          </label>
        </div>
        {/* email Add */}
        <label>
          <p className=' font-poppins text-xl '>Email Address<sup>*</sup></p>
          <input
            required
            type="email"
            name="email"
            onChange={changeHandler}
            placeholder="Enter Email Address "
            value={userData.email}
            className='border border-light-bg-color w-60 pl-2 py-3 rounded-2xl text-xl'
          />
        </label>

        {/* createPassword and Confirm Password */}
        <div className='flex flex-col gap-5 mt-5'>
          <div className='relative'>
            <label>
              <p className='font-poppins text-xl'>Create Password<sup>*</sup></p>
              <input
                required
                type={showPassword1 ? ('text') : ('password')}
                name='password'
                onChange={changeHandler}
                placeholder='Enter Password'
                value={userData.password}
                className='border border-light-bg-color w-60 pl-2 py-3 rounded-2xl text-xl'
              />
              <span className='eye-icon absolute bottom-5 text-2xl ml-5 ' onClick={() => setShowPassword1((prev) => !prev)}>
                {showPassword1 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </span>
            </label>
          </div>

          <div className='relative'>
            <label>
              <p className='font-poppins text-xl'>Confirm Password<sup>*</sup></p>
              <input
                required
                type={showPassword2 ? ('text') : ('password')}
                name='confirmPassword'
                onChange={changeHandler}
                placeholder='Confirm Password'
                value={userData.confirmPassword}
                className='border border-light-bg-color w-60 pl-2 py-3 rounded-2xl text-xl'
              />
              <span className='eye-icon absolute bottom-5 text-2xl ml-5' onClick={() => setShowPassword2((prev) => !prev)}>
                {showPassword2 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </span>
            </label>
          </div>
        </div>
        <button className=' mt-10 rounded-2xl text-whitecolor bg-secondary-dark-color hover:bg-primarycolor transition-all transition-500ms font-poppins text-xl px-7 py-3 w-full '>
          Create Account
        </button>
      </form>
      <Link className='  text-xl text-[#BDE0FE]' to='/signin'>Already have and Account? <span>Login</span></Link>
    </div>
  );
};

export default SignUpForm;
