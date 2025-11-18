import { fetchWords } from "../utils/api.js";
import { decodeTagInString } from "../utils/regExp.js";
import { findTimeoutValidator } from "../validation/validateWordFindTimeout.js";
import { ERROR_MESSAGES } from "../constants/ErrorMessages.js";

export default class InitialQuizModel {
    static #randomWord = "";
    static #items = [];
    static #randomItem;
    
    // 모든 한글 조합 중, 랜덤한 음절 추출 
    static #getRandomSyllable() {
        const code = Math.floor(Math.random() * (0xD7A3 - 0xAC00 + 1)) + 0xAC00;
        return String.fromCharCode(code);
    }

    // 추출한 음절로 시작하는 단어를 API에서 가져오기
    // 만약 해당 음절의 단어가 없다면, 다시 음절 추출 
    static async #getRandomWord() {
        while (true) {
            const randomSyllable = this.#getRandomSyllable();
            try {
                this.#items = await fetchWords(randomSyllable, "start");
                if (this.#items.length === 0) return await this.#getRandomWord();

                // 해당 음절로 시작하는 단어가 여러개이면, 랜덤한 인덱스로 한개 선택
                const randomIndex = Math.floor(Math.random() * this.#items.length);
                this.#randomItem = this.#items[randomIndex];
                const randomWord = this.#randomItem.word;

                this.#randomWord = randomWord.replace("-", "");
                return this.#randomWord;
            } catch (error) {
                continue;
            }
        }
    }

    static async chooseTwoCharWord() {
        const validator = findTimeoutValidator();
        let word = this.#randomWord;

        // 두 글자 단어만 허용 
        while (!(word && word.length === 2)) {
            if (validator.isTimeout()) {
                console.warn(ERROR_MESSAGES.ERROR_TIMEOUT_THREE_MIN);
                return await this.chooseTwoCharWord();
            }
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
        const firstLetter = this.#randomWord[0];
        return firstLetter;
    }

    static getDefinitionHint() {
        const definition = this.#randomItem.sense[0].definition;
        // 문자열 안 태그 decode
        const cleanDefinition = decodeTagInString(definition);
        return cleanDefinition;
    }

    static async checkAnswer(inputWord) {
        const result = await fetchWords(inputWord);
        return result;
    }

    // 제시어 정보 추출 
    static getWordInfo() {
        const word = this.#randomItem.word;
        const pos = this.#randomItem.sense[0].pos;
        const definition = this.#randomItem.sense[0].definition;
        // 문자열 안 태그 decode
        const cleanDefinition = decodeTagInString(definition);

        return {word, pos, cleanDefinition};
    }
}    