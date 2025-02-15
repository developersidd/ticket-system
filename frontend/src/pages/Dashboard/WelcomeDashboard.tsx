import { CircleEllipsis, MailOpen, MonitorX, Tickets } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiClient } from "../../api";

const dashboardItems = [
  { title: "Total Tickets", Icon: Tickets, bgColor: "bg-orange-100" },
  { title: "Open Tickets", Icon: MailOpen, bgColor: "bg-yellow-100" },
  {
    title: "In Progress Tickets",
    Icon: CircleEllipsis,
    bgColor: "bg-blue-100",
  },
  { title: "Closed Tickets", Icon: MonitorX, bgColor: "bg-green-100" },
];

type Report = {
  tickets: {
    _count: number;
    status: string;
  }[];
  totalTickets: number;
} | null;

const WelcomeDashboard = () => {
  const [report, setReport] = useState<Report>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const { data } = await apiClient.get("/users/report");
        setReport(data?.data);
        console.log("data:", data);
      } catch (e: any) {
        toast.error("There was an error occurred!");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <section className="w-full">
      <div className="w-full flex flex-wrap gap-8 items-center">
        {dashboardItems?.map(({ Icon, title, bgColor }, ind) => {
          const count =
            ind === 0 ? report?.totalTickets : report?.tickets[ind - 1]?._count;
          return (
            <article
              className={`${bgColor} min-w-[300px] p-4 rounded-xl shadow space-y-3`}
              key={title}
            >
              {<Icon className="size-10" />}
              <h1 className="ml-1 font-bold text-2xl text-gray-800">{count}</h1>
              <h4 className="text-lg text-gray-600 font-semibold"> {title}</h4>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default WelcomeDashboard;
