import { createSlice } from "@reduxjs/toolkit";
import wordList from "../words.json";

const wordCount = 30;

const shuffleWords = (words, count) => {
  const rand = [...words].sort(() => 0.5 - Math.random());
  const cut = rand.slice(0, count);
  return cut.map((word) => ({ ...word, status: "" }));
};

export const typingSlice = createSlice({
  name: "typing",
  initialState: {
    count: wordCount,
    words: shuffleWords(wordList.words, wordCount),
    wpm: 0,
    time: 60,
    correct: 0,
    incorrect: 0,
    showScore: false,
  },
  reducers: {
    setStatus: (state, action) => {
      const word = state.words.find((word) => word.id === action.payload.id);

      if (action.payload.status === "correct") {
        state.wpm += word.english.length;
        state.correct += 1;
      } else if (action.payload.status === "incorrect") {
        state.incorrect += 1;
      }

      word.status = action.payload.status;
    },
    newWords: (state) => {
      state.words = shuffleWords(wordList.words, state.count);
    },
    resetGame: (state) => {
      state.words = shuffleWords(wordList.words, state.count);
      state.time = 60;
      state.wpm = 0;
      state.correct = 0;
      state.incorrect = 0;
      state.showScore = false;
    },
    timerTick: (state) => {
      if (state.time != 0) {
        state.time -= 1;
      } else {
        state.showScore = true;
      }
    },
  },
});

export default typingSlice.reducer;
export const { setStatus, newWords, resetGame, timerTick } =
  typingSlice.actions;
