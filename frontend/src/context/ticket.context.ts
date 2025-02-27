import { createContext } from "react";
import { TicketAction } from "../actions/ticket.acton";
import { IUser } from "./user.context";

export interface ITicket {
  title: string;
  description: string;
  status: string;
  createdAt: string;
  createdBy: IUser;
  adminResponse: string;
  id: number;
}

export interface ITicketContext {
  state: ITicket | null;
  dispatch: React.Dispatch<TicketAction>;
}

// Context and Provider
const TicketContext = createContext<ITicketContext | null>(null);

export default TicketContext;
