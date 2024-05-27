import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOutUser } from "../features/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutUser());
  };

  return (
    <nav className="navbar  bg-body-tertiary shadow-lg px-2">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand mb-0 h1">
          Support Desk 1.0
        </Link>
        <span>
          {!user ? (
            <>
              <Link to={"/register"} className="btn btn-primary mx-1 rounded-0">
                Register
              </Link>
              <Link
                to={"/login"}
                className="btn  btn-outline-primary border-0 mx-2 rounded-0"
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="btn  btn-danger mx-1 rounded-0"
            >
              LogOut
            </button>
          )}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
