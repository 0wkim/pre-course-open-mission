import { Console } from "@woowacourse/mission-utils";
import InitialQuizModel from "../model/InitialQuizModel.js";

export default class InitialQuizController {
    async run() {
        const randomWord = await InitialQuizModel.chooseTwoCharWord();
        const randomInitial = InitialQuizModel.getRandomWordInitial(randomWord);
        Console.print(`제시어 : ${randomInitial}\n`);
    
        const inputWord = await Console.readLineAsync("답 : ");
        InitialQuizModel.checkAnswer(inputWord);
    }
}