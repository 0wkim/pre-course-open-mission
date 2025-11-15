import { oneTimeTimer, iterateTimer } from "../utils/timer.js";
import InitialQuizModel from "../model/InitialQuizModel.js";
import RunningQuizView from "../view/RunningQuizView.js";

export default class RunningService {
    static running(readLine, onFinish) {
        const state = {
            time: 30,
            answerArrived: false,
            readLine,
            onFinish,
            timers: {},
        };

        RunningQuizView.inputLayout(readLine, state.time);

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
            if (state.time < 0) {
                state.answerArrived = true;
                return state.onFinish(null, state.timers);
            }

            RunningQuizView.updateTimer(state.time, state.readLine);
        });
    }

    static #firstHint(state) {
        return oneTimeTimer(10000, () => {
            if (state.answerArrived) {
                return;
            }

            const hint1 = InitialQuizModel.getFirstLetterHint();
            RunningQuizView.showFirstHint(hint1, state.readLine);
        });
    } 

    static #secondHint(state) {
        return oneTimeTimer(20000, () => {
            if (state.answerArrived) {
                return;
            }

            const hint2 = InitialQuizModel.getDefinitionHint();
            RunningQuizView.showSecondHint(hint2, state.readLine);
        });
    } 

    static #timeout(state) {
        return oneTimeTimer(30000, () => {
            if (state.answerArrived) {
                return;
            }

            state.answerArrived = true;

            return state.onFinish(null, state.timers);
        });
    } 

    static #userInput(state) {
        state.readLine.on("line", (answer) => {
            if (state.answerArrived) {
                return;
            }

            state.answerArrived = true;

            return state.onFinish(answer.trim(), state.timers);
        });
    }
}