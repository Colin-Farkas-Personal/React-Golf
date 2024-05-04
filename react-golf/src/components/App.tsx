import CourseGround from "./CourseGround";
import "../styles/general.scss";
import PlayerBall from "./PlayerBall";
function App() {
  return (
    <div>
      <CourseGround size="small">
        <PlayerBall />
      </CourseGround>
    </div>
  );
}

export default App;
