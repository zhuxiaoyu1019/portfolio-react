import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "./Footer.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: "rgb(34, 36, 38)",
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <footer>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} className="copyright">
          <p>© 2021 RITA Z</p>
        </Grid>
        <Grid item xs={12} sm={6} className="social-media">
          <a
            href="https://www.linkedin.com/in/rita-zhu-2495b01a1/"
            target="_blank"
          >
            <i className="fab fa-linkedin-in fa-lg"></i>
          </a>
          <a href="https://github.com/zhuxiaoyu1019" target="_blank">
            <i className="fab fa-github fa-lg"></i>
          </a>
          <a href="mailto:xiaoyz28@uw.edu">
            <i className="fas fa-envelope fa-lg"></i>
          </a>
          <a href="tel:+9788090579">
            <i className="fas fa-phone fa-lg"></i>
          </a>
        </Grid>
      </Grid>
    </footer>
  );
}
