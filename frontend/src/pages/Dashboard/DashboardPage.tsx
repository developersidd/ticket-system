import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
import { IUserContext } from "../../context/user.context";
import useUserContext from "../../hooks/useUserContext";
import AdminExecutiveMiddleware from "../../middleware/AdminExecutiveMiddleware";
import NotFoundPage from "../NotFoundPage";
import AddTicketPage from "./AddTicketPage";
import AdminTicketsPage from "./admin/AdminTicketsPage";
import AdminUsersPage from "./admin/AdminUsersPage";
import EditTicketPage from "./EditTicketPage";
import MyTickets from "./MyTicketsPage";
import Profile from "./ProfilePage";
import WelcomeDashboard from "./WelcomeDashboard";

const Dashboard = () => {
  const { state } = useUserContext() as IUserContext;
  return (
    <>
      <Navbar />
      <div className="flex justify-between">
        <Sidebar />
        <div className="w-[calc(100vw-256px)] translate-x-[256px] p-3 md:p-6 lg:p-10 overflow-y-auto h-[calc(100vh-80px)]">
          <Routes>
            <Route path="/" element={<WelcomeDashboard />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="tickets" element={<MyTickets />} />
            <Route path="tickets/add" element={<AddTicketPage />} />
            <Route path="tickets/edit/:id" element={<EditTicketPage />} />
            {/* Admin Routes */}
            {state?.role === "ADMIN" && (
              <Route path="/*" element={<AdminExecutiveMiddleware />}>
                <Route path={`admin/users`} element={<AdminUsersPage />} />
                <Route path={`admin/tickets`} element={<AdminTicketsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            )}

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
