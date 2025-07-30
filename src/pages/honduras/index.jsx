import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CarmenHero from "./assets/carmen-hero.jpg";
import Section from "../../components/Section";
import "./assets/progressBar.css"; // Assuming you have a CSS file for the progress bar styles
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import ZoomOutGallery from "../../components/zoomOutGallery";
import "../../assets/zoomOut.css";

// SCROLL PENS https://codepen.io/GreenSock/pen/xxaPojz
// https://codepen.io/GreenSock/pen/xxjErmp
// https://codepen.io/GreenSock/pen/oNpPwaV
// https://codepen.io/GreenSock/pen/KKpLdWW
// https://codepen.io/GreenSock/details/XWMPLQg
// https://codepen.io/GreenSock/pen/YzbPYMx

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Carmen = () => {
  const imageRef = useRef(null);
  const containerRef = useRef(null); // Added for context to apply scope to GSAP

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animation for the image (existing)
      gsap.to(imageRef.current, {
        scale: 1.5,
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 25%",
          end: "bottom top",
          scrub: true,
          pin: true,
          markers: false, // Set to false in production
        },
      });
    });
    return () => ctx.revert();
  }, []);

 
  useGSAP(() => {
    // --- RED PANEL ---
    gsap.from(".line-1", {
      scrollTrigger: {
        trigger: ".line-1",
        scrub: true,
        start: "top bottom",
        end: "top top",
      },
      scaleX: 0,
      transformOrigin: "left center",
      ease: "none",
    });

    // --- ORANGE PANEL ---
    gsap.from(".line-2", {
      scrollTrigger: {
        trigger: ".orange",
        scrub: true,
        pin: true,
        start: "top top",
        end: "+=100%",
      },
      scaleX: 0,
      transformOrigin: "left center",
      ease: "none",
    });

    // --- plain/GREEN PANEL ---
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".plain",
        scrub: true,
        pin: true,
        start: "top top",
        end: "+=100%",
      },
    });

    tl.from(".plain p", {
      scale: 0.3,
      rotation: 45,
      autoAlpha: 0,
      ease: "power2",
    })
      .from(
        ".line-3",
        { scaleX: 0, transformOrigin: "left center", ease: "none" },
        0
      )
      .to(".plain", { backgroundColor: "#28a92b" }, 0);

    return () => gsap.killTweensOf(".line-1, .line-2, .line-3");
  }, []);
 // Progress bar animation
  useGSAP(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".container",
        start: "top 8px",
        end: "+=800", // pin for 800 pixels worth of scroll
        scrub: true,
        pin: true,
      },
    });

    tl.from(".box", {
      visibility: "hidden",
      duration: 0.01, // just a tiny amount of duration so it's like a toggle since visibility isn't really animatable.
      stagger: 0.5, // stagger the starting time of each subsequent reveal
    });

    // create a proxy object so we can tween the numeric value and plug it into the amount element's innerText using an onUpdate()
    let amountProxy = { value: 0 },
      amountEl = document.querySelector(".amount");
    tl.to(
      amountProxy,
      {
        value: 800,
        onUpdate: () =>
          (amountEl.innerText = "$" + formatNumber(amountProxy.value, 2)),
        duration: tl.duration(), // just match however long the entire timeline is at this point (it's only populated with the visibility toggles, so it'll stretch to fit those exactly)
        ease: "none",
      },
      0
    ); // <- position parameter places it at the very start of the timeline, so it overlaps with the toggling visibility stuff.

    // a helper function for formatting a number - it adds commas and forces a certain number of decimal places.
    function formatNumber(value, decimals) {
      let s = (+value).toLocaleString("en-US").split(".");
      return decimals
        ? s[0] + "." + ((s[1] || "") + "00000000").substr(0, decimals)
        : s[0];
    }
  }, []);

  return (
    <>
      <Section className="hero-section text-white " ref={containerRef}>
        {/* HERO SECTION  */}
        <div className="min-h-[150vh]">
          <div className="min-h-[100vh] flex flex-col justify-center items-center">
            <div className="image-scroll flex justify-center relative w-full h-full">
              <img
                ref={imageRef}
                src={CarmenHero}
                alt="Carmen, small bean farmer in Catacamas, Honduras"
                className="max-w-2xl rounded-lg shadow-lg object-cover w-full"
                style={{ maxWidth: "min(90vw, 40rem)" }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">
                  Carmen
                </h1>
                <p className="text-lg md:text-xl font-medium drop-shadow-lg">
                  Una pequeña agricultora de frijol en Catacamas, Honduras
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PROGRESS BAR SECTION WITH SCROLL
        <>
          <div className="description panel blue" id="blue-panel">
            <div>
              <h1>Scrub animations</h1>
              <p>
                A ScrollTrigger with <code>scrub: true</code> links the scroll
                position to an animation's progress, making the scroll bar act
                like a scrubber while it's between the ScrollTrigger's{" "}
                <code>start</code> and <code>end</code>.
              </p>
              <div className="scroll-down">
                Scroll down<div className="arrow"></div>
              </div>
            </div>
          </div>

          <section className="panel red" id="red-panel">
            <p>
              <span className="line line-1"></span>This line's animation will
              begin when it enters the viewport and finish when its top edge
              hits the top of the viewport, staying perfectly in sync with the
              scrollbar because it has <code>scrub:&nbsp;true</code>
            </p>
          </section>

          <section className="panel orange" id="orange-panel">
            <p>
              <span className="line line-2"></span>This orange panel gets pinned
              when its top edge hits the top of the viewport, then the line's
              animation is linked with the scroll position until it has traveled
              100% of the viewport's height (<code>end: "+=100%"</code>), then
              the orange panel is unpinned and normal scrolling resumes. Padding
              is added automatically to push the rest of the content down so
              that it catches up with the scroll when it unpins. You can set{" "}
              <code>pinSpacing: false</code> to prevent that if you prefer.
            </p>
          </section>

          <section className="panel plain" id="plain-panel">
            <p>
              <span className="line line-3"></span>This panel gets pinned in a
              similar way, and has a more involved animation that's wrapped in a
              timeline, fading the background color and animating the transforms
              of the paragraph in addition to the line, all synced with the
              scroll position perfectly.
            </p>
          </section>

          <section className="panel gray" id="gray-panel">
            <p>DONE!</p>
          </section>
        </> */}
      </Section>

      {/* Gallery Section with proper spacing */}
      <div className="gallery-section">
        <div className="gallery-spacer"></div>
        <ZoomOutGallery />
      </div>

      {/* PROGRESS BAR  */}
      <Section>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div className="bar">
            <div className="box green-box"></div>
            <div className="box green-box"></div>
            <div className="box green-box"></div>
            <div className="box green-box"></div>
            <div className="box green-box"></div>
            <div className="box green-box"></div>
            <div className="box green-box"></div>
            <div className="box green-box"></div>
            <div className="box green-box"></div>
            <div className="box green-box"></div>
          </div>
          <div className="amount">$0.00</div>
        </div>
      </Section>
    </>
  );
};

export default Carmen;
