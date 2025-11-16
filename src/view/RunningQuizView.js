import readline from "readline";

export default class RunningQuizView {
    static #showSecond(time) {
        process.stdout.write(`30초 안에 정답을 입력해주세요! (${time})`);
        process.stdout.write("\n\n\n\n\n\n\n\n");
    }

    static #rewriteLine(offset, text, readLine) {
        readline.moveCursor(process.stdout, 0, offset);
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(text);
        
        readline.moveCursor(process.stdout, 0, -offset);
        readLine.prompt(true);
    }

    static showRetryMessage(message, readLine) {
        process.stdout.write(`\n${message}\n`);
        readLine.prompt(true);
    }

    static updateTimer(time, readLine) {
        this.#rewriteLine(-8, `30초 안에 정답을 입력해주세요! (${time})`, readLine);
    }

    static showFirstHint(hint, readLine) {
        this.#rewriteLine(-6, `<Hint 1> \n첫 번째 글자는 "${hint}" 입니다.`, readLine);
    }

    static showSecondHint(hint, readLine) {
        this.#rewriteLine(-3, `<Hint 2> \n제시어 정의 : ${hint}`, readLine);
    }

    static inputLayout(readLine, time) {
        this.#showSecond(time);
        readLine.setPrompt("답 : ");
        readLine.prompt();
    }
}