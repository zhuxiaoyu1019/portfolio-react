import React, { useEffect, useRef } from "react";
import Typography from "@material-ui/core/Typography";
import gsap from "gsap/gsap-core";
import "./Title.scss";

export default function Title({ title }) {
  const t = useRef();

  useEffect(() => {
    gsap.from(t.current, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.2,
      delay: 0.5
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
