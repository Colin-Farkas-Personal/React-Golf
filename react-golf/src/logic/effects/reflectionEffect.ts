import { isCircleInPolygonReturn } from "../../helpers/collisionType";
import { Line } from "../../helpers/line";

// INVERSE REFLECTION
function getReflectInverse(velocity: Velocity): Velocity {
  return [-velocity[0], -velocity[1]];
}

function getNormalVector(line: Line) {
  const lineVector = { x: line.b.x - line.a.x, y: line.b.y - line.a.y };
  const normalVector = { x: -lineVector.y, y: lineVector.x };
  const magnitude = Math.sqrt(
    normalVector.x * normalVector.x + normalVector.y * normalVector.y
  );
  return { x: normalVector.x / magnitude, y: normalVector.y / magnitude };
}

function getDotProduct(vectorA: Point, vectorB: Point) {
  return vectorA.x * vectorB.x + vectorA.y * vectorB.y;
}

// ANGLED REFLECTION
function getReflectionVelocity(velocity: Velocity, normal: Point) {
  const velocityPoint = { x: velocity[0], y: velocity[1] };
  const dotProduct = 2 * getDotProduct(velocityPoint, normal);

  return [
    velocity[0] - dotProduct * normal.x,
    velocity[1] - dotProduct * normal.y,
  ] as Velocity;
}

export function reflectionEffect(
  lineDetails: isCircleInPolygonReturn,
  velocity: Velocity
): Velocity {
  // END
  if (lineDetails.lineCollision.end) {
    const reflectionInverse = getReflectInverse(velocity);

    return reflectionInverse;
  }

  // LINE
  if (lineDetails.lineCollision.line && lineDetails.currentLine) {
    const normal = getNormalVector(lineDetails.currentLine);
    const reflectionVelocity = getReflectionVelocity(velocity, normal);

    return reflectionVelocity;
  }

  return velocity;
}
