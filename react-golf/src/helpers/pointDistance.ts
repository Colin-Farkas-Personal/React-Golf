export function getPointDistance(pointA: Point, pointB: Point) {
  const distanceX = pointA.x - pointB.x;
  const distanceY = pointA.y - pointB.y;
  const lenght = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  return lenght;
}
