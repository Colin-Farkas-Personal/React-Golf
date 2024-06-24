import { useRef } from "react";
import BoxCollider from "./BoxCollider";
import "../styles/water-trap.scss";
import { useAddGameObject } from "../hooks/useAddGameObject";

interface SandTrapProps extends GameObject {}
function WaterTrap({ x, y, size, rotate }: SandTrapProps) {
  const waterTrapRef = useRef(null);
  useAddGameObject("WATER_TRAP", waterTrapRef);

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
