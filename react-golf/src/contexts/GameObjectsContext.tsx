import React, { RefObject, createContext, useRef, useState } from "react";

// EFFECTS AND OBJECTS LIST
export type Effect =
  | "BOUNCE"
  | "SLOW"
  | "FINNISH"
  | "RESTART"
  | "PULLED"
  | "PUSHED";
const refNames = [
  "COURSE_GROUND",
  "STONE",
  "FINISH_FLAG",
  "SAND_TRAP",
  "WATER_TRAP",
  "PIT",
  "MOUND",
] as const;
export type RefName = (typeof refNames)[number];

// Context Default Values
const DEFAULT_VALUES: Record<RefName, any> = {
  COURSE_GROUND: { effect: "BOUNCE" },
  STONE: { effect: "BOUNCE" },
  FINISH_FLAG: { effect: "FINNISH", isCircle: true },
  SAND_TRAP: { effect: "SLOW", hasInside: true },
  WATER_TRAP: { effect: "RESTART", hasInside: true },
  PIT: { effect: "PULLED", isCircle: true },
  MOUND: { effect: "PUSHED", isCircle: true },
};

export interface GameObject {
  id: string;
  name: RefName;
  refObject: RefObject<HTMLElement>;
  effect: Effect;
  hasInside: boolean;
  isCircle: boolean;
}
export interface GameObjectsContext {
  objects: GameObject[];
  addObject: (
    id: string,
    name: RefName,
    refObject: RefObject<HTMLElement>
  ) => void;
  removeObject: (id: string) => void;
}

const defaultComponentRefsContext: GameObjectsContext = {
  objects: [],
  addObject: () => {},
  removeObject: () => {},
};

export const GameObjectsContext = createContext<GameObjectsContext>(
  defaultComponentRefsContext
);

// Provider
interface ComponentRefsProviderProps {
  children: React.ReactNode;
}
export const GameObjectsProvider = ({
  children,
}: ComponentRefsProviderProps) => {
  const [refArray, setRefArray] = useState<GameObject[]>([]);

  function handleAddObject(
    id: string,
    name: RefName,
    refObject: RefObject<HTMLElement>
  ) {
    const hasExistingObject = refArray.some((object) => object.id === id);

    if (!hasExistingObject) {
      setRefArray((prev) => [
        ...prev,
        {
          id: id,
          name: name,
          refObject: refObject,
          ...DEFAULT_VALUES[name],
        },
      ]);
    }
  }

  function handleRemoveObject(id: string) {
    console.log("REMOVE - ", id);

    setRefArray((prev) => prev.filter((object) => object.id !== id));
  }

  return (
    <GameObjectsContext.Provider
      value={{
        objects: refArray,
        addObject: handleAddObject,
        removeObject: handleRemoveObject,
      }}
    >
      {children}
    </GameObjectsContext.Provider>
  );
};

// Hook
export function useGameObjectsContext() {
  const context = React.useContext(GameObjectsContext);

  if (!context || !context.objects) {
    throw new Error(
      "useComponentRefsContext must be used inside the ComponentRefsProvider"
    );
  }

  return context;
}
