//Leetcode problem #4 Find Median of Two Sorted Arrays
//status: solved 12.9.23

//additional modifiers:
// - no .sort() method
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