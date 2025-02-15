import { Navigate, Outlet } from "react-router-dom";
import { IUserContext } from "../context/user.context";
import useUserContext from "../hooks/useUserContext";

const AdminExecutiveMiddleware = () => {
  const { state } = useUserContext() as IUserContext;

  return state?.email && ["ADMIN", "EXECUTIVE"].includes(state.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default AdminExecutiveMiddleware;
