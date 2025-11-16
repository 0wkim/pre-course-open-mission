import { Console } from "@woowacourse/mission-utils";
import { FINDING_INITIAL } from "../constants/quizMessages.js";

export default class InitialQuizView {
    static findingInitialMessage() {
        const messages = [
            FINDING_INITIAL.NO_DOT,
            FINDING_INITIAL.ONE_DOT,
            FINDING_INITIAL.TWO_DOT,
            FINDING_INITIAL.THREE_DOT,
        ];
        let index = 0;

        const timer = setInterval(() => {
            process.stdout.write("\r" + messages[index % messages.length] + "   ");
            index ++;
        }, 500); // 0.5마다 변경

        return timer;
    }

    static completeFindingMessage(timer) {
        clearInterval(timer);    
        process.stdout.write("\r제시어 선정이 완료되었습니다!                    \n\n");

    }

    static showInitial(randomInitial) {
        Console.print(`제시어 : ${randomInitial}\n`);
    }
}