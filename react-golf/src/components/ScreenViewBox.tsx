import React, { ReactNode, useRef, useState } from "react";
import "../styles/screen-view-box.scss";
import { movePlayerBall, stopPlayerBall } from "./logic/movement";
import { getTiltProcent, resetTilt, tiltElement } from "./logic/tilt";
import { calculateElementShadow, removeElementShadow } from "./logic/shadow";

// Distance that mouse needs travel for max tilt
const MAX_DISTANCE_X = 60;
const MAX_DISTANCE_Y = 60;

interface ScreenViewBox {
  maxCourseTilt: number;
  children: ReactNode;
}
function ScreenViewBox({ maxCourseTilt, children }: ScreenViewBox) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mousePositionStart, setMousePositionStart] = useState<number[]>([]);
  const screenViewRef = useRef<null | HTMLDivElement>(null);

  function startTilt(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setIsMouseDown(true);

    // Course active
    const courseGroundElement =
      screenViewRef.current?.querySelector(".course-ground");
    courseGroundElement?.classList.add("course-tilt-active");

    // Mouse Position ORIGIN
    const mousePositionStart = [e.clientX, e.clientY];
    setMousePositionStart(mousePositionStart);

    // TEST ANIMATION
    // const playerBallElement = screenViewRef.current?.querySelector(
    //   ".player-ball"
    // ) as HTMLElement;
    // movePlayerBallTest(playerBallElement);
  }

  async function moveTilt(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (isMouseDown) {
      // Mouse distance moved
      const distanceX = e.clientX - mousePositionStart[0];
      const distanceY = e.clientY - mousePositionStart[1];

      // Max distance
      const procentX = getTiltProcent(distanceX, MAX_DISTANCE_X);
      const procentY = getTiltProcent(distanceY, MAX_DISTANCE_Y);

      const courseGroundElement = screenViewRef.current?.querySelector(
        ".course-ground"
      ) as HTMLElement;
      const playerBallElement = screenViewRef.current?.querySelector(
        ".player-ball"
      ) as HTMLElement;

      // Tilt course
      tiltElement(courseGroundElement, [procentX, procentY], maxCourseTilt);

      // Move shadow
      calculateElementShadow(
        courseGroundElement,
        [procentX, procentY],
        "small"
      );
      calculateElementShadow(playerBallElement, [procentX, procentY], "big");

      // Move player ball
      await movePlayerBall(playerBallElement, [procentX, procentY], 2);
    }
  }
  function stopTilt() {
    const courseGroundElement = screenViewRef.current?.querySelector(
      ".course-ground"
    ) as HTMLElement;
    const playerBallElement = screenViewRef.current?.querySelector(
      ".player-ball"
    ) as HTMLElement;

    // Reset tilt
    resetTilt(courseGroundElement);

    // Remove shadow
    removeElementShadow(courseGroundElement);
    removeElementShadow(playerBallElement);

    // Stop player ball
    stopPlayerBall();

    // Remove class active
    courseGroundElement.classList.remove("course-tilt-active");
    setIsMouseDown(false);
  }

  return (
    <div
      ref={screenViewRef}
      className="screen-view-box"
      onMouseDown={startTilt}
      onMouseMove={moveTilt}
      onMouseUp={stopTilt}
    >
      {children}
    </div>
  );
}

export default ScreenViewBox;
