// 7. Reverse Integer
// Solved 12.14.23 [vezcha]

// Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

// Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {

    let y = Array.from(x.toString());

    let isNeg = false;
    if (y[0] == '-') {
        isNeg = true;
        y.shift();
    }


    y = y.reverse();
    y = y.join('');
    y = parseInt(y);

    if (y > ((2 ** 31) - 2)) {
        y = 0;
    }

    if (isNeg) {
        y *= -1;
    }

    return y;

};

let answer = reverse(123);
console.log(answer);