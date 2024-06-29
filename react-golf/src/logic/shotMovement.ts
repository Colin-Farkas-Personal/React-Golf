import { GameObjectsContext } from "../contexts/GameObjectsContext";
import { isStill } from "../helpers/isStill";
import { handleCollision } from "./collisionHandler";
import { handleCollisionResponse } from "./collisionResponseHandler";

export let requestAnimationFrameId: number;
let velocityX = 0;
let velocityY = 0;

export const MAX_SPEED = 20;
const DECELERATION = 0.01;

export async function movePlayerBall(
  direction: Velocity,
  speed: number,
  player: HTMLElement,
  gameObjects: GameObjectsContext["objects"],
  setIsBallInHole: (isBallInHole: boolean) => void,
  onBallStill: () => void,
  ballVelocity: (value: Velocity) => void
) {
  const [dirX, dirY] = direction;

  const newVelocityX = (dirX * speed - velocityX) * DECELERATION;
  const newVelocityY = (dirY * speed - velocityY) * DECELERATION;
  velocityX += newVelocityX;
  velocityY += newVelocityY;

  // Add collision detection here
  const collisionResults = handleCollision(player, gameObjects);
  if (collisionResults) {
    collisionResults.forEach((result) => {
      const collisionResponseResult = handleCollisionResponse(
        result,
        [velocityX, velocityY],
        player
      );

      // Set the velocity to the collision response velocity
      velocityX = collisionResponseResult.velocity[0];
      velocityY = collisionResponseResult.velocity[1];

      if (collisionResponseResult.isInHole) {
        velocityX = 0;
        velocityY = 0;
        setIsBallInHole(collisionResponseResult.isInHole);
      }
    });
  }

  normalizeVelocity();
  ballVelocity([velocityX, velocityY]);

  const isStill = await isBallStill();
  if (isStill) {
    cancelAnimationFrame(requestAnimationFrameId);
    onBallStill();
  } else {
    requestAnimationFrameId = requestAnimationFrame(function () {
      movePlayerBall(
        [velocityX, velocityY],
        0,
        player,
        gameObjects,
        setIsBallInHole,
        onBallStill,
        ballVelocity
      );
    });
  }
}
function normalizeVelocity() {
  const currentSpeed = Math.hypot(velocityX, velocityY);
  if (currentSpeed > MAX_SPEED) {
    velocityX = (velocityX / currentSpeed) * MAX_SPEED;
    velocityY = (velocityY / currentSpeed) * MAX_SPEED;
  }
}

const TIME_TO_RESET = 1000;
let startTime = 0,
  elapsedTime = 0;
function isBallStill(): Promise<boolean> {
  return new Promise((resolve) => {
    if (isStill(velocityX, velocityY)) {
      if (!startTime) {
        startTime = performance.now();
      }

      elapsedTime = performance.now();

      var timeDifference = Math.trunc(elapsedTime - startTime);

      if (timeDifference >= TIME_TO_RESET) {
        startTime = 0;
        elapsedTime = 0;
        resolve(true);
      }

      resolve(false);
    } else {
      startTime = 0;
      elapsedTime = 0;
      resolve(false);
    }
  });
}
