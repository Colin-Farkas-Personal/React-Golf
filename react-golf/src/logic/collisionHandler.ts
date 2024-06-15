import { GameObjectsContext, RefInfo } from "../contexts/GameObjectsContext";
import { getCircle } from "../helpers/circle";
import {
  isCircleInPolygon,
  isCircleInPolygonReturn,
} from "../helpers/collisionType";
import { getPoints } from "../helpers/point";

// START OF LOGIC
export interface handleCollisionReturn {
  details: isCircleInPolygonReturn;
  objectRef: RefInfo;
}
export function handleCollision(
  player: HTMLElement,
  gameObjects: GameObjectsContext["objects"]
): handleCollisionReturn | null {
  const circleRect = player;
  const gameObjectsLength = Object.keys(gameObjects).length;

  for (let i = 0; i < gameObjectsLength; i++) {
    const currentName = Object.keys(gameObjects)[
      i
    ] as keyof GameObjectsContext["objects"];
    const objectRefInfo = gameObjects[currentName];
    const objectRef = objectRefInfo.refObject.current;
    const objectHasInside = objectRefInfo.hasInside;

    if (!objectRef) {
      // NOTHING for this object
      continue;
    }

    const collisionDetails = objectCollision(
      circleRect,
      objectRef,
      objectHasInside
    );
    if (collisionDetails) {
      return {
        details: collisionDetails,
        objectRef: objectRefInfo,
      };
    }
  }

  return null;
}

function objectCollision(
  playerRef: HTMLElement,
  objectRef: HTMLElement,
  hasInside: boolean
) {
  // Create Circel and Line values
  const circle = getCircle(playerRef);
  const points = getPoints(objectRef);

  const collisionResult = isCircleInPolygon(points, circle, hasInside);

  const isCenterCollision = collisionResult.centerCollision;
  const isLineCollision = collisionResult.lineCollision;

  if (isCenterCollision || isLineCollision.end || isLineCollision.line) {
    return collisionResult;
  }

  return null;
}
