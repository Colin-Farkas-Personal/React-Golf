export type Circle = {
  point: Point;
  radius: number;
};

export function getCircle(element: HTMLElement): Circle {
  const circleRect = element.getBoundingClientRect();
  const circlePoint = {
    x: circleRect.x + circleRect.width / 2,
    y: circleRect.y + circleRect.height / 2,
  } as Point;

  return {
    point: circlePoint,
    radius: circleRect.width / 2,
  };
}
