import { createContext, createRef, useContext, useState } from "react";

interface PlayerBallContext {
  playerBallRef: React.RefObject<HTMLElement>;
  velocity: Velocity;
  setVelocity: (velocity: Velocity) => void;
  powerPosition: Velocity;
  setPowerPosition: (velocity: Velocity) => void;
  isMoving: boolean;
  setIsMoving: (isMoving: boolean) => void;
}

const defaultPlayerBallContext = {
  playerBallRef: createRef<HTMLElement>(),
  velocity: [0, 0] as Velocity,
  setVelocity: () => {},
  powerPosition: [0, 0] as Velocity,
  setPowerPosition: () => {},
  isMoving: false,
  setIsMoving: () => {},
};

export const PlayerBallContext = createContext<PlayerBallContext>(
  defaultPlayerBallContext
);

interface PlayerBallProviderProps {
  children: React.ReactNode;
}
export const PlayerBallProvider = ({ children }: PlayerBallProviderProps) => {
  const [velocityValue, setVelocityValue] = useState<Velocity>(
    defaultPlayerBallContext.velocity
  );
  const [powerPositionValue, setPowerPositionValue] = useState<Velocity>(
    defaultPlayerBallContext.powerPosition
  );
  const [isMovingValue, setIsMovingValue] = useState<boolean>(
    defaultPlayerBallContext.isMoving
  );

  const VELOCITY_DECIMALS = 3;
  function reduceVelocityDecimals(velocity: Velocity) {
    const reducedX = Number(velocity[0].toFixed(VELOCITY_DECIMALS));
    const reducedY = Number(velocity[1].toFixed(VELOCITY_DECIMALS));
    const reducedVelocity = [reducedX, reducedY] as Velocity;

    setVelocityValue(reducedVelocity);
  }

  return (
    <PlayerBallContext.Provider
      value={{
        playerBallRef: defaultPlayerBallContext.playerBallRef,
        velocity: velocityValue,
        setVelocity: reduceVelocityDecimals,
        powerPosition: powerPositionValue,
        setPowerPosition: setPowerPositionValue,
        isMoving: isMovingValue,
        setIsMoving: setIsMovingValue,
      }}
    >
      {children}
    </PlayerBallContext.Provider>
  );
};

export const usePlayerBallContext = () => {
  const context = useContext(PlayerBallContext);

  if (!context) {
    throw new Error(
      "usePlayerBallContext must be used inside the GameStateProvider"
    );
  }

  return context;
};
