import React from "react";
import { Link } from "react-router-dom";
import "./errors.scss";

const ErrorPage = () => {
  return (
    <div className="errorContainer">
      <div className="dots">
        <img src="/Group.png" width={202} height={198} alt="" />
      </div>
      <div>
        <div className="ellipsOne">
          <img src="/Ellipse1034.png" width={1040} height={198} alt="" />
        </div>
        <h1 className="errorHeader">Error</h1>
        <p className="errorText">Sorry we can't open the page</p>
        <Link to="/" className="goHomeLink">
          GO HOME
        </Link>
      </div>
      <div className="ellipsTwo">
        <img src="/Ellipse1033.png" width={1040} height={198} alt="" />
      </div>
      <div className="dots2">
        <img src="/Group.png" width={202} height={198} alt="" />
      </div>
    </div>
  );
};

export default ErrorPage;
