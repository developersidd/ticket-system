import {
  LOGGED_OUT,
  SET_USER,
  UPDATE_USER,
  UserAction,
} from "../actions/user.acton";
import { IUser } from "../context/user.context";

export const initialState = null;

const userReducer = (state: IUser | null, action: UserAction): IUser | null => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case LOGGED_OUT:
      return null;
    case UPDATE_USER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      throw new Error(`Unhandled action type`);
  }
};

export default userReducer;
