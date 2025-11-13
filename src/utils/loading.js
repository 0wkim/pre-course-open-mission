import readline from "readline";
import InitialQuizModel from "../model/InitialQuizModel.js";
import { Console } from "@woowacourse/mission-utils";

export function startLoadingMessage() {
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

export function inputTimer() {
    return new Promise((resolve) => {
        const readLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        let time = 30;
        let answerArrived = false;

        const countdownTimer = setInterval(() => {
            process.stdout.write(`\r30초 안에 정답을 입력해주세요! (${time})`);

            time--;

            if (time < 0) {
                clearInterval(countdownTimer);
            }
        }, 1000);

        // 첫번째 힌트
        const hint1Timer = setTimeout(() => {
            if (!answerArrived) {
                Console.print(`\n<Hint 1> \n첫 번째 글자는 "${InitialQuizModel.getFirstLetterHint()}" 입니다.\n`);
            }
        }, 10000);

        // 두번째 힌트
        const hint2Timer = setTimeout(() => {
            if (!answerArrived) {
                Console.print(`\n<Hint 2> \n제시어 정의 : ${InitialQuizModel.getDefinitionHint()}\n`);
            }
        }, 20000);

        // 이게 출력이 안됨
        // 답 쓰면 앞에 한 글자가 이상함 
        process.stdout.write("\n답 : ");

        const timeoutTimer = setTimeout(() => {
            if (!answerArrived) {
                readLine.close();
                resolve(null);
            }
        }, 30000);

        readLine.question("", (answer) => {
            answerArrived = true;

            clearInterval(countdownTimer);
            clearTimeout(hint1Timer);
            clearTimeout(hint2Timer);
            clearTimeout(timeoutTimer);

            readLine.close();
            resolve(answer.trim());
        });
    });
}