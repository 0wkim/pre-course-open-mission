import { fetchWords } from "../utils/api.js";
import { Console } from "@woowacourse/mission-utils";

export default class InitialQuizModel {
    static #deleteHypenRandomWord = "";
    static #items = [];
    static #randomItem;
    
    static #getRandomSyllable() {
        const code = Math.floor(Math.random() * (0xD7A3 - 0xAC00 + 1)) + 0xAC00;
        return String.fromCharCode(code);
    }

    static async #getRandomWord() {
        const randomSyllable = this.#getRandomSyllable();

        try {
            this.#items = await fetchWords(randomSyllable, "start");

            if (this.#items.length === 0) {
                return await this.#getRandomWord();
            }

            const randomIndex = Math.floor(Math.random() * this.#items.length);
            this.#randomItem = this.#items[randomIndex];

            const randomWord = this.#randomItem.word;

            this.#deleteHypenRandomWord = randomWord.replace("-", "");

            return this.#deleteHypenRandomWord;
        } catch (error) {
            return await this.#getRandomWord();
        }
    }

    static async chooseTwoCharWord() {
        let word = this.#deleteHypenRandomWord;

        while (!(word && word.length === 2)) {
            word = await this.#getRandomWord();
        }

        return word;
    }

    static getRandomWordInitial(word) {
        let initialWord = "";

        for (let i = 0; i < word.length; i++) {
            const index = ((word.charCodeAt(i) - 44032) / 28) / 21;

            if (index >= 0) {
                initialWord += String.fromCharCode(index + 4352);
            }
        }

        return initialWord;
    }

    static getFirstLetterHint() {
        const firstLetter = this.#deleteHypenRandomWord[0];
        return firstLetter;
    }

    static getDefinitionHint() {
        const definition = this.#randomItem.sense[0].definition;
        return definition;
    }

    // view랑 어떻게 분리할지? 
    static async checkAnswer(inputWord) {
        const result = await fetchWords(inputWord);

        if (result && result.length > 0) {
            this.Success(result);
        }

        if (!result || result.length === 0) {
            this.Fail();
        }
    }

    // 정답
    static Success(result) {
        Console.print("\n정답입니다🥳\n");
        // Console.print("<단어 뜻 풀이>");

        // // 기본 단어 먼저 선택 
        // let targetItem = result.find(item => 
        //     item.sense.some(s => s.cat === "")
        // );

        // if (!targetItem) {
        //     targetItem = result[0];
        // }

        // let targetSense = targetItem.sense.find(s => s.cat === "");

        // if (!targetSense) {
        //     targetSense = targetItem.sense[0];
        // }

        // const pos = targetSense.pos;
        // const definition = targetSense.definition;

        // Console.print(`품사 : ${pos} \n정의: ${definition}`);
    }

    // 실패, 오답
    static Fail() {
        Console.print("\n실패했어요😭\n");
        Console.print("이런 단어도 있어요!");

        const word = this.#randomItem.word;
        const pos = this.#randomItem.sense[0].pos;
        const definition = this.#randomItem.sense[0].definition;

        Console.print(`단어 : ${word} \n품사 : ${pos} \n정의 : ${definition}`);
    }
}