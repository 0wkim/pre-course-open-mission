import { Console } from "@woowacourse/mission-utils";
import { checkCategory } from "../utils/checkCategory.js";

export default class FinishQuizView {
    static showCorrect(result) {
        Console.print("\n정답입니다🥳\n");
        Console.print("<단어 뜻 풀이>");

        // 범주가 없는 기본 단어 먼저 선택 
        let targetItem = result.find(item => 
            item.sense.some(s => !s.cat || s.cat.trim() === "")
        );

        let targetSense = checkCategory(targetItem, result);

        const cat = targetSense.cat;
        const pos = targetSense.pos;
        const definition = targetSense.definition;

        Console.print(`품사 : ${pos} \n정의 : ${definition} \n범주 : ${cat}`);
    }

    static showIncorrect(info) {
        Console.print("\n실패했어요😭\n");
        Console.print("이런 단어도 있어요!");

        Console.print(`단어 : ${info.word} \n품사 : ${info.pos} \n정의 : ${info.cleanDefinition}`);
    }
}