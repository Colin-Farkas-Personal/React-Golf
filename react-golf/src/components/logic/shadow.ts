const SHADOW_PROCENT_SIZE_DEFAULT = 20;
const SHADOW_PROCENT_SIZE_SMALL = 4;
const SHADOW_PROCENT_SIZE_BIG = 40;
const BLUR_PROCENT_SIZE = 2;
const SPREAD_PROCENT_SIZE = 2;
const TRANSPARENCY_PROCENT = 90;

type TSize = "small" | "big";

export function calculateElementShadow(
  element: HTMLElement,
  procents: [number, number],
  size?: TSize
) {
  const [procentX, procentY] = procents;

  // Get elements width and height in px
  const width = element.offsetWidth;
  const height = element.offsetHeight;
  const bgColor = getComputedStyle(element).backgroundColor;

  // box-shadow: [horizontal offset] [vertical offset] [blur radius] [spread radius] [color];
  let selectedSize = getShadowSize(size);

  const horizontalOffset = width * (selectedSize / 100);
  const verticalOffset = height * (selectedSize / 100);
  const parimeter = width * 2 + height * 2;
  const blurRadius = parimeter * (BLUR_PROCENT_SIZE / 100);
  const spreadRadius = parimeter * (SPREAD_PROCENT_SIZE / 100);
  const color = calculateTransparentColor(bgColor, TRANSPARENCY_PROCENT);

  element.style.boxShadow = `
    ${horizontalOffset * -procentX}px 
    ${verticalOffset * -procentY}px 
    ${blurRadius}px 
    ${spreadRadius}px 
    ${color}
    `;
}

function getShadowSize(size: TSize | undefined) {
  switch (size) {
    case "small":
      return SHADOW_PROCENT_SIZE_SMALL;
    case "big":
      return SHADOW_PROCENT_SIZE_BIG;
    default:
      return SHADOW_PROCENT_SIZE_DEFAULT;
  }
}

function calculateTransparentColor(color: string, transparencyProcent: number) {
  const colorArray = color.match(/\d+/g);

  // If colorArray is null, return normal color
  if (colorArray === null) {
    return color;
  }
  const transparency = transparencyProcent / 100;
  return `rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, ${transparency})`;
}

export function removeElementShadow(element: HTMLElement) {
  element.style.boxShadow = "";
}
