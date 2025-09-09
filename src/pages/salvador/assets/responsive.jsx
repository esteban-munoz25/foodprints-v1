import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Responsive() {
  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(max-width: 500px)", () => {0

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".box",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            markers: true,
          },
        });

        tl.to(".box", {
            rotation: 360,
            duration: 2
        })

        .to(".box", {
            scale: 2,
            duration: 1,
        })
    });
 

    //LARGE SCREEN
    // mm.add({
    //   isMobile: "(max-width: 500px)",
    //   isDesktop: "(min-width: 501px)",
    // }, (context) => {
    //   let {isMobile,reduceMotion} = context.conditions;

    //   gsap.to(".box", {
    //     rotation: reduceMotion ? 0 : isMobile ? 360 : -360,
    //     opacity: 0,
    //     duration: 2,
    //   });
    // });


    //STOP MOVING ON CLICK 
    
    // mm.add("(max-width: 500px)", (context) => {
    //   const box = document.querySelector(".box");

    //   // Register the animation function in the GSAP context
    //   context.add("spinTheBox", () => {
    //     gsap.to(".box", {
    //       rotation: 360,
    //       duration: 2,
    //     });
    //   });

    //   // Add the click event listener that uses the registered function
    //   const handleClick = () => {
    //     context.spinTheBox(); // Access the registered function
    //   };

    //   box?.addEventListener("click", handleClick);

    //   // Clean up
    //   return () => {
    //     box?.removeEventListener("click", handleClick);
    //   };
    // });

  });

  return (
    <div style={{width: "100%", height: "200vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
    <div
      className="box" 
      style={{ maxWidth: "100px", height: "100px", backgroundColor: "red" }}
    ></div>
    </div>
  );
  }