import React from 'react'


import Template from '../components/Form/Template'

const LoginPage = ({setIsLoggedIn}) => {
  const loginImg = "https://res.cloudinary.com/dkhsnhjrh/image/upload/v1728727073/94d5b85f-ef32-4b00-89ab-d15140bc47b6_u5tqeb.jpg"
  return (
    <Template
      title="Welcome Back to "
      desc1="Resin Gift Store"
      desc2=""
      image={loginImg}
      formtype="login"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default LoginPage