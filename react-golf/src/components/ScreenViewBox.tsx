import React, { ReactNode, useEffect } from "react";
import "../styles/screen-view-box.scss";
import { useMouseDrag } from "../hooks/useMouseDrag";

// Distance that mouse needs travel for max tilt
const MAX_DISTANCE_X = 100;
const MAX_DISTANCE_Y = 100;
const MAX_BALL_SPEED = 5;

interface ScreenViewBox {
  currentPowerProcent: (power: number) => void;
  children: ReactNode;
}
function ScreenViewBox({ currentPowerProcent, children }: ScreenViewBox) {
  const config = {
    maxDistanceX: MAX_DISTANCE_X,
    maxDistanceY: MAX_DISTANCE_Y,
    maxBallSpeed: MAX_BALL_SPEED,
  };
  const { powerProcentValue, startDrag, continueDrag, endDrag } =
    useMouseDrag(config);

  useEffect(() => {
    currentPowerProcent(powerProcentValue);
  }, [powerProcentValue]);

  function activateShot(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    startDrag(e);
  }

  function dragShot(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // Stop if ball is in hole
    continueDrag(e);
  }

  function releaseShot() {
    endDrag();
  }

  return (
    <div
      className="screen-view-box"
      onMouseDown={activateShot}
      onMouseMove={dragShot}
      onMouseUp={releaseShot}
    >
      {children}
    </div>
  );
}

export default ScreenViewBox;
