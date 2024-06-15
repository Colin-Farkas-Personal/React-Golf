import { usePlayerBallContext } from "../contexts/PlayerBallContext";
import "../styles/power.scss";

interface PowerProps {
  power: number;
}
function Power({ power }: PowerProps) {
  const { isMoving } = usePlayerBallContext();

  return <h1 className={`power ${isMoving && "power-disabled"}`}>{power}%</h1>;
}

export default Power;
