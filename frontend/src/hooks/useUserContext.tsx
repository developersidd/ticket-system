import { useContext } from "react";
import UserContext from "../context/user.context";

const useUserContext = () => {
  const userContext = useContext(UserContext);
  return userContext;
};

export default useUserContext;
