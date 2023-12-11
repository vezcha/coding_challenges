// Leetcode Problem #6
// Status: [Solved] 12.11.23
// Solution Author: vezcha

// 6. Zigzag Conversion
// Medium
// Topics
// Companies
// The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

// P   A   H   N
// A P L S I I G
// Y   I   R
// And then read line by line: "PAHNAPLSIIGYIR"

// Write the code that will take a string and make this conversion given a number of rows:

// string convert(string s, int numRows);

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
    let result = "";

    if (s.length <= numRows || numRows === 1) {
        return s;
    }

    const half_size = Math.floor(numRows / 2);
    let offset = half_size * 2;
    if (numRows % 2 === 0) {
        offset--;
    }

    //iterate through rows
    for (let i = 0; i < numRows; i++) {
        let row = "";
        let stepCount = 0;
        let stepSize = 0;

        if (i === 0 || i === (numRows - 1)) { //first and last
            stepSize = (numRows - 1) * 2;
        } else if ((numRows % 2 != 0) && (i === (Math.floor(numRows / 2)))) { //midpoint
            stepSize = (numRows - 1);
        } else { //in-between first and last, but not middle
            stepSize = (numRows - 1) + offset;
        }
        //iterate through string starting at row index, and increment by step count
        for (let j = i; j < s.length; j = j + stepSize) {
            if (i > 0 && i < (numRows - 1)) { //if not the first or last
                if (stepCount % 2 === 0) { //even step counts
                    stepSize = (numRows - 1) + offset;
                } else { //odd step counts
                    stepSize = (numRows - 1) - offset;
                }
            }
            row += (s.charAt(j));
            stepCount++;
        }
        offset -= 2;
        result += row;
    }
    return result;
};

export { convert };
let s1 = "PAYPALISHIRING", nr1 = 3;
let s2 = "PAYPALISHIRING", nr2 = 4;

console.log(convert(s1, nr1));
console.log(convert(s2, nr2));

// =====================================
// Pattern identification of step count
// ======================================
// evens starting offset = (numrows / 2)*2 -1 (simplify if you're smart)
// odds starting offset = (numrows / 2)*2
// offset-=2 for each row

// (numRows == 3)
// ====================
// 0 - (numRows-1)*2 [4]
// 1 - (numRows-1) [2]
// 2 - (numRows-1)*2 [4]

// (numRows == 5)
// ===================
// 0 - (numRows-1)*2) [8]
// 1 - (numRows-1)+2, (numRows-1)-2
// 2 - (numRows-1) [mid]
// 3 - (numRows-1)-2, (numRows-1)+2
// 4 - (numRows-1)*2) [8]

// (numRows == 4)
// ================
// 0 - (numRows-1)*2
// 1  - (numRows-1)+1, (numRows-1)-1) [4,2]
// 2 - ((numRows-1)-1,numRows-1)+1) [2,4]
// 3 - (numRows-1)*2

// var convert=function(s,numRows){let result="";if(s.length<=numRows||numRows===1){return s;}
// const half_size=Math.floor(numRows/2);let offset=half_size*2;if(numRows%2===0){offset--;}
// for(let i=0;i<numRows;i++){let row="";let stepCount=0;let stepSize=0;if(i===0||i===(numRows-1)){stepSize=(numRows-1)*2;}else if((numRows%2!=0)&&(i===(Math.floor(numRows/2)))){stepSize=(numRows-1);}else{stepSize=(numRows-1)+offset;}
// for(let j=i;j<s.length;j=j+stepSize){if(i>0&&i<(numRows-1)){if(stepCount%2===0){stepSize=(numRows-1)+offset;}else{stepSize=(numRows-1)-offset;}}
// row+=(s.charAt(j));stepCount++;}
// offset-=2;result+=row;}
// return result;}

// MIT License

// Copyright (c) [2023] [Brandon Shaver (a.k.a vezcha)]

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
// [Minified]: