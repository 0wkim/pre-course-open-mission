export function startLoadingMessage() {
    const messages = [
        "제시어를 선정중입니다! 조금만 더 기다려 주세요",
        "제시어를 선정중입니다! 조금만 더 기다려 주세요.",
        "제시어를 선정중입니다! 조금만 더 기다려 주세요..",
        "제시어를 선정중입니다! 조금만 더 기다려 주세요...",
    ];
    let index = 0;

    const timer = setInterval(() => {
        process.stdout.write("\r" + messages[index % messages.length] + "   ");
        index ++;
    }, 500); // 0.5마다 변경

    return timer;
}