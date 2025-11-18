import InitialQuizModel from "../src/model/InitialQuizModel.js";
import { randomHangulSyllable } from "../src/utils/randomHangulSyllable.js";

import * as api from "../src/utils/api.js";

jest.mock("../src/utils/api.js");

describe("초성 퀴즈 : 제시어 생성 테스트", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        InitialQuizModel.__resetForTest();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("항상 가~힣 사이의 랜덤한 한글 음절 1개가 생성되는지 확인한다.", () => {
        const MIN = 0xAC00; // 가
        const MAX = 0xD7A3; // 힣

        for (let i = 0; i < 10; i++) {
            const ch = randomHangulSyllable();
            
            // 문자 1개
            expect(ch.length).toBe(1);
            
            const code = ch.charCodeAt(0);

            // 한글 음절 범위 내인지 확인
            expect(code).toBeGreaterThanOrEqual(MIN);
            expect(code).toBeLessThanOrEqual(MAX);
        }
    });

    test("API에서 랜덤한 두 글자 단어가 불러와지는지 확인한다.", async () => {
        api.fetchWords.mockResolvedValue([
            {word: "가-나"},
            {word: "빤-히"},
            {word: "거리"}
        ]);

        jest.spyOn(Math, "random").mockReturnValue(0.5); // index 1
        const word = await InitialQuizModel.chooseTwoCharWord();

        expect(word).toBe("빤히");
        expect(api.fetchWords).toHaveBeenCalled();
    });

    test("API가 빈 배열을 반환화면 다시 랜덤 단어를 얻는다.", async () => {
        // api를 두번째 호출했을 때, 글자가 담긴 배열을 받는 상황
        api.fetchWords.mockResolvedValueOnce([]).mockResolvedValueOnce([{word: "가-나"}]);

        jest.spyOn(Math, "random").mockReturnValue(0);
        const word = await InitialQuizModel.chooseTwoCharWord();

        expect(word).toBe("가나");
        expect(api.fetchWords).toHaveBeenCalledTimes(2);
    });

    test("API에서 불러온 단어로 초성 추출이 잘 되는지 확인한다.", () => {
        const word = "사과";
        const expected = "\u1109\u1100";

        const result = InitialQuizModel.getRandomWordInitial(word);
        expect(result).toBe(expected);
    });
});

