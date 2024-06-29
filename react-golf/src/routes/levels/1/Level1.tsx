import CourseGround from "../../../components/CourseGround";
import PlayerBall from "../../../components/PlayerBall";
import FinishFlag from "../../../components/FinishFlag";
import Stone from "../../../components/Stone";
import Pit from "../../../components/Pit";

function Level1() {
  return (
    <CourseGround size="small">
      <Stone x={50} y={50} size={35} rotate={45} />
      <PlayerBall />
      <Pit x={80} y={50} size={100}>
        <FinishFlag />
      </Pit>
    </CourseGround>
  );
}

export default Level1;
