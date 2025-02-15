import { IUser } from "../context/user.context";

const SET_USER = "SET_USER";
const LOGGED_OUT = "LOGGED_OUT";
const UPDATE_USER = "UPDATE_USER";
// Define a union type for all possible actions
export type UserAction =
  | {
      type: typeof SET_USER;
      payload: IUser;
    }
  | { type: typeof LOGGED_OUT }
  | { type: typeof UPDATE_USER; payload: IUser };

export { LOGGED_OUT, SET_USER, UPDATE_USER };
