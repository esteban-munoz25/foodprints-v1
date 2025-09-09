import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import "./assets/style.css";
import Photo1 from "./assets/photo1.jpg";
import Photo2 from "./assets/photo2.jpg";
import HeroImg from "./assets/hero.webp";
import Responsive from "./assets/responsive";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function Haydee() {
  const iframeRef = useRef(null);

  // Load YouTube Player API and set playback speed
  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (window.YT && window.YT.Player) {
        initializePlayer();
      } else {
        // Load YouTube API if not already loaded
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubeIframeAPIReady = initializePlayer;
      }
    };

    const initializePlayer = () => {
      if (iframeRef.current) {
        new window.YT.Player(iframeRef.current, {
          events: {
            onReady: (event) => {
              // Set playback rate to 2x when video is ready
              event.target.setPlaybackRate(2);
            },
            onStateChange: (event) => {
              // Ensure playback rate is maintained when video state changes
              if (event.data === window.YT.PlayerState.PLAYING) {
                event.target.setPlaybackRate(2);
              }
            },
          },
        });
      }
    };

    loadYouTubeAPI();
  }, []);

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
    <div className="px-136">
      {/* <section className="revealer">
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
      </section> */}

      {/* YouTube 360 Video Section */}
      <section
        className="youtube-section"
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <iframe
          ref={iframeRef}
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/s1O_40Wf-pg?autoplay=0&mute=1&controls=1&showinfo=0&rel=0&modestbranding=1&enablejsapi=1"
          title="YouTube 360 Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            maxWidth: "75%",
            maxHeight: "50%",
            aspectRatio: "16/9",
          }}
        ></iframe>
      </section>

      {/* <Responsive /> */}
    </div>
  );
}
