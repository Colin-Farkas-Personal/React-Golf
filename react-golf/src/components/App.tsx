import "../styles/general.scss";
import { GameStateProvider } from "../contexts/GameStateContext";
import { PlayerBallProvider } from "../contexts/PlayerBallContext";
import { GameObjectsProvider } from "../contexts/GameObjectsContext";

import Root from "../routes/root";

function App() {
  return (
    <GameStateProvider>
      <GameObjectsProvider>
        <PlayerBallProvider>
          <Root />
        </PlayerBallProvider>
      </GameObjectsProvider>
    </GameStateProvider>
  );
}

export default App;
