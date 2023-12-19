// 67. Add Binary
// Easy
// Topics
// Companies
// Given two binary strings a and b, return their sum as a binary string.


/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {

    let arr_a = a.split('');
    let arr_b = b.split('');

    let longest;
    let shortest;
    if (arr_a.length >= arr_b.length) {
        longest = arr_a;
        shortest = arr_b;
    } else {
        longest = arr_b;
        shortest = arr_a;
    }

    //pad shortest with zeros
    while (shortest.length < longest.length) {
        shortest.unshift('0');
    }

    let carry = false;
    let sum = [];
    for (let i = longest.length - 1; i >= 0; i--) {
        a = parseInt(arr_a[i]), b = parseInt(arr_b[i]);
        let sumBit;
        if (!carry) {
            sumBit = a ^ b;
            carry = a & b;
            sum.unshift(sumBit.toString());
        } else {
            sumBit = (a ^ b) ^ carry;
            carry = (a | b) & carry;
            sum.unshift(sumBit.toString());
        }

        if ((i === 0) && (carry)) {
            sum.unshift('1');
        }
    }

    sum = sum.join('');
    return sum.toString();

};

export { addBinary }

let a1 = '11', b1 = '01';
let a2 = "1010", b2 = "1011";

console.log(addBinary(a1, b1));
console.log(addBinary(a2, b2));
