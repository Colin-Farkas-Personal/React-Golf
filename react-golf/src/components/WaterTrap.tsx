import { useEffect, useRef } from "react";
import BoxCollider from "./BoxCollider";
import { useGameObjectsContext } from "../contexts/GameObjectsContext";
import "../styles/water-trap.scss";

interface SandTrapProps {
  x: number;
  y: number;
  size: number;
  rotate?: number;
}
function WaterTrap({ x, y, size, rotate }: SandTrapProps) {
  const waterTrapRef = useRef(null);
  const { addObject } = useGameObjectsContext();
  useEffect(() => {
    addObject("WATER_TRAP", waterTrapRef);

    return () => {
      // remove Object
    };
  }, []);

  const waterTrapStyle = {
    left: x + "%",
    top: y + "%",
    width: size,
    height: size,
    transform: `rotate(${rotate ?? 0}deg)`,
  };

  return (
    <div ref={waterTrapRef} className="water-trap" style={waterTrapStyle}>
      <BoxCollider />
    </div>
  );
}

export default WaterTrap;
