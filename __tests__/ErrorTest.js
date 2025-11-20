import InitialQuizModel from "../src/model/InitialQuizModel.js";
import { ERROR_MESSAGES } from "../src/constants/ErrorMessages.js";
import * as api from "../src/utils/api.js";
import * as validator from "../src/validation/validateWordFindTimeout.js";
import RunningService from "../src/service/RunningService.js";

jest.mock("../src/utils/api.js");

// 타이머 유틸 mock 처리 (실제 작동 필요 X)
jest.mock("../src/utils/timer.js", () => ({
    oneTimeTimer: jest.fn(() => 1),
    iterateTimer: jest.fn(() => 2)
}));

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

        expect(warnSpy).toHaveBeenCalledWith(`[ERROR] ${ERROR_MESSAGES.ERROR_TIMEOUT_THREE_MIN}`);
        expect(result).toBe("사과");
        expect(api.fetchWords).toHaveBeenCalledTimes(1);
    });

    test("사용자가 아무것도 입력하지 않으면, 예외 메시지가 뜨는지 확인한다.", async () => {
        const callback = jest.fn();
        const promptMock = jest.fn();
        let lineHandler;

        const readLineMock = {
            on: (event, handler) => {
                if (event === "line") lineHandler = handler;
            },
            prompt: promptMock,
        };

        RunningService.running(readLineMock, callback);
        lineHandler("   ");

        expect(callback).toHaveBeenCalledWith("retry", {message: ERROR_MESSAGES.ERROR_NO_INPUT});
        expect(promptMock).toHaveBeenCalledWith(true);
    });
});