/** 
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function (n) {

    let low = 1;
    let high = 2147483647;
    let mid = high / 2

    let hint = guess(mid);
    while (hint != 0) {
        if (hint === 0) {
            return mid;
        } else if (hint === -1) {
            //guess is too high
            high = mid - 1;
        } else if (hint === 1) {
            //guess is too low
            low = mid + 1;
        } else {
            return; //unexcepted?
        }
        //recalc mid for most cases this will work until int overflow
        // mid = (low + high) /2;

        mid = (Math.floor((high - low) / 2) + mid); //safer way to avoid overflow

        hint = guess(mid);
    }

    return mid;

};

guessNumber()