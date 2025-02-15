import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserMiddleware from "./middleware/UserMiddleware";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/*  Private Route Starts */}
        <Route path="/*" element={<UserMiddleware />}>
          <Route path="*" element={<DashboardPage />} />
          {/*<Route path="products_details/:id" element={<ProductDetails />} />*/}
        </Route>
        {/*  Private Route Ends */}

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
