// context.js
import { createContext, useContext, useState } from "react";

interface ThemeContextType {
  isBallInHole: boolean;
  setIsBallInHole: (isBallInHole: boolean) => void;
}

const defaultThemeContext = {
  isBallInHole: false,
  setIsBallInHole: () => {},
};

export const GameStateContext =
  createContext<ThemeContextType>(defaultThemeContext);

interface GameStateProviderProps {
  children: React.ReactNode;
}
export const GameStateProvider = ({ children }: GameStateProviderProps) => {
  const [isBallInHole, setIsBallInHole] = useState(false);

  return (
    <GameStateContext.Provider value={{ isBallInHole, setIsBallInHole }}>
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameStateContext);

  if (!context) {
    throw new Error("useGameContext must be used inside the GameStateProvider");
  }

  return context;
};
