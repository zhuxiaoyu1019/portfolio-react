import React, { useEffect, useRef } from "react";
import Typography from "@material-ui/core/Typography";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Title.scss";

export default function Title({ title }) {
  const t = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(t.current, {
      scrollTrigger: {
        trigger: t.current,
      },
      duration: 2,
      opacity: 0,
      y: -20,
      stagger: 0.2,
      delay: 2.3
    })
    gsap.to(t.current, {
      scrollTrigger: {
        trigger: t.current,
        scrub: true,
        start: "80% center"
      },
      color: '#333333',
      duration: 1,
    })
  }, [])

  return (
    <div>
      <Typography gutterBottom className="title" ref={t}>
        {title}
      </Typography>
    </div>
  );
}
