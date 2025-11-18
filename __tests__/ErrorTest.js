import InitialQuizModel from "../src/model/InitialQuizModel.js";
import { ERROR_MESSAGES } from "../src/constants/ErrorMessages.js";
import * as api from "../src/utils/api.js";
import * as validator from "../src/validation/validateWordFindTimeout.js";

jest.mock("../src/utils/api.js");

describe("예외처리 테스트", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        InitialQuizModel.__resetForTest();
    });

    test("제시어 생성 시간이 3분을 넘어갔을 때, 예외 메시지가 뜨는지 확인한다.", async () => {
        let count = 0;
        jest.spyOn(validator, "findTimeoutValidator").mockReturnValue({
            isTimeout: () => {
                count++;
                return count === 1;
            }
        });

        const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
        api.fetchWords.mockResolvedValue([]).mockResolvedValue([{word: "사과", sense: [{pos: "명사", definition: "사과나무의 열매."}]}]);
        const result = await InitialQuizModel.chooseTwoCharWord();

        expect(warnSpy).toHaveBeenCalledWith(ERROR_MESSAGES.ERROR_TIMEOUT_THREE_MIN);
        expect(result).toBe("사과");
        expect(api.fetchWords).toHaveBeenCalledTimes(1);
    });

    test("사용자가 아무것도 입력하지 않으면, 예외 메시지가 뜨는지 확인한다.", async () => {
        api.fetchWords.mockResolvedValue([]);

        await InitialQuizModel.checkAnswer("");

        expect(api.fetchWords).toHaveBeenCalledWith("");
    });
});