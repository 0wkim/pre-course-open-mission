import readline from "readline";

// models
import InitialQuizModel from "../model/InitialQuizModel.js";

// views
import InitialQuizView from "../view/StartQuizView.js";
import RunningQuizView from "../view/RunningQuizView.js";
import FinishQuizView from "../view/FinishQuizView.js";

//service
import RunningService from "../service/RunningService.js";

export default class InitialQuizController {
    async run() {
        // start
        const findInitialTimer = InitialQuizView.findingInitialMessage();

        const randomWord = await InitialQuizModel.chooseTwoCharWord();
        const randomInitial = InitialQuizModel.getRandomWordInitial(randomWord);

        InitialQuizView.completeFindingMessage(findInitialTimer);

        // running
        InitialQuizView.showInitial(randomInitial);

        const readLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        RunningQuizView.inputLayout(readLine, 30);

        const userInputWord = await new Promise((resolve) => {
            RunningService.running(readLine, (event, payload) => {
                if (event == "updateTime") RunningQuizView.updateTimer(payload.time, readLine);
                if (event == "showHint1") RunningQuizView.showFirstHint(payload.hint1, readLine);
                if (event == "showHint2") RunningQuizView.showSecondHint(payload.hint2, readLine);
                if (event == "finish") {
                    RunningService.clearAllTimers(payload.timers);
                    readLine.close();
                    resolve(payload.answer);
                }
            });
        });

        // end
        const result = await InitialQuizModel.checkAnswer(userInputWord);
        const randomWordInfo = InitialQuizModel.getWordInfo();
        
        if (Array.isArray(result) && result.length > 0) {
            return FinishQuizView.showCorrect(result);
        }
        return FinishQuizView.showIncorrect(randomWordInfo);
    }
}