import "../styles/course-ground.scss";
import Stars from "../assets/stars.svg?react";
import { useGameContext } from "../contexts/GameStateContext";
import BoxCollider from "./BoxCollider";
import { useGameObjectsContext } from "../contexts/GameObjectsContext";

interface CourseGround {
  size: "small" | "medium" | "big";
  children: React.ReactNode;
}

function CourseGround({ size, children }: CourseGround) {
  const { isBallInHole } = useGameContext();
  const { objects } = useGameObjectsContext();
  const courseGroundRef = objects.courseGround
    .refObject as React.RefObject<HTMLDivElement>;
  const finishFlagRef = objects.finishFlag
    .refObject as React.RefObject<HTMLSpanElement>;

  return (
    <div
      ref={courseGroundRef}
      className={`course-ground course-${size} ${
        isBallInHole && "success-animation"
      }`}
    >
      <BoxCollider />
      {children}
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
    </div>
  );
}

export default CourseGround;
