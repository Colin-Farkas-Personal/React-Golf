import "../styles/course-ground.scss";
import FlagHole from "../assets/flag-goal.svg?react";

interface CourseGround {
  size: "small" | "medium" | "big";
  children: React.ReactNode;
}
function CourseGround({ size, children }: CourseGround) {
  return (
    <div className={`course-ground course-${size}`}>
      {children}
      <FlagHole className="course-flag-hole" />
    </div>
  );
}

export default CourseGround;
