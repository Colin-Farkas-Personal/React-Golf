let animationId: number;

export function handleBallMovement(ball: Element, degrees: number[]) {
  if (animationId > 0) {
    cancelBallMove();
  }

  animationId = requestAnimationFrame(function () {
    moveit(ball, degrees);
  });
}

async function moveit(el: Element, degrees: number[]) {
  // Move the el
  const [x, y] = degrees;
  const currentLeft = parseFloat(getComputedStyle(el).left);
  const currentTop = parseFloat(getComputedStyle(el).top);
  const elInline = el as HTMLElement;
  elInline.style.left = `${currentLeft + x}px`;
  elInline.style.top = `${currentTop + y}px`;

  animationId = requestAnimationFrame(async function () {
    await moveit(el, degrees);
  });
}
function easeOutSine(x: number): number {
  return Math.sin((x * Math.PI) / 2);
}
function easeInOutSine(x: number): number {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

export function cancelBallMove(timeToStop?: number) {
  cancelAnimationFrame(animationId);
  animationId = 0;
}
