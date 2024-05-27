import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTicket } from "../features/ticket/ticketSlice";
import BackButton from "../components/BackButton";

const SingleTicket = () => {
  const { ticket } = useSelector((state) => state.ticket);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTicket(id));
  }, []);

  console.log(ticket);
  return (
    <div className="container p-5 ">
      <BackButton url={"/"} />
      <div className="card p-3 rounded-0 shadow">
        <p className="text-secondary">Ticket Id : {id}</p>
        <h3>Product Name : {ticket.product}</h3>
        <h5 className="text-secondary">Product Issue : {ticket.description}</h5>
        <p className="text-secondary">
          Ticket Date : {new Date(ticket.createdAt).toDateString("en-IN")}
        </p>
        <p className="text-secondary">
          Ticket Status :
          <span className="badge mx-1 p-2 text-bg-success rounded-0">
            {ticket.status}
          </span>
        </p>
        <h4>Notes : </h4>
        <ul className="list-group my-2">
          <li className="list-group-item rounded-0">
            Please Resolve the Issue ASAP
          </li>
        </ul>
        <button className="btn btn-info btn-sm rounded-0">Add Note</button>
      </div>

      <button className="btn btn-danger w-100 my-4 rounded-0">
        Close Ticket
      </button>
    </div>
  );
};

export default SingleTicket;
