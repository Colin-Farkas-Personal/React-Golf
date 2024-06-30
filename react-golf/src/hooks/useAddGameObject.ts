import { useEffect, useId } from "react";
import { RefName, useGameObjectsContext } from "../contexts/GameObjectsContext";

export function useAddGameObject(
  name: RefName,
  ref: React.RefObject<HTMLElement>
) {
  const { addObject, removeObject } = useGameObjectsContext();
  const id = useId();

  useEffect(() => {
    addObject(id, name, ref);

    return () => {
      removeObject(id);
    };
  }, []);
}
