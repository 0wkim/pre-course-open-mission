import RunningService from "../src/service/RunningService.js";

jest.useFakeTimers();
jest.mock("../src/model/InitialQuizModel.js", () => ({
    getFirstLetterHint: jest.fn(() => "첫 글자 힌트"),
    getDefinitionHint: jest.fn(() => "정의 힌트"),
}));

describe("초성 퀴즈 : 타이머 테스트", () => {
    let mockCallback;
    let mockReadline;

    beforeEach(() => {
        mockCallback = jest.fn();

        mockReadline = {
            close: jest.fn(),
            prompt: jest.fn(),
            setPrompt: jest.fn(),
            on: jest.fn(),
        };
    });

    test("게임이 시작되고 10초 뒤, 20초 뒤에 힌트가 잘 나오는지 확인한다.", () => {
        RunningService.running(mockReadline, mockCallback);
        
        // 시작하고나서는 아직 아무것도 뜨지 않음
        expect(mockCallback).not.toHaveBeenCalled();

        jest.advanceTimersByTime(10000);
        expect(mockCallback).toHaveBeenCalledWith("showHint1", expect.any(Object));
        expect(mockCallback).not.toHaveBeenCalledWith("showHint2", expect.any(Object));

        jest.advanceTimersByTime(10000);
        expect(mockCallback).toHaveBeenCalledWith("showHint2", expect.any(Object));
    });
});