import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const { isLoading, isError, message, user } = useSelector(
    (state) => state.auth
  );

  const isAdmin = user?.email === "admin@gmail.com" && user?.name === "Admin";

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (isError && message) {
      toast.error(message);
    }
  }, [user, isError, message]);

  if (isLoading) {
    return <h1 className="text-center text-secondary mt-5">Loading..</h1>;
  }

  return (
    <div className="container p-5 ">
      <div className="card border-0 p-5 rounded-0 my-2">
        <h3 className="text-center mb-3">
          Welcome{" "}
          <strong className="text-capitalize text-warning">
            {" "}
            {user?.name}
          </strong>{" "}
          To Ticket Ease
        </h3>
        {isAdmin ? (
          <Link
            to={"/user/admin/all-tickets"}
            className="rounded-0 btn btn-outline-dark w-100 my-2"
          >
            Views All Tickets
          </Link>
        ) : (
          <>
            <Link
              to={"/user/create"}
              className="rounded-0 btn btn-outline-dark w-100 my-2"
            >
              Raise Ticket
            </Link>
            <Link
              to={"/user/tickets"}
              className="rounded-0 btn btn-outline-dark w-100 my-2"
            >
              Views Tickets
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
