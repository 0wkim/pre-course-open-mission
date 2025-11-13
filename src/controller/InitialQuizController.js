import { Console } from "@woowacourse/mission-utils";
import InitialQuizModel from "../model/InitialQuizModel.js";

export default class InitialQuizController {
    async run() {
        const randomWord = await InitialQuizModel.chooseTwoCharWord();
        Console.print(InitialQuizModel.getRandomWordInitial(randomWord));
    }
}