import CourseGround from "./CourseGround";
import "../styles/general.scss";
import PlayerBall from "./PlayerBall";
import ScreenViewBox from "./ScreenViewBox";
import { GameStateProvider } from "../contexts/GameStateContext";
import { useState } from "react";
import { PlayerBallProvider } from "../contexts/PlayerBallContext";
import Stone from "./Stone";
import Power from "./Power";
import { GameObjectsProvider } from "../contexts/GameObjectsContext";

function App() {
  const [powerProcent, setPowerProcent] = useState(0);

  // let titleText =
  //   "<outline>Hold down</outline> the mouse button and <outline>move the mouse</outline> to tilt the course";
  // if (isHeldDown) {
  //   titleText = "<outline>Move the mouse</outline> to tilt the course";
  // }

  return (
    <GameStateProvider>
      <GameObjectsProvider>
        <PlayerBallProvider>
          <ScreenViewBox
            currentPowerProcent={(power: number) => setPowerProcent(power)}
          >
            {/* <MouseOutline /> */}
            <CourseGround size="small">
              <Stone x={50} y={50} rotate={-50} size={80} />
              <PlayerBall startingPositionX={10} />
            </CourseGround>
            <Power power={powerProcent} />
          </ScreenViewBox>
        </PlayerBallProvider>
      </GameObjectsProvider>
    </GameStateProvider>
  );
}

export default App;
