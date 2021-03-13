import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-scroll";
import Resume from "../../assets/resume.pdf"
import "./Nav.scss";

export default function Nav({ clickState, setClickState }) {
  const [scrollState, setScrollState] = useState();
  const [checkState, setCheckState] = useState(false);
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
    <header className={scrollState > 750 ? "main-header scrolled" : "main-header"}>
      <div className="nav-brand">
        <Link
          to="landing"
          smooth={true}
          duration={1000}>
          <p ref={navBrand} id="nav-brand">RITA Z</p>
        </Link>
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
          <a href={Resume} target='_blank'>Resume</a>
        </li>
      </ul>
    </header>
  );
}
