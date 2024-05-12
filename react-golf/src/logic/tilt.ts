export function getTiltProcent(distance: number, maxDistance: number) {
  const clampedDistance = Math.max(
    Math.min(distance, maxDistance),
    -maxDistance
  );

  return clampedDistance / maxDistance;
}

export function tiltElement(
  element: HTMLElement,
  procents: [number, number],
  maxTilt: number
) {
  const [procentX, procentY] = procents;
  const degX = procentY * maxTilt;
  const degY = procentX * maxTilt;

  element.style.transform = `
    rotateX(${degX}deg) 
    rotateY(${degY * -1}deg)
    `;
}

export function resetTilt(element: HTMLElement) {
  element.style.transform = "";
}
