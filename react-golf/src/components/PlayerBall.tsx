import { useCallback, useEffect, useRef, useState } from "react";
import { useGameContext } from "../contexts/GameStateContext";
import { usePlayerBallContext } from "../contexts/PlayerBallContext";
import "../styles/player-ball.scss";
import BoxCollider from "./BoxCollider";

const STARTING_POSITION_X_DEFAULT = 20;
const STARTING_POSITION_Y = "50%";
const NO_MOVEMENT = 0;

interface PlayerBallProps {
  startingPositionX?: number;
}

function PlayerBall({
  startingPositionX = STARTING_POSITION_X_DEFAULT,
}: PlayerBallProps) {
  const { isBallInHole } = useGameContext();
  const positionOriginRef = useRef([
    `${startingPositionX}%`,
    STARTING_POSITION_Y,
  ] as Position);
  const [position, setPosition] = useState<Position>(positionOriginRef.current);
  const [transform, setTransform] = useState<Velocity>([0, 0] as Velocity);
  const { playerBallRef, velocity, powerPosition } = usePlayerBallContext();

  if (!playerBallRef) {
    return null;
  }

  const updatePosition = useCallback(() => {
    if (velocity[0] !== NO_MOVEMENT && velocity[1] !== NO_MOVEMENT) {
      const ball = playerBallRef.current;
      if (ball) {
        const currentLeft = parseFloat(getComputedStyle(ball).left);
        const currentTop = parseFloat(getComputedStyle(ball).top);

        setPosition([
          `${currentLeft + velocity[0]}px`,
          `${currentTop + velocity[1]}px`,
        ]);

        setTransform([0, 0]);
      }
    }
  }, [velocity]);

  useEffect(() => {
    if (!isBallInHole) {
      updatePosition();
    }
  }, [isBallInHole, updatePosition]);

  useEffect(() => {
    if (powerPosition[0] !== 0 || powerPosition[1] !== 0) {
      const ball = playerBallRef.current;

      if (ball) {
        const translateX = powerPosition[0] * 100;
        const translateY = powerPosition[1] * 100;
        setTransform([translateX, translateY]);
      }
    }
  }, [powerPosition]);

  if (isBallInHole) {
    return null;
  }

  return (
    <>
      <span
        ref={playerBallRef}
        className="player-ball"
        style={{
          left: position[0],
          top: position[1],
          transform: `translate(${transform[0]}%, ${transform[1]}%)`,
        }}
      >
        <BoxCollider />
      </span>
      <span
        className="player-ball-mark"
        style={{
          left: positionOriginRef.current[0],
          top: positionOriginRef.current[1],
        }}
      />
    </>
  );
}

export default PlayerBall;
