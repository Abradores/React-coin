import React from "react";
import { Link } from "react-router-dom";
import "../common/notfound.css";

const notfound = () => {
  return (
    <div className="NotFound">
      <h1 className="NotFound-title"> Page Not Found</h1>
      <Link to="" className="NotFound-link">
        {" "}
        Go to HomePage
      </Link>
    </div>
  );
};

export default notfound;
