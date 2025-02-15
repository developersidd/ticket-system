import {
  ChartPie,
  LogOut,
  PlusCircle,
  SquareUserRound,
  Ticket,
  Users,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiClient } from "../../api";
import { IUserContext } from "../../context/user.context";
import useUserContext from "../../hooks/useUserContext";

const Sidebar = () => {
  const { state } = useUserContext() as IUserContext;
  const { username, email, role, avatar_url, id } = state || {};
  const isAdmin = role === "ADMIN";
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/logout");
      navigate("/login");
      localStorage.removeItem("loggedIn");
    } catch (err: any) {
      toast.error("Failed to sign out");
    }
  };
  return (
    <aside
      id="logo-sidebar"
      className=" fixed bottom-0-0 left-0 z-40 w-64 h-[calc(100vh-80px)] transition-transform -translate-x-full bg-white border-r-2 border-gray-200 sm:translate-x-0  "
      aria-label="Sidebar"
    >
      <div className="pt-10 h-full px-3 pb-4 overflow-y-auto bg-white ">
        {/*  User Details */}
        <div className="flex items-center gap-3 justify-center mb-6 sha">
          <div>
            <img
              src={avatar_url}
              alt="logo"
              className="size-[65px] mx-auto rounded-full"
            />
          </div>
          <div className="">
            <h1 className="text-lg leading-5  font-bold">{username}</h1>
            <p className="text-sm text-gray-500 mb-2">{email}</p>
          </div>
        </div>
        <ul className="pt-3 space-y-3 font-medium">
          <li>
            <NavLink
              to="/"
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
              to={`/profile/${id}`}
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
              to={"/tickets/add"}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-teal-500 font-bold text-white" : ""
                } flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-teal-500`
              }
              end
            >
              <PlusCircle />
              <span className="flex-1 ms-3 whitespace-nowrap">Add Ticket</span>
            </NavLink>
          </li>
          {isAdmin && (
            <>
              <li>
                <NavLink
                  to={"/admin/tickets"}
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
                  to="/admin/users"
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
              to={"/tickets"}
              className={({ isActive }) =>
                `${
                  isActive ? "bg-teal-500 font-bold text-white" : ""
                } flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-teal-500`
              }
              end
            >
              <Ticket />
              <span className="flex-1 ms-3 whitespace-nowrap">My Tickets</span>
            </NavLink>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="cursor-pointer flex w-full items-center p-2 text-gray-900 hover:text-white rounded-lg hover:bg-teal-500"
            >
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
