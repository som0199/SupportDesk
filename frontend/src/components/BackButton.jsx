import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({ url }) => {
  return (
    <Link to={url}>
      <button className="btn btn-outline-dark  my-2">Back</button>
    </Link>
  );
};

export default BackButton;
