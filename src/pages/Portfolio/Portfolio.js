import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import fit from "math-fit";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GroupUp from "../../assets/images/groupup.png";
import DataReport from "../../assets/images/gun-violence-data-report.png";
import Pizzacutter from "../../assets/images/pizzacutter.png";
import RadCaTS from "../../assets/images/RadCaTS.png";
import FullTankard from "../../assets/images/the-full-tankard.png";
import Disp from "../../assets/images/displacement-filter.jpg";
import "./Portfolio.scss";

export default function Portfolio() {
  gsap.registerPlugin(ScrollTrigger);
  const h1 = useRef();
  useEffect(() => {
    new Sketch();
    gsap.from(h1.current, {
      scrollTrigger: {
        trigger: h1.current,
        scrub: true,
      },
      duration: 1,
      y: -20,
      opacity: 0
    })
  }, []);

  const loadImages = (paths, whenLoaded) => {
    const imgs = [];
    const img0 = [];
    paths.forEach((path) => {
      const img = new Image();
      img.onload = () => {
        imgs.push(img);
        img0.push({ path, img });
        if (imgs.length === paths.length) whenLoaded(img0);
      };
      img.src = path;
    });
  };

  class Sketch {
    constructor() {
      this.app = new PIXI.Application({
        transparent: true,
        resizeTo: window,
      });
      document.querySelector(".canvas").appendChild(this.app.view);
      this.margin = 50;
      this.scroll = 0;
      this.scrollTarget = 0;
      this.width = (window.innerWidth - 2 * this.margin) / 3;
      this.height = window.innerHeight * 0.7;
      this.container = new PIXI.Container();
      this.app.stage.addChild(this.container);
      this.images = [
        GroupUp,
        RadCaTS,
        FullTankard,
        Pizzacutter,
        DataReport,

      ];
      this.WHOLEWIDTH = this.images.length * (this.width + this.margin);

      loadImages(this.images, (images) => {
        this.loadedImages = images;
        this.add();
        this.render();
        this.scrollEvent();
        this.addFilter();
      });
    }

    scrollEvent() {
      document.addEventListener("mousewheel", (e) => {
        this.scrollTarget = e.wheelDelta / 3;
      });
    }

    addFilter() {
      this.displacementSprite = PIXI.Sprite.from(Disp);
      this.app.stage.addChild(this.displacementSprite);

      const target = {
        w: 512,
        h: 512,
      };

      const parent = {
        w: window.innerWidth,
        h: window.innerHeight,
      };

      const cover = fit(target, parent);

      this.displacementSprite.position.set(cover.left, cover.top);
      this.displacementSprite.scale.set(cover.scale, cover.scale);

      this.displacementFilter = new PIXI.filters.DisplacementFilter(
        this.displacementSprite
      );

      this.displacementFilter.scale.x = 0;
      this.displacementFilter.scale.y = 0;
      this.container.filters = [this.displacementFilter];
    }

    drawOverlay(mask) {

    }

    add() {
      const parent = {
        w: this.width,
        h: this.height,
      };
      this.thumbs = [];
      this.loadedImages.forEach((img, i) => {
        const texture = PIXI.Texture.from(img.img);
        const sprite = new PIXI.Sprite(texture);
        const container = new PIXI.Container();
        const spriteContainer = new PIXI.Container();

        const mask = new PIXI.Sprite(PIXI.Texture.WHITE);
        mask.width = this.width;
        mask.height = this.height;
        sprite.mask = mask;

        sprite.anchor.set(0.5);
        sprite.position.set(
          sprite.texture.orig.width / 2,
          sprite.texture.orig.height / 2
        );

        const image = {
          w: sprite.texture.orig.width,
          h: sprite.texture.orig.height,
        };

        const cover = fit(image, parent);

        spriteContainer.position.set(cover.left, cover.top);
        spriteContainer.scale.set(cover.scale, cover.scale);

        container.x = (this.margin + this.width) * i;
        container.y = this.height / 10;

        spriteContainer.addChild(sprite);
        container.interactive = true;
        container.on("mouseover", this.mouseOn);
        container.on("mouseout", this.mouseOut);
        container.addChild(spriteContainer);
        container.addChild(mask);
        this.container.addChild(container);
        this.thumbs.push(container);
      });
    }

    mouseOn(e) {
      const el = e.target.children[0].children[0];
      gsap.to(el.scale, {
        duration: 0.5,
        x: 1.1,
        y: 1.1,
      });
    }

    mouseOut(e) {
      const el = e.currentTarget.children[0].children[0];
      gsap.to(el.scale, {
        duration: 1,
        x: 1,
        y: 1,
      });
    }

    calcPos(scr, pos) {
      let temp =
        ((scr + pos + this.WHOLEWIDTH + this.width + this.margin) %
          this.WHOLEWIDTH) -
        this.width -
        this.margin;
      return temp;
    }

    render() {
      this.app.ticker.add(() => {
        this.app.renderer.render(this.container);

        this.direction = this.scroll > 0 ? -1 : 1;

        this.scroll -= (this.scroll - this.scrollTarget) * 0.1;
        this.scroll *= 0.9;
        this.thumbs.forEach((th) => {
          th.position.x = this.calcPos(this.scroll, th.position.x);
        });

        this.displacementFilter.scale.x =
          3 * this.direction * Math.abs(this.scroll);
      });
    }
  }

  return (
    <div className="project-container" id="portfolio">
      <div className="canvas">
        <h1 ref={h1}>SOME OF MY PAST PROJECT</h1>
      </div>
    </div>
  );
}
