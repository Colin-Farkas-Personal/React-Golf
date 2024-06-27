import { GameObject, GameObjectsContext } from "../contexts/GameObjectsContext";
import { getCircle } from "../helpers/circle";
import {
  isCircleInCircle,
  isCircleInCircleReturn,
  isCircleInPolygon,
  isCircleInPolygonReturn,
} from "../helpers/collisionType";
import { getPoints } from "../helpers/point";

// START OF LOGIC
export interface handleCollisionReturn {
  details: isCircleInPolygonReturn | isCircleInCircleReturn;
  objectRef: GameObject;
}
export function handleCollision(
  player: HTMLElement,
  gameObjects: GameObjectsContext["objects"]
): handleCollisionReturn[] | null {
  const circleRect = player;

  let detectedCollisions = [];

  for (let i = 0; i < gameObjects.length; i++) {
    const currentObject = gameObjects[i];
    const objectRef = currentObject.refObject.current;
    const objectHasInside = currentObject.hasInside;
    const objectIsCircle = currentObject.isCircle;

    if (!objectRef) {
      continue;
    }

    const collisionDetails = objectCollision(
      circleRect,
      objectRef,
      objectHasInside,
      objectIsCircle
    );
    if (collisionDetails) {
      detectedCollisions.push({
        details: collisionDetails,
        objectRef: currentObject,
      });
    }
  }

  return detectedCollisions.length > 0 ? detectedCollisions : null;
}

function objectCollision(
  playerRef: HTMLElement,
  objectRef: HTMLElement,
  hasInside: boolean,
  isCircle: boolean
) {
  if (isCircle) {
    const playerCircle = getCircle(playerRef);
    const objectCircle = getCircle(objectRef);

    const circleCollisionResult = isCircleInCircle(playerCircle, objectCircle);

    if (
      circleCollisionResult.border ||
      circleCollisionResult.half ||
      circleCollisionResult.inside
    ) {
      return circleCollisionResult;
    }
  }

  if (!isCircle) {
    const circle = getCircle(playerRef);
    const points = getPoints(objectRef);

    const polygonCollisionResult = isCircleInPolygon(points, circle, hasInside);

    const isCenterCollision = polygonCollisionResult.centerCollision;
    const isLineCollision = polygonCollisionResult.lineCollision;

    if (isCenterCollision || isLineCollision.end || isLineCollision.line) {
      return polygonCollisionResult;
    }
  }

  return null;
}
