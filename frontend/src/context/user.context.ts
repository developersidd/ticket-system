import { createContext } from "react";
import { UserAction } from "../actions/user.acton";

export interface IUser {
  username: string;
  email: string;
  role: string;
  token: string;
  id: number;
  avatar_url: string;
  avatart_public_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserContext {
  state: IUser | null;
  dispatch: React.Dispatch<UserAction>;
}

// Context and Provider
const UserContext = createContext<IUserContext | null>(null);

export default UserContext;
