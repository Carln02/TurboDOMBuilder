/**
 * @description Formats the given number of seconds as "MM:SS". The ":" can be replaced and specified in the separator
 * parameter.
 * @param seconds
 * @param separator
 */
function formatMMSS(seconds: number, separator: string = ":") {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return formattedMinutes + separator + formattedSeconds;
}

/**
 * @description Formats the given number of seconds as "HH:MM:SS". The ":" can be replaced and specified in the separator
 * parameter.
 * @param seconds
 * @param separator
 */
function formatHHMMSS(seconds: number, separator: string = ":") {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return formattedHours + separator + formattedMinutes + separator + formattedSeconds;
}

function formatMmSs(seconds: number, separator: string = "") {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return (minutes > 0 ? (minutes + "m" + separator) : "") + remainingSeconds + "s";
}

export {formatMMSS, formatMmSs, formatHHMMSS};