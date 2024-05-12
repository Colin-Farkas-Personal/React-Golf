import { useGameContext } from "../contexts/gameStateContext";
import "../styles/player-ball.scss";

function PlayerBall() {
  const { isBallInHole } = useGameContext();

  if (isBallInHole) {
    return null;
  }

  return <span className="player-ball" />;
}

export default PlayerBall;
