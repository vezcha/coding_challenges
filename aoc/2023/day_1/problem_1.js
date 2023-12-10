//solution Author: vezcha
//solved on 12.10.23

// --- Day 1: Trebuchet?! ---
// Something is wrong with global snow production, and you've been selected to take a look. The Elves have even given you a map; on it, they've used stars to mark the top fifty locations that are likely to be having problems.
// You've been doing this long enough to know that to restore snow operations, you need to check all fifty stars by December 25th.
// Collect stars by solving puzzles. Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!
// You try to ask why they can't just use a weather machine ("not powerful enough") and where they're even sending you ("the sky") and why your map looks mostly blank ("you sure ask a lot of questions") and hang on did you just say the sky ("of course, where do you think snow comes from") when you realize that the Elves are already loading you into a trebuchet ("please hold still, we need to strap you in").
// As they're making the final adjustments, they discover that their calibration document (your puzzle input) has been amended by a very young Elf who was apparently just excited to show off her art skills. Consequently, the Elves are having trouble reading the values on the document.
// The newly-improved calibration document consists of lines of text; each line originally contained a specific calibration value that the Elves now need to recover. On each line, the calibration value can be found by combining the first digit and the last digit (in that order) to form a single two-digit number.

// For example:

// 1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet
// In this example, the calibration values of these four lines are 12, 38, 15, and 77. Adding these together produces 142.

// Consider your entire calibration document. What is the sum of all of the calibration values?

let calc_calibration_sum = function (s) {
    let sum = 0;
    let values = [];

    let lines = s.split('\n');
    console.log(lines);

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        //get first digit
        let f_digit = 0;
        for (let j = 0; j < line.length; j++) {
            let char = line[j];
            if (Number.isNaN(parseInt(char))) {
                continue;
            } else {
                f_digit = char;
                break;
            }
        }
        //get second digit
        let s_digit = 0;
        for (let j = 0; j < line.length; j++) {
            let char = line.at(-j - 1);
            if (Number.isNaN(parseInt(char))) {
                continue;
            } else {
                s_digit = char;
                break;
            }
        }
        //concat digits, cast to int, then push to values
        let complete = f_digit + s_digit;
        let value = parseInt(complete);
        values.push(value);
    }

    console.log("values found: " + values.length);
    console.log("lines found: " + lines.length);

    //print lines and values
    for (let i = 0; i < lines.length; i++) {
        console.log(lines[i], values[i]);
    }
    //reduce through values, calculating sum
    sum = values.reduce((acc, cur) => acc + cur, 0);
    return sum;
};

console.log(calc_calibration_sum(input));