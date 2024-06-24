import { useRef } from "react";
import BoxCollider from "./BoxCollider";
import "../styles/sand-trap.scss";
import { useAddGameObject } from "../hooks/useAddGameObject";

interface SandTrapProps extends GameObject {}
function SandTrap({ x, y, size, rotate }: SandTrapProps) {
  const sandTrapRef = useRef(null);
  useAddGameObject("SAND_TRAP", sandTrapRef);

  const sandTrapStyle = {
    left: x + "%",
    top: y + "%",
    width: size,
    height: size,
    transform: `rotate(${rotate ?? 0}deg)`,
  };

  return (
    <div ref={sandTrapRef} className="sand-trap" style={sandTrapStyle}>
      <BoxCollider />
    </div>
  );
}

export default SandTrap;
