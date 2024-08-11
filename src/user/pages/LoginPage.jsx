import React from 'react'


import Template from '../components/Form/Template'

const LoginPage = ({setIsLoggedIn}) => {
  const loginImg = "https://res.cloudinary.com/dkhsnhjrh/image/upload/v1710614905/EP-GC-RESINART_p_-Emily-McSevich_1_w7mbtq.jpg"
  return (
    <Template
      title="Welcome Back to "
      desc1="Where your resin art journey continues"
      desc2="log in now to explore exclusive products and connect with a vibrant community of fellow artists."
      image={loginImg}
      formtype="login"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default LoginPage