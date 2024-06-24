import React, { useRef } from "react";
import { useAddGameObject } from "../hooks/useAddGameObject";
import BoxCollider from "./BoxCollider";
import "../styles/mound.scss";

interface MoundProps extends GameObject {
  children?: React.ReactNode;
}
function Mound({ x, y, size, children }: MoundProps) {
  const moundRef = useRef(null);
  useAddGameObject("MOUND", moundRef);

  const moundStyle = {
    left: x + "%",
    top: y + "%",
    width: size,
    height: size,
  };

  return (
    <div ref={moundRef} style={moundStyle} className="mound mound-outer">
      <BoxCollider />
      <div className="mound-inner">{children}</div>
    </div>
  );
}

export default Mound;
