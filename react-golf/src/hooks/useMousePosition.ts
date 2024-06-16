import { useState } from "react";
import { getPowerDistance } from "../logic/power";

export function useMousePosition(maxDistanceX: number, maxDistanceY: number) {
  const [mousePositionOrigin, setMousePositionOrigin] = useState<
    [number, number]
  >([0, 0]);
  const [mousePositionCurrentValue, setMousePositionCurrentValue] = useState<
    [number, number]
  >([0, 0]);

  function setMouseOrigin<T>(event: React.MouseEvent<T, MouseEvent>) {
    const originPosition: Velocity = [event.clientX, event.clientY];
    setMousePositionOrigin(originPosition);
  }

  function setMouseCurrentClamped<T>(event: React.MouseEvent<T, MouseEvent>) {
    // Mouse distance moved
    const distanceMovedX = event.clientX - mousePositionOrigin[0];
    const distanceMovedY = event.clientY - mousePositionOrigin[1];

    // Distance (px) moved to MAX_DISTANCE
    const powerDistanceX = getPowerDistance(distanceMovedX, maxDistanceX);
    const powerDistanceY = getPowerDistance(distanceMovedY, maxDistanceY);
    const currentPositionClamped: Velocity = [powerDistanceX, powerDistanceY];

    setMousePositionCurrentValue(currentPositionClamped);
  }

  function resetMousePosition() {
    setMousePositionOrigin([0, 0]);
    setMousePositionCurrentValue([0, 0]);
  }

  return {
    setMouseOrigin,
    setMouseCurrentClamped,
    mousePositionCurrentValue,
    resetMousePosition,
  };
}
