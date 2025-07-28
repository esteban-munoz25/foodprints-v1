import { useRef } from 'react';
import { useLocation } from 'react-router-dom'; // Make sure this is installed and imported
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import DroneScene from './droneScene'; // Assuming you have a DroneScene component
import './assets/style.css'; 

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP);

export default function Haydee() {
    const main = useRef();
    const { pathname } = useLocation();

    useGSAP(() => {
        // Create the ScrollSmoother instance
        const smoother = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.5, // Adjust smoothness (1 is the default)
            effects: true, // This enables the parallax effect for elements with data-speed
            smoothTouch: 0.1,
        });

        // ✨ Bonus Animation: Fade in images on scroll
        gsap.from('.image_cont', {
            opacity: 0,
            y: 100,
            stagger: 0.1,
            duration: 1,
            scrollTrigger: {
                trigger: '.image-grid',
                start: 'top 80%', // Animation starts when the top of the grid is 80% down the viewport
            },
        });

        // Cleanup when the component unmounts
        return () => {
            smoother.kill();
        };
    }, { scope: main, dependencies: [pathname] });

    return (
        // This is the main container GSAP will scope to
        <div id="smooth-wrapper" ref={main}>
            <div id="smooth-content">
                <DroneScene />
                <main className="images">
                    <section className="image-grid container">
                        <picture className="image_cont">
                            <source
                                srcSet="https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNTU3OA&ixlib=rb-1.2.1&q=85&w=1500"
                                media="(min-width: 1500px)"
                            />
                            <source
                                srcSet="https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNTU3OA&ixlib=rb-1.2.1&q=85&w=1000"
                                media="(min-width: 700px)"
                            />
                            <img
                                data-speed="0.9" // Values other than 'auto' give you more control
                                className=""
                                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNTU3OA&ixlib=rb-1.2.1&q=85&w=600"
                                alt="A beautiful landscape"
                            />
                        </picture>


                        <div className="image_cont">
                            <img
                                data-speed="1.05"
                                src="https://images.unsplash.com/photo-1569596082827-c5e8990496cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNDg3NQ&ixlib=rb-1.2.1&q=80&w=500"
                                alt="A rocky shore"
                            />
                        </div>


                        <div className="image_cont">
                            <img
                                data-speed="auto"
                                src="https://images.unsplash.com/photo-1587932775991-708a20af2cc2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNDQ5Mg&ixlib=rb-1.2.1&q=80&w=500"
                                alt="A person on a boat"
                            />
                        </div>


                        <div className="image_cont">
                            <img
                                data-speed="0.95"
                                src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NDMzNTU3OA&ixlib=rb-1.2.1&q=85&w=1200"
                                alt="A winding road"
                            />
                        </div>
                        {/* ... other images ... */}
                    </section>
                    <div className="spacer" style={{ height: '50vh' }}></div>
                </main>
            </div>
        </div>

    );
}