//Leetcode problem #4 Find Median of Two Sorted Arrays
//status: solved 12.9.23

//additional modifiers:
// - no .sort() method

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
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {

    let sorted = mergedArrays(nums1, nums2);

    let median = 0;

    if (sorted.length > 0) {
        if (sorted.length % 2 != 0) { //odd
            medianIndex = Math.floor(sorted.length / 2);
            median = sorted[medianIndex];
        } else { //even
            let leftIndex = Math.floor(sorted.length / 2) - 1;
            let rightIndex = Math.floor(sorted.length / 2);
            median = (sorted[leftIndex] + sorted[rightIndex]) / 2;
        }
    } else {
        return median;
    }

    return median;
};

var mergedArrays = function (nums1, nums2) {

    let sortedArray = [];
    let i = 0, j = 0;

    while (i < nums1.length || j < nums2.length) { //unscanned items
        if (i === nums1.length && j < nums2.length) { //nums 1 is exhausted
            sortedArray.push(nums2[j]);
            j++;
        } else if (j === nums2.length && i < nums1.length) { //nums 2 is exhausted
            sortedArray.push(nums1[i]);
            i++;
        } else { //neither exhausted
            if (nums1[i] < nums2[j]) {
                sortedArray.push(nums1[i]);
                i++;
            } else {
                sortedArray.push(nums2[j]);
                j++;
            }
        }
    }
    return sortedArray;
}

export { findMedianSortedArrays, mergedArrays };

//[minified version]
// var findMedianSortedArrays=function(nums1,nums2){let sorted=mergedArrays(nums1,nums2);let median=0;if(sorted.length>0){if(sorted.length%2!=0){medianIndex=Math.floor(sorted.length/2);median=sorted[medianIndex];}else{let leftIndex=Math.floor(sorted.length/2)-1;let rightIndex=Math.floor(sorted.length/2);median=(sorted[leftIndex]+sorted[rightIndex])/2;}}else{return median;}
// return median;};var mergedArrays=function(nums1,nums2){let sortedArray=[];let i=0,j=0;while(i<nums1.length||j<nums2.length){if(i===nums1.length&&j<nums2.length){sortedArray.push(nums2[j]);j++;}else if(j===nums2.length&&i<nums1.length){sortedArray.push(nums1[i]);i++;}else{if(nums1[i]<nums2[j]){sortedArray.push(nums1[i]);i++;}else{sortedArray.push(nums2[j]);j++;}}}       
// return sortedArray;}

let case1_nums1 = [1, 3];
let case1_nums2 = [2];

let case2_nums1 = [1, 2];
let case2_nums2 = [3, 4];

console.log(findMedianSortedArrays(case2_nums1, case2_nums2));