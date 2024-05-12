import CourseGround from "./CourseGround";
import "../styles/general.scss";
import PlayerBall from "./PlayerBall";
import ScreenViewBox from "./ScreenViewBox";
import { GameStateProvider } from "../contexts/gameStateContext";
import Mouse from "../assets/Mouse.svg?react";
import Title from "./Title";
import Illustration from "./Illustration";

function App() {
  return (
    <GameStateProvider>
      <ScreenViewBox maxCourseTilt={40}>
        {/* <MouseOutline /> */}
        <Title text="<outline>Hold down</outline> the mouse button to tilt the course" />
        <CourseGround size="small">
          <PlayerBall />
        </CourseGround>
        <Illustration Element={Mouse} />
      </ScreenViewBox>
    </GameStateProvider>
  );
}

export default App;
