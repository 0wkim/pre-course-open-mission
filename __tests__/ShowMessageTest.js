import { checkCategory } from "../src/utils/checkCategory.js";
import { decodeTagInString } from "../src/utils/regExp.js";
import FinishQuizView from "../src/view/FinishQuizView.js";
import { Console } from "@woowacourse/mission-utils";

jest.mock("@woowacourse/mission-utils", () => ({
    Console: {
        print: jest.fn(),
    },
}));

describe("초성퀴즈 : 출력 메시지 테스트", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("제시어의 범주에 아무것도 없을 경우, '일반'이라는 값이 들어가는지 확인한다.", () => {
        const result = [{sense: [{cat: "  ", pos: "명사", definition: "사과나무의 열매."}]}];

        const item = result[0];
        const sense = checkCategory(item, result);
        
        expect(sense.cat).toBe("일반");
    });

    test("정의 문자열 내부의 태그들이 잘 디코딩되는지 확인한다.", () => {
        const encoded = "&lt;b&gt;사과&lt;/b&gt;";
        const expected = "<b>사과</b>";

        const result = decodeTagInString(encoded);
        expect(result).toBe(expected);
    });

    test("사용자가 오답을 입력할 경우, 오답에 대한 멘트가 나오는지 확인한다.", () => {
        const info = {
            word: "사과",
            pos: "명사",
            cleanDefinition: "사과나무의 열매."
        };

        FinishQuizView.showIncorrect(info);

        expect(Console.print).toHaveBeenCalledWith("\n실패했어요😭\n");
        expect(Console.print).toHaveBeenCalledWith("이런 단어도 있어요!");
        expect(Console.print).toHaveBeenCalledWith(`단어 : ${info.word} \n품사 : ${info.pos} \n정의 : ${info.cleanDefinition}`);
    });

    test("사용자가 정답을 입력할 경우, 정답에 대한 멘트가 나오는지 확인한다.", () => {
        const result = [{sense: [{cat: "과일", pos: "명사", definition: "사과나무의 열매."}]}];

        jest.mock("../src/utils/checkCategory.js", () => ({
            checkCategory: jest.fn(() => ({
                cat: "과일",
                pos: "명사",
                definition: "사과나무의 열매."
            }))
        }));

        FinishQuizView.showCorrect(result);

        expect(Console.print).toHaveBeenCalledWith("\n정답입니다🥳\n");
        expect(Console.print).toHaveBeenCalledWith("<단어 뜻 풀이>");
        expect(Console.print).toHaveBeenCalledWith(`품사 : 명사 \n정의 : 사과나무의 열매. \n범주 : 과일`);
    });
});