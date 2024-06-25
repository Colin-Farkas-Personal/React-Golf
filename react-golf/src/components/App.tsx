import CourseGround from "./CourseGround";
import "../styles/general.scss";
import PlayerBall from "./PlayerBall";
import ScreenViewBox from "./ScreenViewBox";
import { GameStateProvider } from "../contexts/GameStateContext";
import { useState } from "react";
import { PlayerBallProvider } from "../contexts/PlayerBallContext";
import Power from "./Power";
import { GameObjectsProvider } from "../contexts/GameObjectsContext";
import Pit from "./Pit";
import SandTrap from "./SandTrap";
import FinishFlag from "./FinishFlag";
import Mound from "./Mound";
import Stone from "./Stone";

function App() {
  const [powerProcent, setPowerProcent] = useState(0);

  return (
    <GameStateProvider>
      <GameObjectsProvider>
        <PlayerBallProvider>
          <ScreenViewBox
            currentPowerProcent={(power: number) => setPowerProcent(power)}
          >
            {/* <MouseOutline /> */}
            <CourseGround size="small">
              <Mound size={100} x={20} y={50}>
                <SandTrap size={40} />
              </Mound>
              <Pit size={80} x={90} y={50}>
                <FinishFlag />
              </Pit>
              <Stone size={60} x={60} y={50} rotate={45} />

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
