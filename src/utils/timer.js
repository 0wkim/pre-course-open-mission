export function iterateTimer(ms, callback) {
    return setInterval(callback, ms);
}

export function oneTimeTimer(ms, callback) {
    return setTimeout(callback, ms);
}

