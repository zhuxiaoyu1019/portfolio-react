import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Title from "../../components/Title/Title";
import ProfileImg from "../../assets/images/profilepic.jpeg";
import "./about.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginBottom: theme.spacing(2),
  },
}));

export default function About() {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className="container" id="about">
      <Grid item md={12} lg container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Title title="ABOUT ME" />
            <Typography variant="body2" gutterBottom className="current-role">
              I'm a web developer in training based in Seattle, Washington.
            </Typography>
            <Typography variant="body2" className="brand-stat">
              Fascinated by web development and always interested in exploring
              various ways to approach solutions. My technical aptitude in
              cutting-edge web technologies, combined with abilities such as a
              quick learner, reliable personality, and always holding a positive
              attitude, make me a strong addition to any engineering team.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <img className="img" alt="rita" src={ProfileImg} />
    </Grid>
  );
}
