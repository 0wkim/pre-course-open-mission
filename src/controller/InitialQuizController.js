import { Console } from "@woowacourse/mission-utils";
import InitialQuizModel from "../model/InitialQuizModel.js";

export default class InitialQuizController {
    async run() {
        const initialWord = InitialQuizModel.getInitialWord();
        Console.print(initialWord);

        const inputWord = await Console.readLineAsync("정답을 입력해주세요.\n");
        InitialQuizModel.checkAnswer(inputWord);
    }
}