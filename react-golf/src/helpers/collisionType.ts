import { Circle } from "./circle";
import { calculateDotProduct } from "./dotProduct";
import { Line } from "./line";
import { getPointDistance } from "./pointDistance";

// KUDOS to Jeffrey Thompson for the amazing documentatino - https://www.jeffreythompson.org/collision-detection/table_of_contents.php

// CIRCLE/POINT
export function isCircleInPoint(
  point: Point,
  circle: Point,
  radius: number
): boolean {
  // get distance between the point and circle's center
  // using the Pythagorean Theorem
  const distance = getPointDistance(point, circle);

  // if the distance is less than the circle's
  // radius the point is inside!
  if (distance <= radius) {
    return true;
  }
  return false;
}

export function isPointInLine(point: Point, line: Line): boolean {
  const lineLenght = getPointDistance(line.a, line.b);

  const pointEndA = getPointDistance(point, line.a);
  const pointEndB = getPointDistance(point, line.b);
  const buffer = 0.1; // higher # = less acurate collision

  if (
    pointEndA + pointEndB >= lineLenght - buffer &&
    pointEndA + pointEndB <= lineLenght + buffer
  ) {
    return true;
  }

  return false;
}

// CIRCLE/LINE
interface isCircleInLineReturn {
  end: boolean;
  line: boolean;
}
export function isCircleInLine(
  line: Line,
  circle: Circle
): isCircleInLineReturn {
  const isInsideA = isCircleInPoint(line.a, circle.point, circle.radius);
  const isInsideB = isCircleInPoint(line.b, circle.point, circle.radius);

  let isEnd = false;
  let isLine = false;

  if (isInsideA || isInsideB) {
    // COLLISION WITH END OF LINE
    isEnd = true;
  }

  const length = getPointDistance(line.a, line.b);
  const dot = calculateDotProduct(line.a, line.b, circle.point, length);

  const { a, b } = line;
  const closestX = a.x + dot * (b.x - a.x);
  const closestY = a.y + dot * (b.y - a.y);
  const closestPoint = { x: closestX, y: closestY } as Point;

  const isOnLine = isPointInLine(closestPoint, line);
  if (!isOnLine) {
    isLine = false;
  }

  const circleDistance = getPointDistance(closestPoint, circle.point);

  if (isOnLine && circleDistance <= circle.radius) {
    isLine = true;
  }

  return { end: isEnd, line: isLine };
}

// POLYGON/POINT
function polygonPoint(
  points: Point[],
  pointX: number,
  pointY: number
): boolean {
  let collision = false;

  // go through each of the vertices, plus the next
  // vertex in the list
  let next = 0;
  for (let current = 0; current < points.length; current++) {
    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current + 1;
    if (next === points.length) next = 0;

    // get the PVectors at our current position
    // this makes our if statement a little cleaner
    const vc = points[current]; // c for "current"
    const vn = points[next]; // n for "next"

    // compare position, flip 'collision' variable
    // back and forth
    if (
      ((vc.y > pointY && vn.y < pointY) || (vc.y < pointY && vn.y > pointY)) &&
      pointX < ((vn.x - vc.x) * (pointY - vc.y)) / (vn.y - vc.y) + vc.x
    ) {
      collision = !collision;
    }
  }
  return collision;
}

// POLYGON/CIRCLE
export interface isCircleInPolygonReturn {
  lineCollision: isCircleInLineReturn;
  centerCollision: boolean;
  currentLine?: Line;
}
export function isCircleInPolygon(
  points: Point[],
  circle: Circle,
  hasInside: boolean = false
): isCircleInPolygonReturn {
  let lineCollision = { end: false, line: false };
  let centerCollision = false;
  let currentLine;

  const { point, radius: circleRadius } = circle;
  const { x: circleX, y: circleY } = point;

  // go through each of the vertices, plus
  // the next vertex in the list
  if (!hasInside) {
    let next = 0;
    for (let current = 0; current < points.length; current++) {
      // get next vertex in list
      // if we've hit the end, wrap around to 0
      next = current + 1;
      if (next == points.length) next = 0;

      // get the PVectors at our current position
      // this makes our if statement a little cleaner
      const pointCurrent = points[current];
      const pointNext = points[next];

      // check for collision between the circle and
      // a line formed between the two vertices
      const line = { a: pointCurrent, b: pointNext };
      const circle = {
        point: { x: circleX, y: circleY },
        radius: circleRadius,
      };
      const collision = isCircleInLine(line, circle);

      // COLLISION WITH LINE
      if (collision.line || collision.end) {
        console.log("Line Collision");
        lineCollision = collision;
        currentLine = line;
      }
    }
  }

  // CIRCLE INSIDE POLYGON
  if (hasInside) {
    const numberOfPointsToCheck = 10;
    const angleStep = (2 * Math.PI) / numberOfPointsToCheck;
    for (let i = 0; i < numberOfPointsToCheck; i++) {
      const angle = i * angleStep;
      const pointX = circleX + circleRadius * Math.cos(angle);
      const pointY = circleY + circleRadius * Math.sin(angle);
      if (!polygonPoint(points, pointX, pointY)) {
        return { lineCollision, centerCollision: false, currentLine };
      }
    }

    console.log("Center Collision");
    centerCollision = true;
  }

  // otherwise, after all that, return false
  return { lineCollision, centerCollision, currentLine };
}
