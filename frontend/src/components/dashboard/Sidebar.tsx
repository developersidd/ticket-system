import { ChartPie, LogOut, PlusCircle, SquareUserRound, Ticket, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import { IUserContext } from "../../context/user.context";
import useUserContext from "../../hooks/useUserContext";

const Sidebar = () => {
  const { state } = useUserContext() as IUserContext;
  const isAdmin = state?.role === "ADMIN";
  return (
    <aside
      id="logo-sidebar"
      className=" fixed bottom-0-0 left-0 z-40 w-64 h-[calc(100vh-80px)] pt-10 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0  "
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white ">
        <ul className="space-y-3 font-medium">
          <li>
            <NavLink
              to="/dashboard/"
              className={({ isActive }) =>
                `${
                  isActive ? "bg-teal-500 font-bold text-white" : ""
                } flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-teal-500`
              }
              end
            >
              <ChartPie />
              <span className="ms-3">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/profile"}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-teal-500 font-bold text-white" : ""
                } flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-teal-500`
              }
            >
              <SquareUserRound />
              <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/tickets/add"}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-teal-500 font-bold text-white" : ""
                } flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-teal-500`
              }
            >
              <PlusCircle />
              <span className="flex-1 ms-3 whitespace-nowrap">Add Ticket</span>
            </NavLink>
          </li>
          {isAdmin && (
            <>
              <li>
                <NavLink
                  to={"/dashboard/admin/tickets"}
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-teal-500 font-bold text-white" : ""
                    } flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-teal-500`
                  }
                >
                  <Ticket />
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Manage Tickets
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/admin/users"
                  className={({ isActive }) =>
                    `${
                      isActive ? "bg-teal-500 font-bold text-white" : ""
                    } flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-teal-500`
                  }
                >
                  <Users />
                  <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                </NavLink>
              </li>
            </>
          )}

          <li>
            <NavLink
              to={"/dashboard/tickets"}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-teal-500 font-bold text-white" : ""
                } flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-teal-500`
              }
            >
              <Ticket />
              <span className="flex-1 ms-3 whitespace-nowrap">My Tickets</span>
            </NavLink>
          </li>

          <li>
            <button className="cursor-pointer flex w-full items-center p-2 text-gray-900 hover:text-white rounded-lg hover:bg-teal-500">
              <LogOut />
              <span className="ms-3 whitespace-nowrap">Sign Out</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
