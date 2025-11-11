import { fetchWords } from "../utils/api.js";

export default class InitialQuizModel {
    static getInitialWord() {
        const INITIAL = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
        
        let initialWord = "";

        for (let i = 0; i < 2; i++) {
            const randomIndex = Math.floor(Math.random() * INITIAL.length);
            initialWord += INITIAL[randomIndex];
        }

        // ㅃㅊ, ㄲㅆ, ㄱㅉ, ㄱㅋ, ㄲㄴ, ㄲㄸ, ㄲㄹ, ㄲㅁ, ㄲㅃ, ㄲㅉ, ㄲㅋ, ㄲㅍ, ㄲㅎ, ㄴㄸ, ㄴㅃ, ㄴㅆ, ㄴㅉ, ㄷㅃ, ㄷㅆ, ㄷㅉ, ㄷㅋ, ㄷㅌ는 단어가 별로 없음 

        return initialWord;
    }

    
    static async checkAnswer (word) {
        const checkAnswer = await fetchWords(word);
        return checkAnswer;
    }
}