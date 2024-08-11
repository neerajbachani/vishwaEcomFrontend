import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../user/redux/Auth/Action';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt]);

  return auth.user?.role === 'admin' ? (
    <Component {...rest} />
  ) : (
    <p>You are not an admin</p>
  );
};

export default PrivateRoute;