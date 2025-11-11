import { fetchWords } from "../utils/api.js";

export default class CheckAnswerModel {
    static async checkAnswer (word) {
        const checkAnswer = await fetchWords(word);
        return checkAnswer;
    }
}