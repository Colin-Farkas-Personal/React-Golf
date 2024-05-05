import React, { ReactNode, useRef, useState } from "react";
import "../styles/screen-view-box.scss";
import { cancelBallMove, handleBallMovement } from "./logic/movement";

interface ScreenViewBox {
  children: ReactNode;
}
function ScreenViewBox({ children }: ScreenViewBox) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mousePositionStart, setMousePositionStart] = useState<number[]>([]);
  const screenViewRef = useRef<null | HTMLDivElement>(null);

  function startTilt(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const courseGroundElement =
      screenViewRef.current?.querySelector(".course-ground");
    courseGroundElement?.classList.add("course-tilt-active");

    const mouseOutlineElement = screenViewRef.current?.querySelector(
      ".mouse-outline"
    ) as HTMLElement;
    const widthSelf = getComputedStyle(mouseOutlineElement).width;
    const heightSelf = getComputedStyle(mouseOutlineElement).height;
    mouseOutlineElement.style.visibility = "visible";
    mouseOutlineElement.style.left =
      e.clientX - parseInt(widthSelf) * 0.5 + "px";
    mouseOutlineElement.style.top =
      e.clientY - parseInt(heightSelf) * 0.5 + "px";

    setIsMouseDown(true);

    const mousePositionStart = [e.clientX, e.clientY];
    setMousePositionStart(mousePositionStart);
  }

  function moveTilt(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (isMouseDown) {
      const currentPos = [e.clientX, e.clientY];
      const distanceX = currentPos[0] - mousePositionStart[0];
      const distanceY = currentPos[1] - mousePositionStart[1];

      const MAX_DEG_X = 40;
      let degX = Math.max(Math.min(distanceX, MAX_DEG_X), -MAX_DEG_X) * -1;
      const MAX_DEG_Y = 40;
      let degY = Math.max(Math.min(distanceY, MAX_DEG_Y), -MAX_DEG_Y) * -1;

      const courseGroundElement = screenViewRef.current?.querySelector(
        ".course-ground"
      ) as HTMLAnchorElement;

      courseGroundElement.style.transform = `rotateX(${degY}deg) rotateY(${
        degX * -1
      }deg)`;
      courseGroundElement.style.boxShadow = `${degX}px ${degY}px 20px 0px #595c5c46`;

      const playerBallElement =
        screenViewRef.current?.getElementsByClassName("player-ball")[0];

      if (playerBallElement) {
        const procentX =
          Math.max(Math.min(distanceX, MAX_DEG_X), -MAX_DEG_X) / MAX_DEG_X;
        const procentY =
          Math.max(Math.min(distanceY, MAX_DEG_Y), -MAX_DEG_Y) / MAX_DEG_Y;
        handleBallMovement(playerBallElement, [procentX, procentY]);
      }
    }
  }
  function stopTilt() {
    const courseGroundElement =
      screenViewRef.current?.querySelector(".course-ground");
    courseGroundElement?.classList.remove("course-tilt-active");

    setIsMouseDown(false);
    cancelBallMove();

    if (courseGroundElement instanceof HTMLElement) {
      // Change the style properties as needed
      courseGroundElement.style.transform = "";
      courseGroundElement.style.boxShadow = "";
      courseGroundElement.style.scale = "";
    }

    const mouseOutlineElement = screenViewRef.current?.querySelector(
      ".mouse-outline"
    ) as HTMLElement;
    mouseOutlineElement.style.visibility = "hidden";
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
