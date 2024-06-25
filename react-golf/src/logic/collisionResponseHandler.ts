import { isCircleInPolygonReturn } from "../helpers/collisionType";
import { Line } from "../helpers/line";
import { handleCollisionReturn } from "./collisionHandler";
import { sandEffect } from "./effects/sandEffect";
import { finishEffect } from "./effects/finishEffect";
import { pullEffect } from "./effects/pullEffect";
import { pushEffect } from "./effects/pushEffect";
import { getCircle } from "../helpers/circle";

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

interface handleCollisionResponseReturn {
  velocity: Velocity;
  isInHole: boolean;
}
export function handleCollisionResponse(
  collisionResult: handleCollisionReturn,
  velocity: Velocity,
  playerRect: HTMLElement
): handleCollisionResponseReturn {
  const { details, objectRef } = collisionResult;

  let resultResponse = {
    velocity,
    isInHole: false,
  } as handleCollisionResponseReturn;

  // LINE COLLISION (END & LINE)
  if (objectRef.effect === "BOUNCE") {
    const lineDetails = details as isCircleInPolygonReturn;

    // END
    if (lineDetails.lineCollision.end) {
      resultResponse = {
        ...resultResponse,
        velocity: getReflectInverse(velocity),
      };
    }

    // LINE
    if (lineDetails.lineCollision.line && lineDetails.currentLine) {
      const normal = getNormalVector(lineDetails.currentLine);
      const reflectionVelocity = getReflectionVelocity(velocity, normal);
      return { ...resultResponse, velocity: reflectionVelocity };
    }
  }

  if (objectRef.effect === "FINNISH") {
    return { ...resultResponse, isInHole: true };
  }

  if (objectRef.effect === "SLOW") {
    return { ...resultResponse, velocity: sandEffect(velocity) };
  }

  if (objectRef.effect === "RESTART") {
    // Reload Page
    return { ...resultResponse, velocity: finishEffect(velocity) };
  }

  if (objectRef.effect === "PULLED") {
    // Pulled towards middle
    const objectRect = collisionResult.objectRef.refObject.current;

    if (!objectRect || !playerRect) {
      return { ...resultResponse, velocity };
    }

    const objectCenterPoint = getCircle(objectRect).point;
    const playerCenterPoint = getCircle(playerRect).point;

    return {
      ...resultResponse,
      velocity: pullEffect(velocity, playerCenterPoint, objectCenterPoint),
    };
  }

  if (objectRef.effect === "PUSHED") {
    // Pulled towards middle
    const objectRect = collisionResult.objectRef.refObject.current;

    if (!objectRect || !playerRect) {
      return { ...resultResponse, velocity };
    }

    const objectCenterPoint = getCircle(objectRect).point;
    const playerCenterPoint = getCircle(playerRect).point;

    return {
      ...resultResponse,
      velocity: pushEffect(velocity, playerCenterPoint, objectCenterPoint),
    };
  }

  return resultResponse;
}
