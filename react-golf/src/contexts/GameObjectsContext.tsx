import React, { RefObject, createContext, createRef } from "react";

export type Effect = "BOUNCE" | "SLOW" | "FINNISH";
export interface RefInfo {
  refObject: RefObject<HTMLElement>;
  effect: Effect;
  hasInside: boolean;
}
export interface GameObjectsContext {
  objects: Record<RefName, RefInfo>;
}
// COMPONENT LIST
const refNames = ["courseGround", "stone", "finishFlag"] as const;
export type RefName = (typeof refNames)[number];

// Context Default Values
const defaultValues: Record<RefName, RefInfo> = {
  courseGround: { refObject: createRef(), effect: "BOUNCE", hasInside: false },
  stone: { refObject: createRef(), effect: "BOUNCE", hasInside: false },
  finishFlag: { refObject: createRef(), effect: "FINNISH", hasInside: true },
};
const defaultComponentRefsContext: GameObjectsContext = {
  objects: defaultValues,
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
  return (
    <GameObjectsContext.Provider
      value={{ objects: defaultComponentRefsContext.objects }}
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
