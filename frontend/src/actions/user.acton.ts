import { IUser } from "../context/user.context";

const SET_USER = "SET_USER";
const LOGGED_OUT = "LOGGED_OUT";

// Define a union type for all possible actions
export type UserAction =
  | {
      type: typeof SET_USER;
      payload: IUser;
    }
  | { type: typeof LOGGED_OUT };

export { LOGGED_OUT, SET_USER };
