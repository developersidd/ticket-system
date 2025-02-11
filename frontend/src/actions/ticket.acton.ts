import { ITicket } from "../context/ticket.context";

const TICKET_CREATED = "TICKET_CREATED";
const TICKET_UPDATED = "TICKET_UPDATED";
const TICKET_DELETED = "TICKET_DELETED";
const TICKET_FETCHED = "TICKET_FETCHED";

export type TicketAction =
  | {
      type: typeof TICKET_CREATED;
      payload: ITicket;
    }
  | {
      type: typeof TICKET_FETCHED;
      payload: ITicket[];
    }
  | {
      type: typeof TICKET_UPDATED;
      payload: ITicket;
    }
  | {
      type: typeof TICKET_DELETED;
      payload: number;
    };

export { TICKET_CREATED, TICKET_DELETED, TICKET_FETCHED, TICKET_UPDATED };
