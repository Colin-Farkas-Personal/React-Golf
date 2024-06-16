import { usePlayerBallContext } from "../contexts/PlayerBallContext";
import { requestAnimationFrameId } from "../logic/shotMovement";

export type Point = { x: number; y: number };
export type Line = { a: Point; b: Point };

function getLines(element: HTMLElement): Line[] {
  // Point names are relative to unrotated object
  const pointElement1 = element
    ?.getElementsByClassName("box-collider-point-bl")[0]
    .getBoundingClientRect();
  const pointElement2 = element
    ?.getElementsByClassName("box-collider-point-tl")[0]
    .getBoundingClientRect();
  const pointElement3 = element
    ?.getElementsByClassName("box-collider-point-tr")[0]
    .getBoundingClientRect();
  const pointElement4 = element
    ?.getElementsByClassName("box-collider-point-br")[0]
    .getBoundingClientRect();

  // Create Points and Lines
  const point1 = { x: pointElement1.left, y: pointElement1.top } as Point;
  const point2 = { x: pointElement2.left, y: pointElement2.top } as Point;
  const point3 = { x: pointElement3.left, y: pointElement3.top } as Point;
  const point4 = { x: pointElement4.left, y: pointElement4.top } as Point;

  const line1 = { a: point1, b: point2 };
  const line2 = { a: point2, b: point3 };
  const line3 = { a: point3, b: point4 };
  const line4 = { a: point4, b: point1 };

  return [line1, line2, line3, line4];
}

function isCollisionOnLine(
  playerBallRadius: number,
  playerBallCenter: Point,
  point1: Point,
  point2: Point
) {
  // Calculate vectors
  const v1 = {
    x: playerBallCenter.x - point1.x,
    y: playerBallCenter.y - point1.y,
  };
  const v2 = { x: point2.x - point1.x, y: point2.y - point1.y };

  // Calculate dot product
  const dotProduct = v1.x * v2.x + v1.y * v2.y;

  // Calculate square of line length
  const lineLengthSquared = v2.x * v2.x + v2.y * v2.y;

  let closestPoint;

  // Check if the closest point on the line to the playerBall center is point1
  if (dotProduct <= 0) {
    closestPoint = point1;
  }
  // Check if the closest point on the line to the playerBall center is point2
  else if (dotProduct >= lineLengthSquared) {
    closestPoint = point2;
  }
  // Otherwise, the closest point on the line to the playerBall center is the point where the perpendicular from the playerBall center intersects the line
  else {
    const t = dotProduct / lineLengthSquared;
    closestPoint = { x: point1.x + t * v2.x, y: point1.y + t * v2.y };
  }

  // Calculate distance between closest point on the line and player ball center
  const distanceToClosestPoint = Math.sqrt(
    Math.pow(playerBallCenter.x - closestPoint.x, 2) +
      Math.pow(playerBallCenter.y - closestPoint.y, 2)
  );

  return distanceToClosestPoint <= playerBallRadius;
}

export function useBoxCollider(ref: React.RefObject<HTMLElement>) {
  const { playerBallRef, velocity, setVelocity } = usePlayerBallContext();

  // Objects
  const playerBall = playerBallRef.current;
  const object = ref.current;

  // Velocity
  const velocityX = velocity[0];
  const velocityY = velocity[1];

  if (!playerBall || !object) {
    return [velocity[0], velocity[1]];
  }

  const lines = getLines(object);

  // Get player ball center and radius
  const playerBallRect = playerBall.getBoundingClientRect();
  const playerBallCenter = {
    x: playerBallRect.left + playerBallRect.width / 2,
    y: playerBallRect.top + playerBallRect.height / 2,
  };
  const playerBallRadius = playerBallRect.width / 2;

  let newVelocity = { x: velocityX, y: velocityY };

  // Handle collision
  lines.forEach((line) => {
    if (isCollisionOnLine(playerBallRadius, playerBallCenter, line.a, line.b)) {
      [newVelocity.x, newVelocity.y] = getReflection(
        line.a,
        line.b,
        velocityX,
        velocityY
      );
      cancelAnimationFrame(requestAnimationFrameId);
      setVelocity([newVelocity.x, newVelocity.y]);
    }
  });
}

function getReflection(
  point1: Point,
  point2: Point,
  velocityX: number,
  velocityY: number
): Velocity {
  // Calculate normal vector of the line
  const normal = { x: point2.y - point1.y, y: point1.x - point2.x };

  // Normalize the normal vector
  const normalLength = Math.sqrt(normal.x * normal.x + normal.y * normal.y);
  const normalizedNormal = {
    x: normal.x / normalLength,
    y: normal.y / normalLength,
  };

  // Calculate dot product of velocity and normalized normal
  const dotProduct =
    velocityX * normalizedNormal.x + velocityY * normalizedNormal.y;

  // Calculate reflection vector
  const reflection = {
    x: velocityX - 2 * dotProduct * normalizedNormal.x,
    y: velocityY - 2 * dotProduct * normalizedNormal.y,
  };

  return [reflection.x, reflection.y];
}
