import { Link } from "react-router-dom";
import { IUserContext } from "../../context/user.context";
import useUserContext from "../../hooks/useUserContext";

const Navbar = () => {
  const { state } = useUserContext() as IUserContext;
  const { username, avartarUrl } = state || {};
  return (
    <nav className="flex items-center w-full h-[80px] bg-white border-b border-gray-200">
      <div className="w-full px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <Link to="/dashboard/" className="flex ms-2 md:me-24">
              <img
                src="/assets/images/logo.png"
                className="size-17 "
                alt="Ab's ticket system"
              />
              <span className="ms-4 self-center text-xl font-semibold text-teal-500 sm:text-2xl whitespace-nowrap ">
                AB Ticket
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div>
                <Link to="/dashboard/profile">
                  <img
                    className="size-10 rounded-full"
                    src={avartarUrl}
                    alt={username}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
