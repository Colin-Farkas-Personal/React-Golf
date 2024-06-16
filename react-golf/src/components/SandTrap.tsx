import { useEffect, useRef } from "react";
import BoxCollider from "./BoxCollider";
import { useGameObjectsContext } from "../contexts/GameObjectsContext";
import "../styles/sand-trap.scss";

interface SandTrapProps {
  x: number;
  y: number;
  size: number;
  rotate?: number;
}
function SandTrap({ x, y, size, rotate }: SandTrapProps) {
  const sandTrapRef = useRef(null);
  const { addObject } = useGameObjectsContext();
  useEffect(() => {
    addObject("SAND_TRAP", sandTrapRef);

    return () => {
      // remove Object
    };
  }, []);

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
