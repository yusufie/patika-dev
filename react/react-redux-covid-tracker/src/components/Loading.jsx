import React from "react";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
