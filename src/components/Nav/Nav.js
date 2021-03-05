import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-scroll";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs";
import PropTypes from "prop-types";
import { Document, Page, pdfjs } from "react-pdf";
import Resume from "../../assets/images/resume.pdf";
import gsap from "gsap/gsap-core";
import "./Nav.scss";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const useStyles = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

export default function Nav() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [numPages, setNumPages] = useState(null);
  const [scrollState, setScrollState] = useState();
  const [checkState, setCheckState] = useState(false);
  const [clickState, setClickState] = useState({
    about: true,
    portfolio: false,
    contact: false,
  });
  const navBrand = useRef();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollState(window.pageYOffset);
    });
    window.scrollTo(0, 0);
    gsap.from(navBrand.current, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.2,
      delay: 0.5
    })
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleClick = (type) => {
    setCheckState(!checkState);
    if (type === "about") {
      setClickState({
        ...clickState,
        about: true,
        contact: false,
        portfolio: false,
      });
    } else if (type === "contact") {
      setClickState({
        ...clickState,
        about: false,
        contact: true,
        portfolio: false,
      });
    } else if (type === "portfolio") {
      setClickState({
        ...clickState,
        about: false,
        contact: false,
        portfolio: true,
      });
    }
  };

  const style = {
    about: clickState.about ? "active" : "",
    portfolio: clickState.portfolio ? "active" : "",
    contact: clickState.contact ? "active" : "",
  };

  return (
    <header className={scrollState > 15 ? "scrolled main-header" : "main-header"}>
      <div className="nav-brand">
        <Link to="about"><p ref={navBrand} id="nav-brand">RITA Z</p></Link>
      </div>
      <input
        type="checkbox"
        className="menu-btn"
        id="menu-btn"
        checked={checkState}
      />
      <label htmlFor="menu-btn" className="menu-icon" onClick={handleClick} onChange={setCheckState}>
        <span className="menu-icon-line"></span>
      </label>

      <ul className="nav-links">
        <li className={`nav-link ${style.about}`}>
          <Link
            to="about"
            onClick={() => handleClick("about")}
            smooth={true}
            duration={1000}
          >
            About
          </Link>
        </li>
        <li className={`nav-link ${style.portfolio}`}>
          <Link
            to="portfolio"
            onClick={() => (handleClick("portfolio"))}
            smooth={true}
            duration={1000}
          >
            Portfolio
          </Link>
        </li>
        <li className={`nav-link ${style.contact}`}>
          <Link
            to="contact"
            onClick={() => (handleClick("contact"))}
            smooth={true}
            duration={1000}
          >
            Contact
          </Link>
        </li>
        <li className="nav-link">
          <a onClick={handleOpen}>Resume</a>
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
              <div>
                <Document file={Resume} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={1} />
                </Document>
              </div>
            </Fade>
          </Modal>
        </li>
      </ul>
    </header>
  );
}
