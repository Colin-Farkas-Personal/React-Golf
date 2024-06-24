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
import Pit from "./Pit";
import SandTrap from "./SandTrap";
import WaterTrap from "./WaterTrap";
import FinishFlag from "./FinishFlag";
import Mound from "./Mound";

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
              <Stone size={45} />
              <Mound size={120} x={50} y={50}></Mound>
              <Pit size={130} x={90} y={50}>
                <FinishFlag />
              </Pit>
              <Stone size={45} x={90} y={100} />
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
