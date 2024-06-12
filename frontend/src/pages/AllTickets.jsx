import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTickets } from "../features/ticket/ticketSlice";
import BackButton from "../components/BackButton";
import TicketRow from "../components/TicketRow";
import { toast } from "react-toastify";

const AllTickets = () => {
  const { tickets, isLoading, isError, message } = useSelector(
    (state) => state.ticket
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTickets());

    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  if (isLoading) {
    return (
      <div>
        <h1 className="text-center text-secondary mt-5">Loading...</h1>
      </div>
    );
  }
  console.log(tickets);
  return (
    <div className="container py-5">
      <BackButton url={"/"} />

      {tickets.length === 0 ? (
        <div>
          <h1 className="text-center text-secondary mt-5">
            No Ticket Found!!!
          </h1>
        </div>
      ) : (
        <>
          <div className=" rounded-0 p-5">
            <h3 className="text-center">All Tickets</h3>

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
                {tickets.map((ticket, index) => (
                  <TicketRow key={ticket._id} ticket={ticket} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AllTickets;
