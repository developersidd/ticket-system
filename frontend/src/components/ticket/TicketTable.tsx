import { ITicket } from "../../context/ticket.context";
import TicketTableRow from "./TicketTableRow";

const TicketTable = ({ tickets }: { tickets: ITicket[] }) => {
  return (
    <div className="shadow-md py-6 rounded-md">
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="border-y border-gray-300 p-4 ">
              <p className="antialiased  text-[15px]  flex items-center justify-between gap-2 font-medium leading-none opacity-70">
                Owner{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  />
                </svg>
              </p>
            </th>
            <th className="border-y border-gray-300 p-4 ">
              <p className="antialiased  text-[15px]  flex items-center justify-between gap-2 font-medium leading-none opacity-70">
                Title
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  />
                </svg>
              </p>
            </th>
            <th className="border-y border-gray-300 p-4 ">
              <p className="antialiased  text-[15px]  flex items-center justify-between gap-2 font-medium leading-none opacity-70">
                Admin Response
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  />
                </svg>
              </p>
            </th>
            <th className="border-y border-gray-300 p-4 ">
              <p className="antialiased  text-[15px]  flex items-center justify-between gap-2 font-medium leading-none opacity-70">
                Status{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  />
                </svg>
              </p>
            </th>
            <th className="border-y border-gray-300 p-4 ">
              <p className="antialiased  text-[15px]  flex items-center justify-between gap-2 font-medium leading-none opacity-70">
                Created At
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  />
                </svg>
              </p>
            </th>
            <th className="border-y border-gray-300 p-4 ">
              <p className="antialiased  text-[15px]  flex items-center justify-between gap-2 font-medium leading-none opacity-70">
                Actions
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            // map through tickets
            tickets.map((ticket) => (
              <TicketTableRow key={ticket.id} ticket={ticket} />
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
