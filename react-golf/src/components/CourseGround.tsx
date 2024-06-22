import "../styles/course-ground.scss";
import Stars from "../assets/stars.svg?react";
import { useGameContext } from "../contexts/GameStateContext";
import BoxCollider from "./BoxCollider";
import { useRef } from "react";
import { useAddGameObject } from "../hooks/useAddGameObject";

interface CourseGround {
  size: "small" | "medium" | "big";
  children: React.ReactNode;
}

function CourseGround({ size, children }: CourseGround) {
  const { isBallInHole } = useGameContext();
  const courseGroundRef = useRef(null);
  useAddGameObject("COURSE_GROUND", courseGroundRef);
  const finishFlagRef = useRef(null);
  useAddGameObject("FINISH_FLAG", finishFlagRef);

  return (
    <div
      ref={courseGroundRef}
      className={`course-ground course-${size} ${
        isBallInHole && "success-animation"
      }`}
    >
      <BoxCollider />
      <div className="course-flag">
        <span
          ref={finishFlagRef}
          id="course-flag-hole"
          className="course-flag-hole"
        >
          <BoxCollider />
        </span>
        <Stars className={`stars ${isBallInHole && "stars-visible"}`} />
      </div>
      {children}
    </div>
  );
}

export default CourseGround;
