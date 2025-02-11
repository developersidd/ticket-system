import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { SET_USER } from "../actions/user.acton";
import { apiClient } from "../api";
import { IUser, IUserContext } from "../context/user.context";
import useUserContext from "../hooks/useUserContext";

const UserMiddleware = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const { dispatch } = useUserContext() as IUserContext;
  const [user, setUser] = React.useState<IUser | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get("/users/me");
        console.log("response:", response);
        const user = response.data?.data;
        setUser(user);
        dispatch({ type: SET_USER, payload: user });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [dispatch]);
  const location = useLocation();
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-6xl text-orange-500"> ...Loading </h1>
      </div>
    );
  }

  return user?.email ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default UserMiddleware;
