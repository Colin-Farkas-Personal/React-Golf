import React, { ReactNode, useRef, useState } from "react";
import "../styles/screen-view-box.scss";

interface ScreenViewBox {
  children: ReactNode;
}
function ScreenViewBox({ children }: ScreenViewBox) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mousePositionStart, setMousePositionStart] = useState<number[]>([]);
  const screenViewRef = useRef<null | HTMLDivElement>(null);

  function startTilt(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const courseGroundElement =
      screenViewRef.current?.getElementsByClassName("course-ground")[0];
    courseGroundElement?.classList.add("course-tilt-active");

    setIsMouseDown(true);

    const mousePositionStart = [e.clientX, e.clientY];
    setMousePositionStart(mousePositionStart);
  }

  function moveTilt(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (isMouseDown) {
      const currentPos = [e.clientX, e.clientY];
      const distanceX = currentPos[0] - mousePositionStart[0];
      const distanceY = currentPos[1] - mousePositionStart[1];

      console.log("X: ", distanceX, "Y: ", distanceY);
      const courseGroundElement =
        screenViewRef.current?.querySelector(".course-ground");

      if (courseGroundElement instanceof HTMLElement) {
        const MAX_DEG_X = 50;
        let degX = Math.max(Math.min(distanceX, MAX_DEG_X), -MAX_DEG_X) * -1;
        const MAX_DEG_Y = 50;
        let degY = Math.max(Math.min(distanceY, MAX_DEG_Y), -MAX_DEG_Y) * -1;

        courseGroundElement.style.transform = `rotateX(${degY}deg) rotateY(${
          degX * -1
        }deg)`;
        courseGroundElement.style.boxShadow = `${degX}px ${degY}px 20px 0px #595c5c46`;
      }
    }
  }
  function stopTilt() {
    const courseGroundElement =
      screenViewRef.current?.querySelector(".course-ground");
    courseGroundElement?.classList.remove("course-tilt-active");

    setIsMouseDown(false);

    if (courseGroundElement instanceof HTMLElement) {
      // Change the style properties as needed
      courseGroundElement.style.transform = `rotateX(0deg) rotateY(0deg)`;
      courseGroundElement.style.boxShadow = ``;
    }
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
