import Styles from "../styles.module.sass";
import { useSelector, useDispatch } from "react-redux";
import {
  setStatus,
  newWords,
  resetGame,
  timerTick,
} from "../redux/typingSlice";
import { useEffect, useState } from "react";

function Content() {
  const dispatch = useDispatch();

  let [listCount, setListCount] = useState(0);
  const [timer, setTimer] = useState(false);

  const words = useSelector((state) => state.typing.words);
  const count = useSelector((state) => state.typing.count);
  const time = useSelector((state) => state.typing.time);

  useEffect(() => {
    dispatch(setStatus({ id: words[listCount].id, status: "pending" }));
  }, [listCount]);

  // Timer control
  useEffect(() => {
    if (timer) {
      setTimeout(() => dispatch(timerTick()), 1000);
      if (time == 0) {
        setTimer(false);
        setListCount(0);
      }
    }
  }, [timer, time]);

  // Controling if the text contain whitespace
  const containsWhitespace = (str) => {
    return /\s/.test(str);
  };

  const catchKey = (e) => {
    // Submit the answer
    if (containsWhitespace(e.target.value)) {
      catchHandle(e);
      setTimer(true);

      e.target.value = "";
    }
  };

  const catchHandle = (e) => {
    let answer = e.target.value.replace(/\s/g, "");

    if (listCount !== count) {
      // Checks if answer is correct or not
      if (words[listCount].english === answer) {
        dispatch(setStatus({ id: words[listCount].id, status: "correct" }));
      } else {
        dispatch(setStatus({ id: words[listCount].id, status: "incorrect" }));
      }

      if (listCount === count - 1) {
        setListCount(0);
        dispatch(newWords());
      } else {
        setListCount(listCount + 1);
      }
    }
  };

  return (
    <>
      <div className="d-flex flex-column bg-light rounded gap-3 mt-3">
        <div className={Styles.typing_box}>
          <div className={Styles.typing_content}>
            {words.map((words, index) => (
              <span
                className={
                  words.status === "pending"
                    ? Styles.highlighted
                    : words.status === "correct"
                    ? Styles.correct
                    : words.status === "incorrect"
                    ? Styles.incorrect
                    : ""
                }
                key={index}
              >
                {words.english}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="d-flex flex-column bg-dark rounded gap-3 py-3 mt-3">
        <div className="d-flex justify-content-center gap-3">
          <input className="w-75" type="text" onChange={catchKey} />
        </div>
      </div>
    </>
  );
}

export default Content;
