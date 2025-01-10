import React from "react";
import "../../styles/error.css";

const Error = (props) => {
  return (
    <div id="notfound">
      <div className="notfound-bg">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="notfound">
        <div className="notfound-code">
          <h1>{props.code}</h1>
        </div>
        <h2>{props.title}</h2>
        <p>{props.message}</p>
      </div>
    </div>
  );
};

export default Error;