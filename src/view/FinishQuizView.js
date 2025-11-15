import { Console } from "@woowacourse/mission-utils";

export default class FinishQuizView {
    static showCorrect(result) {
        Console.print("\n\n정답입니다🥳\n");
        Console.print("<단어 뜻 풀이>");

        // 기본 단어 먼저 선택 
        let targetItem = result.find(item => 
            item.sense.some(s => !s.cat || s.cat.trim() === "")
        );

        if (!targetItem) {
            targetItem = result[0];
        }

        let targetSense = targetItem.sense.find(s => s.cat === "");

        if (!targetSense) {
            targetSense = targetItem.sense[0];
        }

        let cat = targetSense.cat;

        if (!cat || cat.trim() === "") {
            cat = "일반"
        }

        const pos = targetSense.pos;
        const definition = targetSense.definition;

        Console.print(`품사 : ${pos} \n정의 : ${definition} \n범주 : ${cat}`);
    }

    static showIncorrect(info) {
        Console.print("\n\n실패했어요😭\n");
        Console.print("이런 단어도 있어요!");

        Console.print(`단어 : ${info.word} \n품사 : ${info.pos} \n정의 : ${info.cleanDefinition}`);
    }
}