import { GameObjectsContext } from "../contexts/GameObjectsContext";
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
    const playerRect = player.getBoundingClientRect();

    collisionResults.forEach((result) => {
      const collisionResponseResult = handleCollisionResponse(
        result,
        [velocityX, velocityY],
        playerRect
      );

      // Set the velocity to the collision response velocity
      velocityX = collisionResponseResult.velocity[0];
      velocityY = collisionResponseResult.velocity[1];

      if (collisionResponseResult.isInHole) {
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

function formatDecimals(number: number, decimals: number) {
  const formatted = number.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return Number(formatted);
}

function isBallStill(): Promise<boolean> {
  return new Promise((resolve) => {
    resolve(
      formatDecimals(velocityX, 1) === 0 && formatDecimals(velocityY, 1) === 0
    );
  });
}
