import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { raiseTicket } from "../features/ticket/ticketSlice";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";

const CreateTicket = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, ticket, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product: "",
    description: "",
  });

  const { product, description } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(raiseTicket(formData));
    if (ticket && isSuccess) {
      navigate("/user/tickets");
    }
  };

  useEffect(() => {
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

  return (
    <div className="container p-5">
      <BackButton url={"/"} />
      <div className="card p-3 rounded-0">
        <h3 className="text-center">Raise Ticket</h3>

        <form className="my-2" onSubmit={handleSubmit}>
          <input
            type="text"
            value={user?.name}
            className="my-2 form-control rounded-0"
            disabled
          />
          <input
            type="email"
            value={user?.email}
            className="my-2 form-control rounded-0"
            disabled
          />
          <select
            value={product}
            name="product"
            onChange={handleChange}
            className="my-2 form-select rounded-0"
            required
          >
            <option selected>Select Product</option>
            <option value="iPhone">iMac</option>
            <option value="iPad">iPad</option>
            <option value="iMac">iPhone</option>
            <option value="iWatch">iWatch</option>
            <option value="Macbook">Macbook</option>
          </select>
          <textarea
            value={description}
            name="description"
            onChange={handleChange}
            required
            className="form-control rounded-0 my-2"
            placeholder="Describe Your Issue Here"
          ></textarea>
          <button type="submit" className="btn btn-dark w-100 rounded-0 my-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
