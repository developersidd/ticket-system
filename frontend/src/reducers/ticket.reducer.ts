import {
  TICKET_CREATED,
  TICKET_DELETED,
  TICKET_FETCHED,
  TICKET_UPDATED,
  TicketAction,
} from "../actions/ticket.acton";
import { ITicket } from "../context/ticket.context";

type InitialState = {
  tickets: ITicket[];
  ticketToUpdate: number | null;
};

const initialState: InitialState = {
  tickets: [],
  ticketToUpdate: null,
};

const ticketReducer = (state = initialState, action: TicketAction) => {
  switch (action.type) {
    case TICKET_CREATED:
      return {
        ...state,
        tickets: [...state.tickets, action.payload],
      };
    case TICKET_UPDATED:
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket.id === action.payload.id ? action.payload : ticket
        ),
      };
    case TICKET_DELETED:
      return {
        ...state,
        tickets: state.tickets.filter((ticket) => ticket.id !== action.payload),
      };
    case TICKET_FETCHED:
      return {
        ...state,
        tickets: action.payload,
      };

    default:
      return state;
  }
};

export { initialState, ticketReducer };
