let requestAnimationFrameId: number;
let originLeft: number;
let originTop: number;
let originProcentX: number;
let originProcentY: number;

const MAX_DURATION = 1500;
const MIN_DURATION = 500;
const MAX_DISTANCE = 150;

export async function movePlayerBallTest(
  ball: HTMLElement,
  procents: [number, number]
) {
  // Cancel previous animation
  cancelAnimationFrame(requestAnimationFrameId);

  console.log("Procents", procents);
  // Get start position of element
  originLeft = parseFloat(getComputedStyle(ball).left);
  originTop = parseFloat(getComputedStyle(ball).top);

  continueBallMovement(ball, procents);

  // Value between MIN_DURATION and MAX_DURATION (ex: 500 - 1500)
  //   const averageProcent = Math.abs((procents[0] + procents[1]) / 2);
  //   const durationBoundary = Math.abs(
  //     MIN_DURATION + (MAX_DURATION - MIN_DURATION) * averageProcent
  //   );

  //   await animateTest(ball, procents, {
  //     duration: durationBoundary,
  //     timing: easeInOutQuad,
  //     draw: move,
  //   });

  //   originProcentX = procents[0];
  //   originProcentY = procents[1];
}

interface IAnimateTest {
  duration: number;
  timing: (x: number) => number;
  draw: (
    progress: number,
    element: HTMLElement,
    procents: [number, number]
  ) => void;
}
async function animateTest(
  element: HTMLElement,
  procents: [number, number],
  { duration, timing, draw }: IAnimateTest
) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction);

    draw(progress, element, procents); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

function move(
  progress: number,
  element: HTMLElement,
  procents: [number, number]
) {
  // Move the el
  const [procentX, procentY] = procents;
  const distanceX = MAX_DISTANCE * procentX;
  const distanceY = MAX_DISTANCE * procentY;
  const newLeft = originLeft + progress * distanceX;
  const newTop = originTop + progress * distanceY;
  element.style.top = `${newTop}px`;
  element.style.left = `${newLeft}px`;
}

// Makes ball move slow at first, then fast, then slow again
function easeInOutQuad(x: number): number {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

async function continueBallMovement(
  el: HTMLElement,
  procents: [number, number]
) {
  // Move the el
  let [procentX, procentY] = procents;

  const currentLeft = parseFloat(getComputedStyle(el).left);
  const currentTop = parseFloat(getComputedStyle(el).top);
  const elInline = el as HTMLElement;

  //   // Add transition to the element
  //   elInline.style.transition = "left 0.5s ease, top 0.5s ease";

  elInline.style.left = `${currentLeft + (procentX * 100) / 100}px`;
  elInline.style.top = `${currentTop + (procentY * 100) / 100}px`;

  requestAnimationFrameId = requestAnimationFrame(async function () {
    continueBallMovement(el, procents);
  });
}
