import "../styles/stone.scss";
import BoxCollider from "./BoxCollider";
import { useRef } from "react";
import { useAddGameObject } from "../hooks/useAddGameObject";

interface StoneProps extends GameObject {}
function Stone({ x = 50, y, size = 50, rotate }: StoneProps) {
  const stoneRef = useRef(null);
  useAddGameObject("STONE", stoneRef);

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
