import "../styles/mouse-outline.scss";

export function showOutline(mouseOutlineElement: HTMLElement) {
  const widthSelf = getComputedStyle(mouseOutlineElement).width;
  const heightSelf = getComputedStyle(mouseOutlineElement).height;
  mouseOutlineElement.style.visibility = "visible";
  mouseOutlineElement.style.left = e.clientX - parseInt(widthSelf) * 0.5 + "px";
  mouseOutlineElement.style.top = e.clientY - parseInt(heightSelf) * 0.5 + "px";
}

export function hideOutline(mouseOutlineElement: HTMLElement) {
  mouseOutlineElement.style.visibility = "hidden";
}

function MouseOutline() {
  return <span className="mouse-outline" />;
}

export default MouseOutline;
