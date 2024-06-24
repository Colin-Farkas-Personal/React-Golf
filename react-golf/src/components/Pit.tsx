import React, { useRef } from "react";
import { useAddGameObject } from "../hooks/useAddGameObject";
import "../styles/pit.scss";
import BoxCollider from "./BoxCollider";

interface PitProps extends GameObject {
  children?: React.ReactNode;
}
function Pit({ x, y, size, children }: PitProps) {
  const pitRef = useRef(null);
  useAddGameObject("PIT", pitRef);

  const pitStyle = {
    left: x + "%",
    top: y + "%",
    width: size,
    height: size,
  };

  return (
    <div ref={pitRef} style={pitStyle} className="pit pit-outer">
      <BoxCollider />
      <div className="pit-inner">{children}</div>
    </div>
  );
}

export default Pit;
