import React, { RefObject, createContext, useRef } from "react";

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
  name: RefName;
  refObject: RefObject<HTMLElement>;
  effect: Effect;
  hasInside: boolean;
  isCircle: boolean;
}
export interface GameObjectsContext {
  objects: GameObject[];
  addObject: (name: RefName, refObject: RefObject<HTMLElement>) => void;
}

const defaultComponentRefsContext: GameObjectsContext = {
  objects: [],
  addObject: () => {},
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
  const refArray = useRef<GameObject[]>([]);

  function handleAddObject(name: RefName, refObject: RefObject<HTMLElement>) {
    const hasExistingObject = refArray.current.some(
      (object) => object.name === name
    );
    if (!hasExistingObject) {
      refArray.current.push({
        name: name,
        refObject: refObject,
        ...DEFAULT_VALUES[name],
      });
    }
  }

  return (
    <GameObjectsContext.Provider
      value={{
        objects: refArray.current,
        addObject: handleAddObject,
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
