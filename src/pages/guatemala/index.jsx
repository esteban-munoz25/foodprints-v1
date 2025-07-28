import React, { useRef } from 'react';
import './assets/style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Button from '../../components/ui/button';
import
  {iconArrowRight}
from '@wfp/icons';

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
      <h2 className="container__headline text-white">Wanna see something neat? Scroll</h2>
      <section className="container hero">
        <div className="hero__inner">
          <div className="hero__images">
            <img
              className="hero__image"
              src="https://images.unsplash.com/photo-1508781197106-d8c535dcf276?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1200&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
              alt="Neat"
            />
          </div>
          <div className="hero__content">
            <div className="hero__headline">
              <span>How Neat is That?</span>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div>
      <div className="box"></div>
      <Button id="give-now" title="Give Now!" leftIcon={<iconArrowRight/>} containerClass="bg-yellow-300 flex-enter gap-1"/>
    </div>
    </>
  );
}

export default Wendy;