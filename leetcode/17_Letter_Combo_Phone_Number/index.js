// 17. Letter Combinations of a Phone Number
// Medium
// Topics
// Companies
// Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

// A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {

    if (digits.length < 1) {
        return [];
    }

    let letterMappings = new Map([
        ["2", ['a', 'b', 'c']],
        ["3", ['d', 'e', 'f']],
        ["4", ['g', 'h', 'i']],
        ["5", ['j', 'k', 'l']],
        ["6", ['m', 'n', 'o']],
        ["7", ['p', 'q', 'r', 's']],
        ["8", ['t', 'u', 'v']],
        ["9", ['w', 'x', 'y', 'z']]
    ]);

    //iterate through digits string to get letter sets
    let letterSets = [];
    for (let i = 0; i < digits.length; i++) {
        let digitString = digits[i];
        let letterSet = letterMappings.get(digitString);
        letterSets.push(letterSet);
    }

    if (letterSets.length === 0) {
        return [];
    } else if (letterSets.length === 1) {
        return letterSets[0];
    }

    let combos = letterSets.shift();
    while (letterSets.length > 0) {
        let mergeSet = letterSets.shift();
        let mergedCombos = [];
        for (let i = 0; i < combos.length; i++) {
            for (let j = 0; j < mergeSet.length; j++) {
                let combo = combos[i] + mergeSet[j];
                mergedCombos.push(combo);
            }
        }
        combos = mergedCombos;
    }

    return combos;

};

export { letterCombinations };

let digits1 = "456";

let result = letterCombinations(digits1);

console.log(result);

//todo
//refine using reduce function