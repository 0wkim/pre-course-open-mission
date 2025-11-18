import he from "he";

export function decodeTagInString(string) {
    const decode = he.decode(string);
    return decode;
}