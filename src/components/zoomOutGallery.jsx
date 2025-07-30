import React from "react";
import "../assets/zoomOut.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Photo1 from "../assets/photo1.jpg";
import Photo2 from "../assets/photo2.jpg";
import Photo3 from "../assets/photo3.jpg";
import Photo4 from "../assets/photo4.jpg";
import Photo5 from "../assets/photo5.jpg"; //center image
import Photo6 from "../assets/photo6.jpg";
import Photo7 from "../assets/photo7.jpg";
import Photo8 from "../assets/photo8.jpg";
import Photo9 from "../assets/photo9.jpg";

// https://codepen.io/GreenSock/pen/wvKwZXG

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function ZoomOutGallery() {
  // Zoom out images
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".grid-container",
        start: "top top",
        end: () => innerHeight * 4,
        scrub: true,
        pin: ".grid",
        anticipatePin: 1,
      },
    });

    // Set initial state - hide all non-center blocks
    tl.set(".gridBlock:not(.centerBlock)", { autoAlpha: 0 });

    // Show non-center blocks with stagger
    tl.to(
      ".gridBlock:not(.centerBlock)",
      { autoAlpha: 1, duration: 0.1, stagger: 0.05 },
      0.001
    );

    // Scale down only the center image from full screen to grid size
    tl.fromTo(
      ".centerPiece .centerBlock",
      { scale: 1 },
      { scale: 0.3, ease: "power1.inOut" }
    );

    return () => gsap.killTweensOf(".gridBlock");
  }, []);

  const images = [
    Photo1,
    Photo2,
    Photo3,
    Photo4,
    Photo5,
    Photo6,
    Photo7,
    Photo8,
    Photo9,
  ];

  return (
    <div className="zoom-out-gallery">
      <h1 className="header-section text-6xl py-10">
        Mostrar a Carmen y luego mostrar a los otros agricultores
      </h1>

      <div className="grid-container">
        <div className="grid">
          <div className="gridLayer">
            <div
              className="gridBlock"
              style={{ backgroundImage: `url(${images[0]})` }}
            ></div>
          </div>
          <div className="gridLayer">
            <div
              className="gridBlock"
              style={{ backgroundImage: `url(${images[1]})` }}
            ></div>
          </div>
          <div className="gridLayer">
            <div
              className="gridBlock"
              style={{ backgroundImage: `url(${images[2]})` }}
            ></div>
          </div>
          <div className="gridLayer">
            <div
              className="gridBlock"
              style={{ backgroundImage: `url(${images[3]})` }}
            ></div>
          </div>
          <div className="gridLayer centerPiece">
            <div
              className="gridBlock centerBlock"
              style={{ backgroundImage: `url(${images[4]})` }}
            ></div>
          </div>
          <div className="gridLayer">
            <div
              className="gridBlock"
              style={{ backgroundImage: `url(${images[5]})` }}
            ></div>
          </div>
          <div className="gridLayer">
            <div
              className="gridBlock"
              style={{ backgroundImage: `url(${images[6]})` }}
            ></div>
          </div>
          <div className="gridLayer">
            <div
              className="gridBlock"
              style={{ backgroundImage: `url(${images[7]})` }}
            ></div>
          </div>
          <div className="gridLayer">
            <div
              className="gridBlock"
              style={{ backgroundImage: `url(${images[8]})` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ZoomOutGallery;
