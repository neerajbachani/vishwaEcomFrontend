import React from 'react'
import Template from '../components/Form/Template'

const SignUpPage = ({setIsLoggedIn}) => {
  const loginImg = "https://res.cloudinary.com/dkhsnhjrh/image/upload/v1710614905/EP-GC-RESINART_p_-Emily-McSevich_1_w7mbtq.jpg"
  return (
    <Template
      title="Start Now!!"
      desc1="Create Your Resin Art Account"
      desc2="Unlock a World of Possibilities by Joining Our Resin Community"
      image={loginImg}
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default SignUpPage