export function getPoints(element: HTMLElement) {
  // Point names are relative to unrotated object
  const pointElementA = element
    ?.getElementsByClassName("box-collider-point-bl")[0]
    .getBoundingClientRect();
  const pointElementB = element
    ?.getElementsByClassName("box-collider-point-tl")[0]
    .getBoundingClientRect();
  const pointElementC = element
    ?.getElementsByClassName("box-collider-point-tr")[0]
    .getBoundingClientRect();
  const pointElementD = element
    ?.getElementsByClassName("box-collider-point-br")[0]
    .getBoundingClientRect();

  // Create Point and Line
  const pointA = { x: pointElementA.left, y: pointElementA.top };
  const pointB = { x: pointElementB.left, y: pointElementB.top };
  const pointC = { x: pointElementC.left, y: pointElementC.top };
  const pointD = { x: pointElementD.left, y: pointElementD.top };

  const points = [pointA, pointB, pointC, pointD] as Point[];

  return points;
}
