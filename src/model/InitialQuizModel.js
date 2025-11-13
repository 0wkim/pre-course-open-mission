import { fetchWords } from "../utils/api.js";
import readline from "readline";

export default class InitialQuizModel {
    static #deleteHypenRandomWord = "";
    static #items = [];
    
    static #getRandomSyllable() {
        const code = Math.floor(Math.random() * (0xD742 - 0xAC00 + 1)) + 0xAC00;
        return String.fromCharCode(code);
    }

    static async #getRandomWord() {
        const randomSyllable = this.#getRandomSyllable();

        try {
            this.#items = await fetchWords(randomSyllable);

            if (this.#items.length === 0) {
                return await this.#getRandomWord();
            }

            const randomIndex = Math.floor(Math.random() * this.#items.length);
            const randomItem = this.#items[randomIndex];

            const randomWord = randomItem.word;

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

    static async checkAnswer(inputWord) {
        const result = await fetchWords(inputWord);
        return result;
    }
}