// context.js
import { createContext, useContext, useState } from "react";

interface ThemeContext {
  isBallInHole: boolean;
  setIsBallInHole: (isBallInHole: boolean) => void;
  isHoleProximity: boolean;
  setIsHoleProximity: (isHoleProximity: boolean) => void;
};

const defaultThemeContext = {
  isBallInHole: false,
  setIsBallInHole: () => {},
  isHoleProximity: false,
  setIsHoleProximity: () => {},
};

export const GameStateContext =
  createContext<ThemeContext>(defaultThemeContext);

interface GameStateProviderProps {
  children: React.ReactNode;
}
export const GameStateProvider = ({ children }: GameStateProviderProps) => {
  const [isBallInHole, setIsBallInHole] = useState(false);
  const [isHoleProximity, setIsHoleProximity] = useState(false);

  return (
    <GameStateContext.Provider value={{ 
      isBallInHole, 
      setIsBallInHole, 
      isHoleProximity, 
      setIsHoleProximity 
    }}>
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
