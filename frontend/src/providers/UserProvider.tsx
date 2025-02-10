import { useReducer } from "react";
import UserContext from "../context/user.context";
import userReducer, { initialState } from "../reducers/user.reducer";

const UserProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
