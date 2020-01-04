import React from "react";
import "./Button.css";

const Button = props => {
  return (
    <div className="button-container">
      <button onClick={props.restartButton}>Restart</button>
    </div>
  );
};

export default Button;
