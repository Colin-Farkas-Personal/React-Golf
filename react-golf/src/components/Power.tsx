import { useGameContext } from "../contexts/GameStateContext";
import { usePlayerBallContext } from "../contexts/PlayerBallContext";
import "../styles/power.scss";

interface PowerProps {
  power: number;
}
function Power({ power }: PowerProps) {
  const { isMoving } = usePlayerBallContext();
  const { isBallInHole } = useGameContext();

  const disablePower = isMoving || isBallInHole;

  return (
    <h1 className={`power ${disablePower && "power-disabled"}`}>{power}%</h1>
  );
}

export default Power;
