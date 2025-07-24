import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function App() {
  const containerRef = useRef();
  const [count, setCount] = useState(0);

  // useGSAP(() => {
  //   gsap.to(boxRef.current, {
  //     x: 100 + count,
  //     duration: 3,
  //     delay: 1,
  //   })
  // }, {dependencies: [count], revertOnUpdate: true});

  useGSAP(
    () => {
      gsap.to(".box", {
        x: 100 + count,
        duration: 3,
        delay: 1,
      });
    },
    { dependencies: [count], revertOnUpdate: true, scope: containerRef }
  );

  return (
    <>
      <div className="App">
        <h1>FoodPrints</h1>
        <div ref={containerRef}>
          <div className="box"></div>
        </div>
        <div>
          <div className="box"></div>
          <button onClick={() => setCount(count + 100)}>
            Count is {count}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
