import React from 'react'
import Template from '../components/Form/Template'

const SignUpPage = ({setIsLoggedIn}) => {
  const loginImg = "https://res.cloudinary.com/dkhsnhjrh/image/upload/v1728727010/Book_a_Resin_Art_Workshop_f7bsei.jpg"
  return (
    <Template
      title="Start Now!!"
      desc1="Create Your Account and explore our exclusive products"
      desc2=""
      image={loginImg}
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default SignUpPage