import CourseGround from "./CourseGround";
import "../styles/general.scss";
import PlayerBall from "./PlayerBall";
import ScreenViewBox from "./ScreenViewBox";

function App() {
  return (
    <ScreenViewBox>
      <CourseGround size="small">
        <PlayerBall />
      </CourseGround>
    </ScreenViewBox>
  );
}

export default App;
