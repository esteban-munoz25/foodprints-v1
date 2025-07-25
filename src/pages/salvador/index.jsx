import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../../components/Section";
import DroneScene from "./droneScene";

gsap.registerPlugin(ScrollTrigger);

const Haydee = () => {

    return (
        <Section className="hero-section text-white min-h-[100vh] flex flex-col justify-center align-middle">
            <div className="hero-content">

                <h1>DRONE</h1>
                <DroneScene />

            </div>
        </Section>
    );
};

export default Haydee;
