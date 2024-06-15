export function getElement<T>(ref: React.MutableRefObject<T | null>, name: string) {
    const element = (ref.current as HTMLElement)?.querySelector(`.${name}`);
  
    return element as HTMLElement;
  }