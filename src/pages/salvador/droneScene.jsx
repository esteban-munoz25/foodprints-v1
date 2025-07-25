import Spline from '@splinetool/react-spline';

export default function DroneScene () {
    return (
        <div className="absolute w-[90vw] max-w-[500px] h-[100vh] left-1/2 top-0 -translate-x-1/2 overflow-hidden lg:right-[25%]">
            <Spline 
                scene="https://prod.spline.design/tpMdwF7ADsa4fDhz/scene.splinecode" 
                style={{ width: '100%', height: '100%' }} 
            />
        </div>
    );
}
