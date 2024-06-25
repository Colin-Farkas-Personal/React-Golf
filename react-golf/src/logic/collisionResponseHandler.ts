import { isCircleInPolygonReturn } from "../helpers/collisionType";
import { handleCollisionReturn } from "./collisionHandler";
import { sandEffect } from "./effects/sandEffect";
import { finishEffect } from "./effects/finishEffect";
import { pullEffect } from "./effects/pullEffect";
import { pushEffect } from "./effects/pushEffect";
import { getCircle } from "../helpers/circle";
import { reflectionEffect } from "./effects/reflectionEffect";

function defaultCollisionResponse(
  resultResponse: handleCollisionResponseReturn,
  currentVelocity: Velocity
) {
  return { ...resultResponse, currentVelocity };
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

  switch (objectRef.effect) {
    case "BOUNCE": {
      const lineDetails = details as isCircleInPolygonReturn;

      return {
        ...resultResponse,
        velocity: reflectionEffect(lineDetails, velocity),
      };
    }

    case "FINNISH": {
      return { ...resultResponse, isInHole: true };
    }

    case "SLOW": {
      return { ...resultResponse, velocity: sandEffect(velocity) };
    }

    case "RESTART": {
      // Reload Page
      return { ...resultResponse, velocity: finishEffect(velocity) };
    }

    case "PULLED": {
      // Pulled towards middle
      const objectRect = collisionResult.objectRef.refObject.current;

      if (!objectRect || !playerRect) {
        return defaultCollisionResponse(resultResponse, velocity);
      }

      const objectCenterPoint = getCircle(objectRect).point;
      const playerCenterPoint = getCircle(playerRect).point;

      return {
        ...resultResponse,
        velocity: pullEffect(velocity, playerCenterPoint, objectCenterPoint),
      };
    }

    case "PUSHED": {
      // Pushed away from middle
      const objectRect = collisionResult.objectRef.refObject.current;

      if (!objectRect || !playerRect) {
        return defaultCollisionResponse(resultResponse, velocity);
      }

      const objectCenterPoint = getCircle(objectRect).point;
      const playerCenterPoint = getCircle(playerRect).point;

      return {
        ...resultResponse,
        velocity: pushEffect(velocity, playerCenterPoint, objectCenterPoint),
      };
    }

    default:
      return defaultCollisionResponse(resultResponse, velocity);
  }
}
