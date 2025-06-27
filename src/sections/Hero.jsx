import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText.jsx";
import ParallaxBackground from "../components/ParallaxBackground.jsx";
import { Astronaut } from "../components/Astronaut.jsx";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense } from "react";
import Loader from "../components/Loader.jsx";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const isTablet = useMediaQuery({ minWidth: 854, maxWidth: 1024 });

  const getAstronautScale = () => {
    if (isMobile) return 0.25;
    if (isTablet) return 0.35;
    return 0.5;
  };

  const getAstronautPosition = () => {
    if (isMobile) return [0, -1.5, 0];
    if (isTablet) return [1, -1, 0];
    return [2, -1, 0];
  };

  return (
    <section className=" relative flex flex-col md:flex-row items-center justify-center md:justify-start min-h-screen overflow-hidden c-space ">
      <div className="z-10">
        <HeroText />
      </div>
      <ParallaxBackground />
      <figure
        className="absolute inset-0 w-full h-full  rounded-lg overflow-hidden "
        style={{ zIndex: 1 }}
      >
        <Canvas camera={{ position: [0, 1, 3] }}>
          <Suspense fallback={<Loader />}>
            <Float>
              <Astronaut
                scale={getAstronautScale()}
                position={getAstronautPosition()}
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}

export default Hero;
