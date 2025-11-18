export function randomHangulSyllable() {
    const code = Math.floor(Math.random() * (0xD7A3 - 0xAC00 + 1)) + 0xAC00;
    return String.fromCharCode(code);
}