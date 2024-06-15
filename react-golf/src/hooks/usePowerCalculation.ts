import { useState } from "react";
import { getPowerProcent, getPowerPosition } from "../logic/power";
import { usePlayerBallContext } from "../contexts/PlayerBallContext";

export function usePowerCalculation(
  maxDistanceX: number,
  maxDistanceY: number
) {
  const { setPowerPosition } = usePlayerBallContext();
  const [powerProcentValue, setPowerProcentValue] = useState(0);

  function setPowerProcent(distance: Velocity) {
    // Max distance
    const [distanceX, distanceY] = distance;
    const procentX = getPowerProcent(distanceX, maxDistanceX);
    const procentY = getPowerProcent(distanceY, maxDistanceY);

    const powerPositionX = getPowerPosition(distanceX, maxDistanceX);
    const powerPositionY = getPowerPosition(distanceY, maxDistanceY);
    setPowerPosition([powerPositionX, powerPositionY]);

    // Get current procent number
    const procent = Number(Math.trunc(Math.max(procentX, procentY) * 100));
    setPowerProcentValue(procent);
  }

  return {
    setPowerProcent,
    powerProcentValue,
  };
}
