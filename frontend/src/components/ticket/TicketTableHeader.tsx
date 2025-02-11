import { useState } from "react";
import { Link } from "react-router-dom";
const filters = ["all", "open", "in_progress", "resolved"];

const TicketTableHeader = () => {
  const [filterBy, setFilterBy] = useState(status || "all");

  return (
    <div className="sm:flex items-center justify-between mb-6">
      <div className=" flex items-center gap-10">
        {filters.map((item) => (
          <Link
            onClick={() => setFilterBy(item)}
            to={`/dashboard/tickets?status=${encodeURI(item)}`}
            key={item}
            className="cursor-pointer rounded-full focus:outline-none"
          >
            <div
              className={`py-2 px-8 ${
                item === filterBy ? "bg-teal-100 font-bold" : "font-semibold"
              } text-teal-700 rounded-full uppercase `}
            >
              <p> {item.split("_").join(" ")} </p>
            </div>
          </Link>
        ))}
      </div>
      <Link
        to={"/dashboard/tickets/add"}
        className="mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-teal-700 hover:bg-teal-600 focus:outline-none rounded"
      >
        <p className="text-sm font-medium leading-none text-white">Add Task</p>
      </Link>
    </div>
  );
};

export default TicketTableHeader;
