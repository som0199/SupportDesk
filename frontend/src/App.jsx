import React from "react";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./pages/PrivateRoute";
import CreateTicket from "./pages/CreateTicket";
import AllTickets from "./pages/AllTickets";
import SingleTicket from "./pages/SingleTicket";
import AdminAllTickets from "./pages/AdminAllTickets";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<PrivateRoute />}>
          <Route path="create" element={<CreateTicket />} />
          <Route path="tickets" element={<AllTickets />} />
          <Route path="ticket/:id" element={<SingleTicket />} />
          <Route path="admin/all-tickets" element={<AdminAllTickets />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
