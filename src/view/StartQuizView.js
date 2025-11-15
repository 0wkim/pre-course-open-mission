import { Console } from "@woowacourse/mission-utils";

export default class InitialQuizView {
    static findingInitialMessage() {
        const messages = [
            "제시어를 선정중입니다! 조금만 더 기다려 주세요",
            "제시어를 선정중입니다! 조금만 더 기다려 주세요.",
            "제시어를 선정중입니다! 조금만 더 기다려 주세요..",
            "제시어를 선정중입니다! 조금만 더 기다려 주세요...",
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