import "../styles/stone.scss";
import BoxCollider from "./BoxCollider";
import { useGameObjectsContext } from "../contexts/GameObjectsContext";
import { useEffect, useRef } from "react";

interface StoneProps {
  x: number;
  y: number;
  size: number;
  rotate?: number;
}

function Stone({ x, y, size, rotate }: StoneProps) {
  const stoneRef = useRef(null);
  const { addObject } = useGameObjectsContext();

  useEffect(() => {
    addObject("STONE", stoneRef);
  }, []);

  const stoneStyle = {
    left: x + "%",
    top: y + "%",
    width: size,
    height: size,
    transform: `rotate(${rotate ?? 0}deg)`,
  };

  return (
    <div ref={stoneRef} className="stone" style={stoneStyle}>
      <BoxCollider />
    </div>
  );
}

export default Stone;
