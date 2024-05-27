import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsersTickets } from "../features/ticket/ticketSlice";
import { toast } from "react-toastify";
import TicketRow from "../components/TicketRow";
import BackButton from "../components/BackButton";

const AdminAllTickets = () => {
  const { tickets, isError, message } = useSelector((state) => state.ticket);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsersTickets());

    if (isError && message) {
      toast.error(message);
    }
  }, []);

  return (
    <div className="container p-5">
      <BackButton url={"/"} />
      <div className="card rounded-0 p-3">
        <h3 className="text-center">All User Tickets</h3>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {tickets?.map((ticket, index) => (
              <TicketRow key={ticket._id} ticket={ticket} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllTickets;
