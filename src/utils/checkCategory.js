export function checkCategory(targetItem, result) {
    if (!targetItem) {
        targetItem = result[0];
    }

    let targetSense = targetItem.sense.find(s => s.cat === "");

    if (!targetSense) {
        targetSense = targetItem.sense[0];
    }

    if (!targetSense.cat || targetSense.cat.trim() === "") {
        targetSense.cat = "일반"
    }

    return targetSense;
}