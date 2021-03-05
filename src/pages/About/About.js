import React, { useEffect, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Title from "../../components/Title/Title";
import ProfileImg from "../../assets/images/profilepic.jpeg";
import gsap from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./about.scss";

export default function About() {
  gsap.registerPlugin(ScrollTrigger);
  const currentRole = useRef();
  const brandStat = useRef();
  const pfp = useRef();

  useEffect(() => {
    gsap.from(currentRole.current, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.2,
      delay: 0.7
    })
    gsap.from(brandStat.current, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.2,
      delay: 0.9
    })
    gsap.from(pfp.current, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.2,
      delay: 1.1
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
    console.log(currentRole.current)
    gsap.to(currentRole.current, {
      scrollTrigger: {
        trigger: currentRole.current,
        scrub: true,
        start: "150% center"
      },
      color: '#fff',
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
    <Grid container spacing={2} className="container" id="about">
      <Grid item md={12} lg container>
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
      <div className="wrapper">
        <img className="img" alt="rita" src={ProfileImg} ref={pfp} />
      </div>
    </Grid >
  );
}
