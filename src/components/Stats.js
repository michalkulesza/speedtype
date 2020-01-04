import React, { useState, useEffect } from "react";
import "./Stats.css";

const Stats = props => {
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    if (props.time > 0 && props.averageWordLength > 0) {
      setWpm(Math.round((props.score / props.averageWordLength / props.time) * 60));
    } else {
      setWpm(0);
    }
  }, [props.time, props.averageWordLength, props.score]);

  return (
    <div className="stats-container">
      <div className="stats stats-wpm">{wpm} WPM</div>
      <div className="stats stats-time">{props.time}s</div>
    </div>
  );
};

export default Stats;
