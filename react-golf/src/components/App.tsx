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
import WaterTrap from "./WaterTrap";

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
              <Pit x={15} y={25} size={80}>
                <FinishFlag />
              </Pit>
              <Mound size={80} x={15} y={75}>
                <FinishFlag />
              </Mound>
              <WaterTrap x={40} y={25} size={80} />
              <SandTrap x={40} y={75} size={80} />
              <Stone x={65} y={50} size={80} rotate={45} />
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
