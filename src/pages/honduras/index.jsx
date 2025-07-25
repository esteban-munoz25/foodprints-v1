import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CarmenHero from "./assets/carmen-hero.jpg";
import Section from "../../components/Section";

gsap.registerPlugin(ScrollTrigger);

const Carmen = () => {
    const imageRef = useRef(null);

    useGSAP(() => {
        gsap.to(imageRef.current, {
            width: "100vw",
            scale: 1.5,
            scrollTrigger: {
                trigger: imageRef.current,
                start: "top 25%",
                end: "bottom top",
                scrub: true,
                pin: true,
                markers: true, // Remove in production
            },
        });
    }, []);

    return (
        <Section className="hero-section text-white min-h-[200vh]">

            <div className="min-h-[100vh] flex flex-col justify-center align-middle" >
                <div className="image-scroll flex justify-center relative" >
                    <img
                    ref={imageRef}
                        src={CarmenHero}
                        alt="Carmen Hero"
                        className="max-w-2xl rounded-lg shadow-lg"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <h1 className="text-2xl font-bold">Carmen</h1>
                        <p>
                            Una pequeña agricultora de frijol en Catacamas, Honduras
                        </p>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Carmen;
