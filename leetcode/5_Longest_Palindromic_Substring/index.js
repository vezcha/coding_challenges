/*
Leetcode Problem #5 Longest Palindromic Substring
Difficulty: [Medium] 12.6.23
Status: [Solved] 12.6.23
Solution Author: [Brandon Shaver - vezcha]

Description:
Given a string s, return the longest 
palindromic substring in s.

[Additional Features]
Capable of capturing and storing all palindromes for a given string

[Todos]
-Increase time efficiency
*/


/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {

    let candidates = []; currentLongest = 0;
    let longest;
    //scan through string keep track of start index
    for (let i = 0; (i < s.length) && ((s.length - i) > currentLongest); i++) { //can add more conditions to make simplify scan iterations
        if (i === 0) { //first single index character will always be the first longest palindrome of length 1
            // candidates.push(s[i]); //usefully for finding all palindromes
            longest = s[i];
            currentLongest = 1;
        }
        //build and store list of palindromic candidates
        //scan remaining characters up to last character from the current beginning character index i
        for (let j = i + 1; (j < s.length); j++) { //up to end and stop when the max length to check < currentLongest (s.length-i) //skip iteration index up to where (i+j) > currentLongest
            let sub = s.slice(i, j + 1); //add +1 to endIndex to include indexed character
            if ((sub.length > currentLongest) && isPalindrome(sub)) { //only check if sublength is greater than currentlongest
                // candidates.push(sub);
                longest = sub;
                currentLongest = sub.length;

            }
        }
    }
    //scan list of candidates return the longest
    // let answer = findLongest(candidates); //useful for searching through a list to find longest
    let answer = longest;

    return answer;
};

var isPalindrome = function (s) {
    let result = false;

    //is palindrom if character at index from beginning === character at index from end
    //iterate up to half plus 1
    // use array prototype .at() to allow negative indexes as of march 2022
    for (let i = 0; i < (Math.floor(s.length / 2) + 1); i++) {
        if (s.at(i) === s.at(-i - 1)) {
            result = true;
        } else {
            result = false;
            break;
        }
    }
    return result;
};

var findLongest = function (arr) {
    if (arr.length === 0) {
        return -1;
    }

    let longest;

    //linear search to find longest (optimize to binary search for speed increase)
    for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
            longest = arr[0];
        } else {
            //check to if it's new longest
            if (arr[i].length > longest.length) {
                longest = arr[i];
            }
        }
    }
    return longest;
}

let case1 = "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
let case2 = "jglknendplocymmvwtoxvebkekzfdhykknufqdkntnqvgfbahsljkobhbxkvyictzkqjqydczuxjkgecdyhixdttxfqmgksrkyvopwprsgoszftuhawflzjyuyrujrxluhzjvbflxgcovilthvuihzttzithnsqbdxtafxrfrblulsakrahulwthhbjcslceewxfxtavljpimaqqlcbrdgtgjryjytgxljxtravwdlnrrauxplempnbfeusgtqzjtzshwieutxdytlrrqvyemlyzolhbkzhyfyttevqnfvmpqjngcnazmaagwihxrhmcibyfkccyrqwnzlzqeuenhwlzhbxqxerfifzncimwqsfatudjihtumrtjtggzleovihifxufvwqeimbxvzlxwcsknksogsbwwdlwulnetdysvsfkonggeedtshxqkgbhoscjgpiel";
let case3 = "bb";
let case4 = "aaaabaaa"

// console.log(longestPalindrome(case1));
// console.log(longestPalindrome(case2));
// console.log(longestPalindrome(case3));
console.log(longestPalindrome(case4));


