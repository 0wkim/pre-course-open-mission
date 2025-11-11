import { Console } from "@woowacourse/mission-utils";
import InitialModel from "../model/InitialModel.js";
import CheckAnswerModel from "../model/CheckAnswerModel.js";

export default class InitialQuizController {
    async run() {
        const initialWord = InitialModel.getInitialWord();
        Console.print(initialWord);
    }
}