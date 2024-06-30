import { useState, useCallback } from "react";
import { useGameContext } from "../contexts/GameStateContext";
import { movePlayerBall } from "../logic/shotMovement";
import { usePlayerBallContext } from "../contexts/PlayerBallContext";
import { useGameObjectsContext } from "../contexts/GameObjectsContext";

export function useBallMovement(ballSpeed: number) {
  const [isBallMoving, setIsBallMoving] = useState(false);
  const { setIsBallInHole } = useGameContext();
  const { playerBallRef, setVelocity, setIsMoving } = usePlayerBallContext();
  const { objects } = useGameObjectsContext();

  const movePlayer = (
    mousePositionCurrentValue: Velocity,
    powerProcentValue: number
  ) => {
    if (!isBallMoving) {
      const direction = [
        -mousePositionCurrentValue[0],
        -mousePositionCurrentValue[1],
      ] as Velocity;
      const speed = (ballSpeed * powerProcentValue) / 100;

      setIsBallMoving(true);
      setIsMoving(true);
      movePlayerBall(
        direction,
        speed,
        playerBallRef.current as HTMLElement,
        objects,
        setIsBallInHole,
        () => {
          setIsBallMoving(false);
          setIsMoving(false);
        },
        (currentVelocity) => {
          setVelocity(currentVelocity);
        }
      );
    }
  };

  return {
    movePlayer,
    isBallMoving,
  };
}
