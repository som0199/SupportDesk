import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const { isLoading, isError, message, user } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
    if (user) {
      navigate("/");
    }
  }, [user, isError, message]);

  if (isLoading) {
    return <h1 className="text-center text-secondary mt-5">Loading..</h1>;
  }

  return (
    <div className="container p-5">
      <div className="card p-3 rounded-0">
        <h3 className="text-center">Login Here</h3>

        <form className="my-2" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            className="form-control my-2 rounded-0"
            required
            onChange={handleChange}
            value={email}
            name="email"
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="form-control my-2 rounded-0"
            required
            onChange={handleChange}
            value={password}
            name="password"
          />
          <button type="submit" className="btn btn-success rounded-0 w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
