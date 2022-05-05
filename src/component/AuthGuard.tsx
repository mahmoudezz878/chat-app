import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import * as api from "../api";
import { setUser, signOut } from "../redux/reducer/app";
import { Navigate } from "react-router";

type AuthGuardType = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: AuthGuardType) => {
  const { token, user } = useSelector((state: RootState) => state.app);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  async function fetchMe() {
    try {
      const data = await api.getUser(token);
      console.log(data);
      //set the user to data received
      dispatch(setUser(data));
    } catch (error) {
      //sign out the user (this signs out the user on reload)
      dispatch(signOut());
    } finally {
      setLoading(false);

    }
  }
  useEffect(() => {
    fetchMe();
  }, [token]);
  if (loading) return <div>loading...</div>;
  if (user) return <>{children}</>;
  else return <Navigate to="/login" replace />;
};

export default AuthGuard;
