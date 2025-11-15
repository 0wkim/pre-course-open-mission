import readline from "readline";
import InitialQuizModel from "../model/InitialQuizModel.js";
import { Console } from "@woowacourse/mission-utils";


export function inputTimer() {
    return new Promise((resolve) => {
        const readLine = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        let time = 30;
        let answerArrived = false;

        // 고정 레이아웃 (추후 UI를 페이지로 분리하는 것이 좋을 듯)
        process.stdout.write(`30초 안에 정답을 입력해주세요! (${time})`);
        process.stdout.write("\n\n\n\n\n\n\n\n");

        readLine.setPrompt("답 : ");
        readLine.prompt();

        // 현재 입력 줄 기준으로 offset 만큼 이동해서 줄 하나를 다시 그리기 
        const rewriteLine = (offset, text) => {
            readline.moveCursor(process.stdout, 0, offset);
            readline.clearLine(process.stdout, 0);
            readline.cursorTo(process.stdout, 0);
            process.stdout.write(text);
            readline.moveCursor(process.stdout, 0, -offset);
            readLine.prompt(true);
        }

        const updateTimerLine = () => {
            rewriteLine(-8, `30초 안에 정답을 입력해주세요! (${time})`);
        };

        const showFirstHint = () => {
            rewriteLine(-6, `<Hint 1> \n첫 번째 글자는 "${InitialQuizModel.getFirstLetterHint()}" 입니다.`);
        }

        const showSecondHint = () => {
            rewriteLine(-3, `<Hint 2> \n제시어 정의 : ${InitialQuizModel.getDefinitionHint()}`);
        }

        const countdownTimer = setInterval(() => {
            if (answerArrived) {
                return;
            }

            time--;

            if (time < 0) {
                clearInterval(countdownTimer);
                return;
            }

            updateTimerLine();
        }, 1000);

        // 첫번째 힌트
        const hint1Timer = setTimeout(() => {
            if (!answerArrived) {
                showFirstHint();
            }
        }, 10000);

        // 두번째 힌트
        const hint2Timer = setTimeout(() => {
            if (!answerArrived) {
                showSecondHint();
            }
        }, 20000);

        const timeoutTimer = setTimeout(() => {
            if (!answerArrived) {
                answerArrived = true;
                clearInterval(countdownTimer);
                clearTimeout(hint1Timer);
                clearTimeout(hint2Timer);

                readLine.close();
                resolve(null);
            }
        }, 30000);

        readLine.on("line", (answer) => {
            if (answerArrived) {
                return;
            }

            clearInterval(countdownTimer);
            clearTimeout(hint1Timer);
            clearTimeout(hint2Timer);
            clearTimeout(timeoutTimer);

            readLine.close();
            resolve(answer.trim());
        });
    });
}