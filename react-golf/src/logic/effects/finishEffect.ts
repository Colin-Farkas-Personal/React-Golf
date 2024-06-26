import { isCircleInCircleReturn } from "../../helpers/collisionType";

export function finishEffect(circleDetails: isCircleInCircleReturn): boolean {
  return circleDetails.inside;
}
