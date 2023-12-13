// Copied from 8bitTrebuchet
// •
// 10 days ago
// •
// Edited 10 days ago
// [LANGUAGE: TypeScript]
// 12.13.23
// Did part 1 using almost entirely a single Regex

public static part1RegEx() {
    let sum = this.input.match(/(\d*(?<=[^\d.\n\r].{140,142})\d+)|(\d+(?=.{140,142}[^\d.\n\r])\d*)|((?<=[^\d.\n\r])\d+)|(\d+(?=[^\d.\n\r]))/gs)?.reduce((p, c) => p + +c, 0);
    console.log(sum)
}

