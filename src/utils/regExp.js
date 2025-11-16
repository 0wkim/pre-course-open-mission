import he from "he";

export function deleteTagInString(string) {
    const decode = he.decode(string);
    return decode;
}