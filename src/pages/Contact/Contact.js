import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Title from "../../components/Title/Title";
import "./Contact.scss";

const useStyles = makeStyles((theme) => ({
  cssLabel: {
    color: "rgba(255, 255, 255, 0.7)",
  },

  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: "rgba(255, 255, 255, 0.7)",
    },
  },

  cssFocused: {
    color: "rgba(255, 255, 255, 0.7)",
  },

  notchedOutline: {
    borderWidth: "1px",
    borderColor: "rgba(255, 255, 255, 0.7) !important",
  },
}));

export default function Contact() {
  const classes = useStyles();
  return (
    <div className="container" id="contact">
      <Title title="SEND ME AN EMAIL" />
      <Divider variant="fullWidth" light={true} />
      <form className="needs-validation">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="name"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              color="primary"
              autoFocus
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} className="msg-input">
            <TextField
              variant="outlined"
              required
              fullWidth
              multiline
              rows={4}
              id="msg"
              label="Message"
              name="msg"
              InputLabelProps={{
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
          </Grid>
        </Grid>
        <Button variant="outlined" className="submit-btn">
          Send Email
        </Button>
      </form>
    </div>
  );
}
