import React from "react";

const Error = ({ message }) => {
  return (
    <div className="alert alert-danger d-flex align-items-center mt-2" role="alert">
      Error: {message}
    </div>
  );
};

export default Error;
