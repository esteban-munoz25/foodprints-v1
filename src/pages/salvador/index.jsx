import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DroneScene from "./droneScene"; // Assuming you have a DroneScene component
import "./assets/style.css";
import Photo1 from "./assets/photo1.jpg";
import Photo2 from "./assets/photo2.jpg";
import HeroImg from "./assets/hero.webp";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function Haydee() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    let masks = gsap.utils.toArray(".img-mask");

    gsap.to(masks[1], {
      height: "0%",
      ease: "none",
      scrollTrigger: {
        trigger: ".revealer",
        start: "top top",
        pin: true,
        end: "+=100%",
        scrub: 0.5,
      },
    });
  }, []);

  return (
    // This is the main container GSAP will scope to
    <>
      <DroneScene />
      <section className="revealer">
        <div className="img-mask">
          <img
            src={Photo1}
            alt="Landscape image 1"
          />
        </div>
        <div className="img-mask">
          <img
            src={HeroImg}
            alt="Landscape image 2"
          />
        </div>
        <div className="overlay">Image Reveal on Scroll</div>
      </section>
      <section style={{ backgroundColor: "navy" }}>More content...</section>
    </>
  );
}
