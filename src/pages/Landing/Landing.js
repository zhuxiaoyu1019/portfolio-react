import React, { useState, useEffect } from "react";
import TRUNK from "vanta/dist/vanta.trunk.min";
import { Link } from "react-scroll";
import useOnScreen from "../../components/InView";
import "./Landing.scss";

const Landing = ({ clickState, setClickState }) => {
  const [setRef, visible] = useOnScreen({ threshold: 0.2 })
  const [vantaEffect, setVantaEffect] = useState(0);

  useEffect(() => {
    if (visible) {
      setClickState({ ...clickState, about: false, portfolio: false, contact: false })
    }
  }, [visible])

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        TRUNK({
          el: ".loading-page",
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 0.3,
          color: 0x5279ff,
          backgroundColor: 0x0,
          chaos: 8.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div className="loading-page container" id="landing" ref={setRef}>
      <div className="layer">
        <svg
          id="loading-text"
          width="484"
          height="105"
          viewBox="0 0 484 105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M75.3594 28.4141C75.3594 35.4453 73.5312 41.1641 69.875 45.5703C66.2656 49.9297 60.6875 53.1172 53.1406 55.1328L77.0469 104H66.0781L42.7344 56.6797H10.6016V104H0.40625V1.0625H37.6016C50.9609 1.0625 60.5938 3.28906 66.5 7.74219C72.4062 12.1484 75.3594 19.0391 75.3594 28.4141ZM10.6016 8.65625V48.7344H35.2812C38.6562 48.7344 41.6094 48.6172 44.1406 48.3828C46.7188 48.1484 49.3672 47.6094 52.0859 46.7656C54.8516 45.9219 57.1016 44.7969 58.8359 43.3906C60.6172 41.9844 62.0703 40.0391 63.1953 37.5547C64.3203 35.0234 64.8828 32.0234 64.8828 28.5547C64.8828 24.9922 64.3438 21.9688 63.2656 19.4844C62.1875 16.9531 60.8281 15.0078 59.1875 13.6484C57.5938 12.2422 55.4609 11.1641 52.7891 10.4141C50.1641 9.61719 47.7031 9.125 45.4062 8.9375C43.1094 8.75 40.2969 8.65625 36.9688 8.65625H10.6016Z"
            stroke="white"
            strokeWidth="1.25"
          />
          <path
            d="M120.868 104H110.603V1.0625H120.868V104Z"
            stroke="white"
            strokeWidth="1.25"
          />
          <path
            d="M151.12 8.9375V0.992188H228.534V8.9375H195.206V104H184.448V8.9375H151.12Z"
            stroke="white"
            strokeWidth="1.25"
          />
          <path
            d="M249.785 104L283.957 1.0625H297.457L331.769 104H321.223L311.801 75.9453H269.051L260.051 104H249.785ZM290.355 8.23438C289.652 10.3906 288.48 14.1172 286.84 19.4141C285.246 24.6641 284.074 28.4844 283.324 30.875L271.441 68.2812H309.41L297.457 30.8047C294.738 22.3672 292.371 14.8438 290.355 8.23438Z"
            stroke="white"
            strokeWidth="1.25"
          />
          <path
            d="M411.819 8.65625V1.0625H482.553V6.75781L418.709 96.4766H482.905L482.413 104H405.983V97.1094L469.123 8.65625H411.819Z"
            stroke="white"
            strokeWidth="1.25"
          />
        </svg>
        <Link
          to="about"
          smooth={true}
          duration={1300}>
          <p className="enter">View my Work</p>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
