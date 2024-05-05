import CourseGround from "./CourseGround";
import "../styles/general.scss";
import PlayerBall from "./PlayerBall";
import ScreenViewBox from "./ScreenViewBox";
import MouseOutline from "./MouseOutline";

function App() {
  return (
    <ScreenViewBox>
      <MouseOutline />
      <CourseGround size="small">
        <PlayerBall />
      </CourseGround>
    </ScreenViewBox>
  );
}

export default App;
