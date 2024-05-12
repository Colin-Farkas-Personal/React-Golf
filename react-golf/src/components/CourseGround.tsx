import "../styles/course-ground.scss";
import Stars from "../assets/stars.svg?react";
import { useGameContext } from "../contexts/gameStateContext";

interface CourseGround {
  size: "small" | "medium" | "big";
  children: React.ReactNode;
}
function CourseGround({ size, children }: CourseGround) {
  const { isBallInHole } = useGameContext();

  return (
    <div
      className={`course-ground course-${size} ${
        isBallInHole && "success-animation"
      }`}
    >
      <span className="course-corner course-corner-tl" />
      <span className="course-corner course-corner-tr" />
      <span className="course-corner course-corner-bl" />
      <span className="course-corner course-corner-br" />
      {children}
      <div className="course-flag">
        <span id="course-flag-hole" className="course-flag-hole" />
        <Stars className={`stars ${isBallInHole && "stars-visible"}`} />
      </div>
    </div>
  );
}

export default CourseGround;
