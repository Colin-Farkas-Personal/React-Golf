import "../styles/course-ground.scss";
import { useGameContext } from "../contexts/GameStateContext";
import BoxCollider from "./BoxCollider";
import { useEffect, useRef, useState } from "react";
import { useAddGameObject } from "../hooks/useAddGameObject";
import { useLocation, useNavigate } from "react-router-dom";

interface CourseGround {
  size: "small" | "medium" | "big";
  children: React.ReactNode;
}

function CourseGround({ size, children }: CourseGround) {
  const [isAnimateIn, setIsAnimateIn] = useState(false);
  const { isBallInHole, setIsBallInHole } = useGameContext();
  const courseGroundRef = useRef(null);
  useAddGameObject("COURSE_GROUND", courseGroundRef);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsBallInHole(false);
    setIsAnimateIn(true);
  }, []);

  function nextLevel(animationName: string) {
    if (animationName === "moveOutLeft") {
      let currentPath = location.pathname;
      const levelNumberPath = currentPath.split("/").pop();

      let nextLevel;

      if (!levelNumberPath) {
        nextLevel = 1;
      } else {
        nextLevel = Number(levelNumberPath) + 1;
      }

      const navigateRoute = `/level/${nextLevel}`;
      navigate(navigateRoute);
    }
  }

  const classNames = `course-ground course-${size} ${
    isBallInHole && "success-animation"
  } ${isAnimateIn && !isBallInHole && "next-level-animation"}`;

  return (
    <div
      ref={courseGroundRef}
      className={classNames}
      onAnimationEnd={(event) => nextLevel(event.animationName)}
    >
      <BoxCollider />
      {children}
    </div>
  );
}

export default CourseGround;
