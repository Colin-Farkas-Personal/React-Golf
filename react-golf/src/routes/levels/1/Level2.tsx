import CourseGround from "../../../components/CourseGround";
import PlayerBall from "../../../components/PlayerBall";
import FinishFlag from "../../../components/FinishFlag";
import Stone from "../../../components/Stone";

function Level2() {
  return (
    <CourseGround size="small">
      <Stone x={45} y={50} size={35} rotate={45} />
      <Stone x={70} y={10} size={80} />
      <Stone x={70} y={90} size={80} />
      <PlayerBall />
      <FinishFlag />
    </CourseGround>
  );
}

export default Level2;
