import { createContext } from "react";
import { UserAction } from "../actions/user.acton";

export interface IUser {
  username: string;
  email: string;
  password: string;
  role: string;
  token: string;
  id: number;
}

// Context and Provider
const UserContext = createContext<{
  state: IUser | null;
  dispatch: React.Dispatch<UserAction>;
} | null>(null);

export default UserContext;
