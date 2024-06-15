export function getPowerProcent(distance: number, maxDistance: number) {
  const clampedDistance = Math.max(
    Math.min(distance, maxDistance),
    -maxDistance
  );

  // I want the result with max 2 decimals
  return Math.abs(Number((clampedDistance / maxDistance).toFixed(2)));
}

export function getPowerPosition(distance: number, maxDistance: number) {
  const clampedDistance = Math.max(
    Math.min(distance, maxDistance),
    -maxDistance
  );

  const procent = clampedDistance / maxDistance;

  return procent;
}

export function getPowerDistance(distance: number, maxDistance: number) {
  const clampedDistance = Math.max(
    Math.min(distance, maxDistance),
    -maxDistance
  );

  // Add a small constant to avoid exact zero
  const adjustedDistance = clampedDistance === 0 ? 1 : clampedDistance;

  return adjustedDistance;
}

export function tiltElement(
  element: HTMLElement,
  procents: Velocity,
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
