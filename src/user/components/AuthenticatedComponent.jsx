// AuthenticatedComponent.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthenticatedComponent = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
      // Check if the user is authenticated
      if (!jwt) {
        // If not authenticated, redirect to the signup page
        navigate("/signup");
      }
    }, [jwt, navigate]);

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default AuthenticatedComponent;