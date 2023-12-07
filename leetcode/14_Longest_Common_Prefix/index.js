/*
Leetcode Problem #14 Longest Common Prefix
Difficulty: [Easy] 12.6.23
Status: [Solved] 12.6.23
Solution Author: [Brandon Shaver - vezcha]

Description:
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

[Todos]
    -Increase time efficiency
*/

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {

    let longestPrefix = "";

    //simple cases
    if (strs.length === 0) {
        return "";
    } else if (strs.length === 1) {
        return strs[0];
    }

    //find shortest length string limit iterations
    const arrLengths = strs.map((x) => x.length);
    const smallest = Math.min(...arrLengths);

    //scan through first string, set candidate to substring of 0 - indexed character including endIndex
    let endIndex = 1;
    for (let i = endIndex; i <= smallest; i++) { //add a range length check to shorten iterations

        let candidate = strs[0].slice(0, i);
        //iterate through strings checking if substring matches from same indexes, when it doesn't reset longest to blank
        let isCommon = true;
        for (let j = 1; j < strs.length; j++) {
            if (candidate == strs[j].slice(0, i)) {
                continue;
            } else {
                isCommon = false;
                break; // not a common prefix
            }

        }
        if (isCommon && candidate.length > longestPrefix.length) {
            longestPrefix = candidate;
        }

    }
    return longestPrefix;
};