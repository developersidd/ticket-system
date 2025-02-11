import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-full flex items-center justify-center flex-col">
      <p>The page you want to go is currently unavailable! 🤕 </p>
      <button className="mt-6 px-12 py-2.5 border-2 border-orange-500">
        <NavLink to="/login">Login </NavLink>
      </button>
    </div>
  );
};

export default NotFoundPage;
