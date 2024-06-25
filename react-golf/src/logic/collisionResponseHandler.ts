import { isCircleInPolygonReturn } from "../helpers/collisionType";
import { handleCollisionReturn } from "./collisionHandler";
import { sandEffect } from "./effects/sandEffect";
import { finishEffect } from "./effects/finishEffect";
import { pullEffect } from "./effects/pullEffect";
import { pushEffect } from "./effects/pushEffect";
import { getCircle } from "../helpers/circle";
import { reflectionEffect } from "./effects/reflectionEffect";

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

    return {
      ...resultResponse,
      velocity: reflectionEffect(lineDetails, velocity),
    };
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
