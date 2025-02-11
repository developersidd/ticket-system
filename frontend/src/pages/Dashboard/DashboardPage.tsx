import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
import { IUserContext } from "../../context/user.context";
import useUserContext from "../../hooks/useUserContext";
import AdminMiddleware from "../../middleware/AdminMiddleware";
import NotFoundPage from "../NotFoundPage";
import DashboardUsers from "./admin/AdminDashboardUsers";
import AdminTicketList from "./admin/AdminTicketList";
import WelcomeDashboard from "./WelcomeDashboard";

const Dashboard = () => {
  const { state } = useUserContext() as IUserContext;
  return (
    <>
      <Navbar />
      <div className="flex justify-between">
        <Sidebar />
        <div className="w-[calc(100vw-256px)] translate-x-[256px] p-10 overflow-y-auto h-[calc(100vh-80px)]">
          <Routes>
            <Route path="/" element={<WelcomeDashboard />} />
            <Route path="/*" element={<AdminMiddleware />}>
              <Route path={`admin/users`} element={<DashboardUsers />} />
              <Route path={`admin/tickets`} element={<AdminTicketList />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
