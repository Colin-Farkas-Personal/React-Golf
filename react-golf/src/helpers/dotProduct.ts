export function calculateDotProduct(
  pointA: Point,
  pointB: Point,
  circle: Point,
  lenght: number
) {
  const dot =
    ((circle.x - pointA.x) * (pointB.x - pointA.x) +
      (circle.y - pointA.y) * (pointB.y - pointA.y)) /
    Math.pow(lenght, 2);

  return dot;
}
