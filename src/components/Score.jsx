import { useDispatch, useSelector } from "react-redux";
import { resetGame } from "../redux/typingSlice";

function Score() {
  const dispatch = useDispatch();

  const WPM = useSelector((state) => state.typing.wpm);
  const correctCount = useSelector((state) => state.typing.correct);
  const incorrectCount = useSelector((state) => state.typing.incorrect);

  return (
    <div className="d-flex justify-content-between align-items-center bg-dark text-light p-2 mt-3">
      <span style={{ color: "yellow" }}>
        <b>{WPM} WPM</b>
      </span>
      <span style={{ color: "green" }}>Correct: {correctCount}</span>
      <span style={{ color: "red" }}>Incorrect: {incorrectCount}</span>
      <span>
        Accuracy:{" "}
        {((correctCount / (correctCount + incorrectCount)) * 100).toFixed(2) +
          "%"}
      </span>
      <button
        className="btn text-light border"
        onClick={() => dispatch(resetGame())}
      >
        Start again
      </button>
    </div>
  );
}

export default Score;
