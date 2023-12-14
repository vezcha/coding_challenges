// 66. Plus One
// solution author: vezcha
// Solved [12.14.23]
// Easy
// Topics
// Companies
// You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.

// Increment the large integer by one and return the resulting array of digits.

/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {

    let numArr = [];

    if (digits.length < Number.MAX_SAFE_INTEGER.toString.length) {
        let numberString = digits.join('');
        let num = parseInt(numberString);
        num++;
        numberString = num.toString();
        numArr = Array.from(numberString);
    } else {
        let numberString = digits.join('');
        let bi = BigInt(numberString);
        bi = bi + BigInt(1);
        numberString = bi.toString();
        numArr = Array.from(numberString);
    }
    return numArr;
};


let case1 = [6, 1, 4, 5, 3, 9, 0, 1, 9, 5, 1, 8, 6, 7, 0, 5, 5, 4, 3];

console.log(plusOne(case1));

