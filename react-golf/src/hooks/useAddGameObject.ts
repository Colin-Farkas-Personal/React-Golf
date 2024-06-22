import { useEffect } from "react";
import { RefName, useGameObjectsContext } from "../contexts/GameObjectsContext";

export function useAddGameObject(
  name: RefName,
  ref: React.RefObject<HTMLElement>
) {
  const { addObject } = useGameObjectsContext();

  useEffect(() => {
    addObject(name, ref);
  }, []);
}
