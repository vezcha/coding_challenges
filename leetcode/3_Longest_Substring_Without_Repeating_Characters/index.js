/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let longest = 0;
    let longestStr = "";

    if (s.length > 0) {
        //set first char
        longest++;
        longestStr = s[0];
    } else {
        return longest;
    }
    //two pointers, left and right
    for (let i = 0; i < s.length - 1; i++) { //limit iterations to 1 less from end and when remaing length < longest
        for (let j = i + 1; j < s.length; j++) { //move right pointer to end of string, skip iteration when range is less than longest
            let segment = s.slice(i, j + 1);
            if (!isRepeat(segment[segment.length - 1], segment.slice(0, segment.length - 1))) {
                if (segment.length > longest) {
                    longest = segment.length;
                    longestStr = segment;
                }
                continue;
            } else {
                // longest = segment.length - 1;
                // longestStr = segment.slice(0, segment.length - 1);
                break;
            }
        }
    }

    // console.log(longest, longestStr);
    return longest;
    // iterate left pointer through string from start to end-1
    // 	iterate right pointer starting from left + 1 to end incrementing by 1
    // 		keep track of length, once a repeating character is found, store length as longest (if longest) longest, advance left pointer, reset 			right pointer to left +1
};

// ex c = 'a', s='abca' returns true
var isRepeat = function (c, s) {
    let result = false;
    //iterate through string
    for (let i = 0; i < s.length; i++) {
        if (s[i] == c) {
            result = true;
            break;
        }
    }
    return result;
}

export { lengthOfLongestSubstring, isRepeat };

let testcase1 = "abcabcbb";
let testcase2 = "bbbbb";
let testcase3 = "pwwkew";

console.log(lengthOfLongestSubstring(testcase1));
console.log(lengthOfLongestSubstring(testcase2));
console.log(lengthOfLongestSubstring(testcase3));