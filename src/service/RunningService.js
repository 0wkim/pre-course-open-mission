import { oneTimeTimer, iterateTimer } from "../utils/timer.js";
import InitialQuizModel from "../model/InitialQuizModel.js";
import { ERROR_MESSAGES } from "../constants/ErrorMessages.js";

export default class RunningService {
    static running(readLine, callback) {
        const state = {
            time: 30,
            answerArrived: false,
            readLine,
            callback,
            timers: {},
        };

        state.timers.countdown = this.#countdownTime(state);
        state.timers.hint1 = this.#firstHint(state);
        state.timers.hint2 = this.#secondHint(state);
        state.timers.timeout = this.#timeout(state);

        this.#userInput(state);
    }

    static clearAllTimers(timers) {
        if (!timers) {
            return;
        }

        clearInterval(timers.countdown);
        clearTimeout(timers.hint1);
        clearTimeout(timers.hint2);
        clearTimeout(timers.timeout);
    }

    static #countdownTime(state) {
        return iterateTimer(1000, () => {
            if (state.answerArrived) {
                return;
            }

            state.time--;

            state.callback("updateTime", {time: state.time});

            if (state.time < 0) {
                state.answerArrived = true;
                return state.callback("finish", {answer: null, timers: state.timers});
            }
        });
    }

    static #firstHint(state) {
        return oneTimeTimer(10000, () => {
            if (state.answerArrived) {
                return;
            }

            const hint1 = InitialQuizModel.getFirstLetterHint();
            state.callback("showHint1", {hint1});
        });
    } 

    static #secondHint(state) {
        return oneTimeTimer(20000, () => {
            if (state.answerArrived) {
                return;
            }

            const hint2 = InitialQuizModel.getDefinitionHint();
            state.callback("showHint2", {hint2});
        });
    } 

    static #timeout(state) {
        return oneTimeTimer(30000, () => {
            if (state.answerArrived) {
                return;
            }

            state.answerArrived = true;
            state.callback("finish", {answer: null, timers: state.timers});
        });
    } 

    static #userInput(state) {
        state.readLine.on("line", (answer) => {
            if (state.answerArrived) {
                return;
            }

            if ((answer.trim()).length === 0) {
                state.callback("retry", {
                    message: ERROR_MESSAGES.ERROR_NO_INPUT
                });
                state.readLine.prompt(true);
                return;
            }

            state.answerArrived = true;
            state.callback("finish", {answer: answer.trim(), timers: state.timers});
        });
    }
}