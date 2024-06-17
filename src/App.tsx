import { Canvas } from "@react-three/fiber";
import { Experience } from "@/components/Experience";
import { Sns } from "@/components/Sns";
import { MenuButton } from "@/components/MenuButton";
import { Loader } from "@react-three/drei";

const App = (): JSX.Element => {
  return (
    <>
      <Loader />
      <MenuButton />
      <Sns />
      <Canvas camera={{ position: [1, 1, 1] }}>
        <Experience />
      </Canvas>
    </>
  );
};

export default App;
