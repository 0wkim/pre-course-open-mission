import { fetchWords } from "../utils/api.js";
import readline from "readline";

export default class InitialQuizModel {
    static #deleteHypenRandomWord = "";
    
    static #getRandomSyllable() {
        const code = Math.floor(Math.random() * (0xD742 - 0xAC00 + 1)) + 0xAC00;
        return String.fromCharCode(code);
    }

    static async #getRandomWord() {
        const API_KEY = "D7AC672C2129A1C432C40B73ECF12CEE";
        const URL = "https://opendict.korean.go.kr/api/search";

        const randomSyllable = this.#getRandomSyllable();
        const API_URL = `${URL}?key=${API_KEY}&q=${encodeURIComponent(randomSyllable)}&req_type=json&part=word&advanced=y&method=start&type1=word&pos=1,5,6`;
    
        try {
           const response = await fetch(API_URL);
            const data = await response.json();

            let items = [];

            if (data.channel && data.channel.item) {
                items = data.channel.item;
            }

            if (items.length === 0) {
                return await this.#getRandomWord();
            }

            const randomIndex = Math.floor(Math.random() * items.length);
            const randomItem = items[randomIndex];

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

    static async checkAnswer(word) {
        const checkAnswer = await fetchWords(word);
        return checkAnswer;
    }
}