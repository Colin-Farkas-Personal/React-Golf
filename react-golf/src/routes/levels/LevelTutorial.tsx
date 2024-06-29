import CourseGround from "../../components/CourseGround";
import PlayerBall from "../../components/PlayerBall";
import FinishFlag from "../../components/FinishFlag";
import Pit from "../../components/Pit";

function LevelTutorial() {
  return (
    <CourseGround size="small">
      <PlayerBall />
      <Pit x={80} y={50} size={125}>
        <FinishFlag />
      </Pit>
    </CourseGround>
  );
}

export default LevelTutorial;
