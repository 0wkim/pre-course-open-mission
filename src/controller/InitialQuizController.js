import { Console } from "@woowacourse/mission-utils";
import InitialQuizModel from "../model/InitialQuizModel.js";
import { startLoadingMessage } from "../utils/loading.js";

export default class InitialQuizController {
    async run() {
        const loadingTimer = startLoadingMessage();

        const randomWord = await InitialQuizModel.chooseTwoCharWord();
        const randomInitial = InitialQuizModel.getRandomWordInitial(randomWord);

        clearInterval(loadingTimer);
        process.stdout.write("\r제시어 선정이 완료되었습니다!                                     \n\n");

        Console.print(`제시어 : ${randomInitial}\n`);
    
        const inputWord = await Console.readLineAsync("답 : ");
        InitialQuizModel.checkAnswer(inputWord);
    }
}