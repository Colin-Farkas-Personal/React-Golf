import "../styles/course-ground.scss";
import FlagHole from "../assets/flag-goal.svg?react";

interface CourseGround {
  size: "small" | "medium" | "big";
  children: React.ReactNode;
}
function CourseGround({ size, children }: CourseGround) {
  return (
    <div className={`course-ground course-${size}`}>
      <span className="course-corner course-corner-tl" />
      <span className="course-corner course-corner-tr" />
      <span className="course-corner course-corner-bl" />
      <span className="course-corner course-corner-br" />
      {children}
      <FlagHole className="course-flag-hole" />
    </div>
  );
}

export default CourseGround;
