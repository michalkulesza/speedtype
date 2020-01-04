import React, { useEffect } from "react";
import "./Preview.css";

const Preview = props => {
  const text = props.text.split("");

  useEffect(() => {
    document.querySelector("#input").addEventListener("paste", e => {
      e.preventDefault();
      return false;
    });
  });

  return (
    <div className="preview-container">
      {text.map((letter, i) => {
        let color;
        if (i < props.input.length) {
          if (props.input[i] === letter) {
            color = "#66bb6a";
          } else {
            color = "#ec407a";
          }
        }
        return (
          <span key={i} style={{ backgroundColor: color }}>
            {letter}
          </span>
        );
      })}
    </div>
  );
};

export default Preview;
