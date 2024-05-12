import React, { ReactNode, useRef, useState } from "react";
import "../styles/screen-view-box.scss";
import { movePlayerBall, stopPlayerBall } from "../logic/movement";
import { getTiltProcent, resetTilt, tiltElement } from "../logic/tilt";
import { calculateElementShadow, removeElementShadow } from "../logic/shadow";
import { useGameContext } from "../contexts/gameStateContext";

// Distance that mouse needs travel for max tilt
const MAX_DISTANCE_X = 60;
const MAX_DISTANCE_Y = 60;
const BALL_SPEED = 2;

interface ScreenViewBox {
  maxCourseTilt: number;
  children: ReactNode;
}
function ScreenViewBox({ maxCourseTilt, children }: ScreenViewBox) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mousePositionStart, setMousePositionStart] = useState<number[]>([]);
  const screenViewRef = useRef<null | HTMLDivElement>(null);
  const { isBallInHole, setIsBallInHole } = useGameContext();

  function startTilt(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // Course active
    const courseGroundElement =
      screenViewRef.current?.querySelector(".course-ground");

    if (isBallInHole) {
      courseGroundElement?.classList.remove("course-tilt-active");
      return;
    }

    setIsMouseDown(true);
    courseGroundElement?.classList.add("course-tilt-active");

    // Mouse Position ORIGIN
    const mousePositionStart = [e.clientX, e.clientY];
    setMousePositionStart(mousePositionStart);
  }

  async function moveTilt(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // Stop if ball is in hole
    if (isBallInHole) return;

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
      const titleElement = screenViewRef.current?.querySelector(".title");
      const illustrationElement =
        screenViewRef.current?.querySelector(".illustration");

      // Hide title and illustration
      titleElement?.remove();
      illustrationElement?.remove();

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
      await movePlayerBall(
        playerBallElement,
        [procentX, procentY],
        BALL_SPEED,
        setIsBallInHole
      );
    }
  }
  function stopTilt() {
    const courseGroundElement = screenViewRef.current?.querySelector(
      ".course-ground"
    ) as HTMLElement;

    // Reset tilt
    resetTilt(courseGroundElement);

    // Remove shadow
    removeElementShadow(courseGroundElement);

    // Remove class active
    courseGroundElement.classList.remove("course-tilt-active");
    setIsMouseDown(false);

    if (isBallInHole) return;

    // Stop player ball
    const playerBallElement = screenViewRef.current?.querySelector(
      ".player-ball"
    ) as HTMLElement;
    removeElementShadow(playerBallElement);

    stopPlayerBall();
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
