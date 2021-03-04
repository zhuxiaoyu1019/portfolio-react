import React from "react";
import Typography from "@material-ui/core/Typography";
import "./Title.scss";

export default function Title({ title }) {
  return (
    <div>
      <Typography gutterBottom className="title">
        {title}
      </Typography>
    </div>
  );
}
