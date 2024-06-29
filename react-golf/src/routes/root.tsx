import ScreenViewBox from "../components/ScreenViewBox";
import { Outlet } from "react-router-dom";

function Root() {
  function handlePower() {}
  return (
    <ScreenViewBox currentPowerProcent={(power: number) => handlePower}>
      {/* <MouseOutline /> */}
      <Outlet />
    </ScreenViewBox>
  );
}

export default Root;
