import { useCallback, useState } from "react";
import { useBallMovement } from "./useBallMovement";
import { useMousePosition } from "./useMousePosition";
import { usePowerCalculation } from "./usePowerCalculation";

export function useMouseDrag({
  maxDistanceX,
  maxDistanceY,
  maxBallSpeed,
}: {
  maxDistanceX: number;
  maxDistanceY: number;
  maxBallSpeed: number;
}) {
  // Hooks
  const {
    setMouseOrigin,
    setMouseCurrentClamped,
    mousePositionCurrentValue,
    resetMousePosition,
  } = useMousePosition(maxDistanceX, maxDistanceY);

  const { setPowerProcent, powerProcentValue } = usePowerCalculation(
    maxDistanceX,
    maxDistanceY
  );

  const { movePlayer, isBallMoving } = useBallMovement(maxBallSpeed);

  const [isMouseDown, setIsMouseDown] = useState(false);

  // Methods
  function startDrag(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    setIsMouseDown(true);
    setMouseOrigin(e);
  }

  const continueDrag = useCallback(
    function (e: React.MouseEvent<HTMLElement, MouseEvent>) {
      if (isMouseDown && !isBallMoving) {
        setMouseCurrentClamped(e);
        setPowerProcent(mousePositionCurrentValue);
      }
    },
    [isMouseDown, mousePositionCurrentValue]
  );

  const endDrag = useCallback(
    function () {
      movePlayer(mousePositionCurrentValue, powerProcentValue);

      setIsMouseDown(false);
      resetMousePosition();
      setPowerProcent([0, 0]);
    },
    [mousePositionCurrentValue, powerProcentValue]
  );

  return {
    powerProcentValue,
    startDrag,
    continueDrag,
    endDrag,
  };
}
