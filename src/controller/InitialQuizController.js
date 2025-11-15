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

        const userInputWord = await new Promise((resolve) => {
            RunningService.running(readLine, (answer, timers) => {
                RunningService.clearAllTimers(timers);
                readLine.close();
                resolve(answer);
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