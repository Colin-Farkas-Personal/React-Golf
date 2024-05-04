import "../styles/course-ground.scss";

interface CourseGround {
  size: "small" | "medium" | "big";
  children: React.ReactNode;
}
function CourseGround({ size, children }: CourseGround) {
  return <div className={`course-ground course-${size}`}>{children}</div>;
}

export default CourseGround;
