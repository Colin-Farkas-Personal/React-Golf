import "../styles/course-ground.scss";
import Stars from "../assets/stars.svg?react";
import { useGameContext } from "../contexts/GameStateContext";
import BoxCollider from "./BoxCollider";
import { useGameObjectsContext } from "../contexts/GameObjectsContext";
import { useEffect, useRef } from "react";

interface CourseGround {
  size: "small" | "medium" | "big";
  children: React.ReactNode;
}

function CourseGround({ size, children }: CourseGround) {
  const { isBallInHole } = useGameContext();
  const courseGroundRef = useRef(null);
  const finishFlagRef = useRef(null);
  const { addObject } = useGameObjectsContext();

  useEffect(() => {
    addObject("COURSE_GROUND", courseGroundRef);
    addObject("FINISH_FLAG", finishFlagRef);
  }, []);

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
