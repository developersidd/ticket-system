import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
const filters = ["all", "user", "admin"];

const UsersTableHeader = () => {
  const [searchParams] = useSearchParams();
  const [filterBy, setFilterBy] = useState(searchParams.get("status") || "all");
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  return (
    <div className="sm:flex items-center justify-between mb-6">
      <div className=" flex items-center gap-10">
        {filters.map((item) => (
          <Link
            onClick={() => setFilterBy(item)}
            to={`/admin/users?status=${encodeURI(item)}`}
            key={item}
            className="cursor-pointer rounded-full focus:outline-none"
          >
            <div
              className={`py-2 px-8 ${
                item === filterBy ? "bg-teal-100 font-bold" : "font-semibold"
              } text-teal-700 rounded-full uppercase `}
            >
              <p> {item} </p>
            </div>
          </Link>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchParams.set("q", search);
          navigate(`${location.pathname}?${searchParams.toString()}`);
        }}
        className="min-w-md mx-auto"
      >
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            id="default-search"
            value={search}
            className="block w-full px-4 py-3.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-amber-400"
            placeholder="Search Mockups, Logos..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5  bg-amber-400   focus:outline-none  font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>

      <div>
        <Link
          to={"/tickets/add"}
          className="mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-teal-700 hover:bg-teal-600 focus:outline-none rounded"
        >
          <p className="text-sm font-medium leading-none text-white">
            Add Task
          </p>
        </Link>
      </div>
    </div>
  );
};

export default UsersTableHeader;
