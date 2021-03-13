import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import emailjs from 'emailjs-com';
import { useSpring, animated } from 'react-spring/web.cjs';
import { makeStyles, TextField, Grid, Divider, Button, Tooltip, Modal, Backdrop } from "@material-ui/core";
import Title from "../../components/Title/Title";
import useOnScreen from "../../components/InView";
import "./Contact.scss";

const useStyles = makeStyles((theme) => ({
  cssLabel: {
    color: "#f6f6f6",
  },
  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: "#f6f6f6",
    },
  },
  cssFocused: {
    color: "#f6f6f6",
  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "#f6f6f6 !important",
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center"
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const Contact = ({ setClickState }) => {
  const [setRef, visible] = useOnScreen({ threshold: 0.2 })
  const [form, setForm] = useState({});
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (visible) {
      setClickState({ about: false, portfolio: false, contact: true })
    }
  }, [visible])

  const handleClose = () => {
    setOpen(false);
  };

  const formChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const sendEmail = (e) => {
    e.preventDefault();
    setOpen(true);
    if (form.from_name && form.from_email && form.message) {
      emailjs.send('service_dn66jpb', 'template_mejjs6i', form, 'user_mhPrLaSJe44HnwdoXuz3x')
        .then((result) => {
          console.log(result.text);
          setOpen(true);
          setForm({});
        }, (error) => {
          console.log(error.text);
        });
    }
  }

  return (
    <div className="container contact-wrapper" id="contact" ref={setRef}>
      <Title title="SEND ME AN EMAIL" />
      <Divider variant="fullWidth" light={true} />
      <form className="needs-validation">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="name"
              name="from_name"
              value={form.from_name || ""}
              onChange={formChange}
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
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
              name="from_email"
              value={form.from_email || ""}
              onChange={formChange}
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
              name="message"
              value={form.message || ""}
              onChange={formChange}
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
        <div className="submit-wrapper">
          {form.from_name && form.from_email && form.message ?
            <>
              <Button variant="outlined" className="submit-btn" onClick={sendEmail}>
                Send Email
              </Button>
              <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div className={classes.paper}>
                    <h2 id="spring-modal-title">Thank you for contacting me 😁!</h2>
                    <p id="spring-modal-description" style={{ marginTop: "10px" }}>I will respond as soon as possible.</p>
                  </div>
                </Fade>
              </Modal>
            </>
            :
            <Tooltip title="Please fill all of the required fields.">
              <span>
                <Button variant="outlined" className="submit-btn" onClick={sendEmail} disabled>
                  Send Email
                </Button>
              </span>
            </Tooltip>
          }
        </div>
      </form>
    </div >
  );
}

export default Contact;
