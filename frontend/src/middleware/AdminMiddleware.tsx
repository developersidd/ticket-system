import { Navigate, Outlet } from "react-router-dom";
import { IUserContext } from "../context/user.context";
import useUserContext from "../hooks/useUserContext";

const AdminMiddleware = () => {
  const { state } = useUserContext() as IUserContext;

  return state?.email && state.role === "ADMIN" ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard/" />
  );
};

export default AdminMiddleware;
