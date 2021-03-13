import React, { useEffect, useRef } from "react";
import { Grid, Typography } from "@material-ui/core";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Title from "../../components/Title/Title";
import useOnScreen from "../../components/InView";
import "./about.scss";

const About = (({ setClickState }) => {
  const [setRef, visible] = useOnScreen({ threshold: 0.2 });

  const currentRole = useRef();
  const brandStat = useRef();
  const pfp = useRef();

  useEffect(() => {
    if (visible) {
      setClickState({ about: true, portfolio: false, contact: false })
    }
  }, [visible])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(currentRole.current, {
      scrollTrigger: {
        trigger: currentRole.current,
      },
      duration: 2,
      opacity: 0,
      y: -20,
      stagger: 0.2,
      delay: 2.5
    })
    gsap.from(brandStat.current, {
      scrollTrigger: {
        trigger: brandStat.current,
      },
      duration: 1.5,
      opacity: 0,
      y: -40,
      stagger: 0.2,
      delay: 2.7
    })
    gsap.from(pfp.current, {
      scrollTrigger: {
        trigger: pfp.current,
      },
      duration: 1.5,
      opacity: 0,
      y: -50,
      stagger: 0.2,
      delay: 2.9
    })
    gsap.to(pfp.current, {
      scrollTrigger: {
        trigger: pfp.current,
        scrub: true,
        start: "110% center"
      },
      duration: 1.1,
      scale: 1.2,
      height: 50
    })
    gsap.to(currentRole.current, {
      scrollTrigger: {
        trigger: currentRole.current,
        scrub: true,
        start: "150% center"
      },
      color: '#333333',
      duration: 1.5,
    })
    gsap.to(brandStat.current, {
      scrollTrigger: {
        trigger: brandStat.current,
        scrub: true,
        start: "80% center"
      },
      color: '#333333',
      duration: 1.5,
    })
  }, [])

  return (
    <Grid container spacing={2} className="container" id="about" ref={setRef}>
      <Grid item md={12} lg container className="about-wrapper">
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Title title="ABOUT ME" />
            <Typography variant="body2" gutterBottom className="current-role" ref={currentRole}>
              I'm a web developer based in Seattle, Washington.
            </Typography>
            <Typography variant="body2" className="brand-stat" ref={brandStat}>
              Fascinated by web development and always interested in exploring
              various ways to approach solutions. My technical aptitude in
              cutting-edge web technologies, combined with abilities such as a
              quick learner, reliable personality, and always holding a positive
              attitude, make me a strong addition to any engineering team.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} lg={4} container className="img-outer-wrapper">
        <div className="img-inner-wrapper">
          <img className="img" alt="rita" src="https://res.cloudinary.com/drdwcvbe8/image/upload/v1615578044/portfolio/profilepic_wli7cc.jpg" ref={pfp} />
        </div>
      </Grid >
    </Grid >
  );
})

export default About;
