import { TIME_LIMIT } from "../constants/quizMessages.js";

export function findTimeoutValidator() {
    const startTime = Date.now();

    return {
        isTimeout() {
            return Date.now() - startTime > TIME_LIMIT;
        },
        reset() {
            return findTimeoutValidator();
        }
    };
}