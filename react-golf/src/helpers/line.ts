export type Line = {
  a: Point;
  b: Point;
};

function createLine(pointElementA: DOMRect, pointElementB: DOMRect) {
  // Create Point and Line
  const pointA = { x: pointElementA.left, y: pointElementA.top } as Point;
  const pointB = { x: pointElementB.left, y: pointElementB.top } as Point;
  const line = { a: pointA, b: pointB } as Line;

  return line;
}

export function getLines(element: HTMLElement) {
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
  const lineA = createLine(pointElementA, pointElementB);
  const lineB = createLine(pointElementB, pointElementC);
  const lineC = createLine(pointElementC, pointElementD);
  const lineD = createLine(pointElementD, pointElementA);

  const lines = [lineA, lineB, lineC, lineD];

  return lines;
}
