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
        // 정규식으로 문자열 안 태그 제거 
        const cleanDefinition = definition.replace(/<[^>]+>/g, "");
        return cleanDefinition;
    }

    static async checkAnswer(inputWord) {
        const result = await fetchWords(inputWord);

        return result;
    }

    static getWordInfo() {
        const word = this.#randomItem.word;
        const pos = this.#randomItem.sense[0].pos;
        const definition = this.#randomItem.sense[0].definition;
        // 정규식으로 문자열 안 태그 제거 
        const cleanDefinition = definition.replace(/<[^>]+>/g, "");

        return {word, pos, cleanDefinition};
    }
}    