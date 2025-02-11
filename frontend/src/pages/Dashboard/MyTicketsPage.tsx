import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiClient } from "../../api";
import TicketTable from "../../components/ticket/TicketTable";
import TicketTableHeader from "../../components/ticket/TicketTableHeader";
import { ITicket } from "../../context/ticket.context";

const MyTickets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "all";

  // get user tickets
  useEffect(() => {
    const fetchTickets = async () => {
      setIsLoading(true);
      try {
        const { data } = await apiClient.get(`/tickets?status=${status}`);
        setTickets(data?.data);
        console.log("data:", data);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, [status]);

  // decide what to render
  let content;
  if (isLoading) {
    content = <p className="text-2xl text-center py-10">Loading...</p>;
  } else if (error) {
    content = <p>{error}</p>;
  } else if (tickets.length === 0) {
    content = <p className="text-2xl text-center py-10">No tickets found</p>;
  } else {
    content = <TicketTable tickets={tickets} />;
  }
  return (
    <section>
      <TicketTableHeader />
      {content}
    </section>
  );
};

export default MyTickets;
