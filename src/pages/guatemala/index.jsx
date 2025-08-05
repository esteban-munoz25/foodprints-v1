import React, { useRef } from 'react';
import './assets/style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Button from '../../components/ui/button';
import HeroPhoto from "./assets/hero.jpg"
// import ZoomOutGallery from '../../components/zoomOutGallery';

gsap.registerPlugin(ScrollTrigger);

function Wendy() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.to(".hero", {
      scrollTrigger: {
        trigger: ".hero",
        scrub: true,
        pin: true,
        start: "center center",
        end: "bottom -100%",
        toggleClass: "active",
        ease: "power2",
        markers: true
      }
    });

    gsap.to(".hero__image", {
      scrollTrigger: {
        trigger: ".hero",
        scrub: 0.5,
        start: "top bottom",
        end: "bottom -200%",
        ease: "power2",
      },
      y: "-20%"
    });

  }, []);

  return (
    <>
    <div ref={sectionRef}>
      <section className="container hero">
        <div className="hero__inner">
          <div className="hero__images">
            <img
              className="hero__image"
              src={HeroPhoto}
              alt="Neat"
            />
          </div>
          <div className="hero__content">
            <div className="hero__headline">
              <span>Title goes here!</span>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div>
      <div className="flex w-full h-full justify-center align-center">
        <Button id="give-now" title="Give Now!"  containerClass="bg-red-300 flex-enter gap-1" />
      </div>
    </div>
    </>
  );
}

export default Wendy;