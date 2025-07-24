import { useState } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Section from "../../components/Section";
import { Link } from "react-router-dom";

export default function Carmen() {
  const containerRef = useRef();
  const [count, setCount] = useState(0);

  useGSAP(
    () => {
      gsap.to(boxRef.current, {
        x: 100 + count,
        duration: 3,
        delay: 1,
      });
    },
    { dependencies: [count], scope: containerRef }
  );

  const boxRef = useRef();

  return (
    <Section className="text-white flex flex-col justify-center align-middle" ref={containerRef}>

      <div className="py-40 flex flex-col items-center">
        <h1 className="text-2xl font-bold">Carmen</h1>
        <Link to="/" className="text-blue-500 underline">
          Back to Landing Page
        </Link>
      </div>

      <div
        ref={boxRef}
        className="box bg-blue-500 w-32 h-32 rounded shadow"
      >
      </div>
    </Section>
  );
}
