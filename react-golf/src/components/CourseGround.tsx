import "../styles/course-ground.scss";
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

  return (
    <div
      ref={courseGroundRef}
      className={`course-ground course-${size} ${
        isBallInHole && "success-animation"
      }`}
    >
      <BoxCollider />
      {children}
    </div>
  );
}

export default CourseGround;
