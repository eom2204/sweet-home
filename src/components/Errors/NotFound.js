import React from "react";
import { Link } from "react-router-dom";
import "./errors.scss";

const ErrorPage = () => {
  return (
    <div className="notFoundContainer">
      <div className="image">
        <img src="Group50.png" alt="" width={570} height={550} />
      </div>
      <div className="dots3">
        <img src="/Group.png" width={300} height={300} alt="" />
      </div>
      <div className="notFoundTextSection">
        <h1 className="notFoundHeader">
          <span>4</span>
          <span className="zero">0</span>
          <span>4</span>
        </h1>
        <p className="oops">Oops</p>
        <p className="text404">
          Something went wrong. Looks like this page doesn't exist anymore
        </p>
        <Link to="/" className="goHomeLink">
          GO BACK
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
