import { useRef } from "react";
import "../styles/finish-flag.scss";
import Stars from "../assets/stars.svg?react";
import { useAddGameObject } from "../hooks/useAddGameObject";
import BoxCollider from "./BoxCollider";

interface FinishFlagProps {
  x?: number;
  y?: number;
}
function FinishFlag({ x, y }: FinishFlagProps) {
  const finishFlagRef = useRef(null);
  useAddGameObject("FINISH_FLAG", finishFlagRef);

  const finishFlagStyle = {
    left: x + "%",
    top: y + "%",
  };

  return (
    <div className="course-flag" style={finishFlagStyle}>
      <span
        ref={finishFlagRef}
        id="course-flag-hole"
        className="course-flag-hole"
      >
        <BoxCollider />
      </span>
      <Stars className={`stars ${isBallInHole && "stars-visible"}`} />
    </div>
  );
}

export default FinishFlag;
