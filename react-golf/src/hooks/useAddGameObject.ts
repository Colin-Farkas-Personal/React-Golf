import { useEffect, useId } from "react";
import { RefName, useGameObjectsContext } from "../contexts/GameObjectsContext";

export function useAddGameObject(
  name: RefName,
  ref: React.RefObject<HTMLElement>
) {
  const { addObject } = useGameObjectsContext();
  const id = useId();

  useEffect(() => {
    addObject(id, name, ref);
  }, []);
}
