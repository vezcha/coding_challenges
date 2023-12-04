/*
Perfect square root without use of Math sqrt function
Leetcode - Easy 12.3.23
*/


/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function (num) {
    if (num === 1) {
        return 1;
    }
    if (num < 100000000) {
        for (let i = Math.floor(num / 2); i > 0; i--) {
            let quotient = num / i;
            if (quotient === i) {
                return true;
            }
        }

    } else if (num >= 100000000 && num < 1500000000) {
        for (let i = 38730; i > 31622; i--) {
            let quotient = num / i;
            if (quotient === i) {
                return true;
            }
        }

    } else if (num >= 1500000000 && num < 2000000000) {
        for (let i = 38729; i > 44722; i--) {
            let quotient = num / i;
            if (quotient === i) {
                return true;
            }
        }
    } else {
        for (let i = 46340; i > 44722; i--) {
            let quotient = num / i;
            if (quotient === i) {
                return true;
            }
        }
    }
    return false;
};


//perfect squares
//1,4,9,16,25,36

/*
1 * 1
2 * 2
*/

console.log(isPerfectSquare(2147395600));