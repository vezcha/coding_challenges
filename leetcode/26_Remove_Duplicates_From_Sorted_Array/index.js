// Leetcode
// Status [Solved]

//todo seek to understand why this is slow and how to remove nested loop

// 26. Remove Duplicates from Sorted Array
// Easy
// Topics
// Companies
// Hint
// Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. The relative order of the elements should be kept the same. Then return the number of unique elements in nums.

// Consider the number of unique elements of nums to be k, to get accepted, you need to do the following things:

// Change the array nums such that the first k elements of nums contain the unique elements in the order they were present in nums initially. The remaining elements of nums are not important as well as the size of nums.
// Return k.
// Custom Judge:

// The judge will test your solution with the following code:

// int[] nums = [...]; // Input array
// int[] expectedNums = [...]; // The expected answer with correct length

// int k = removeDuplicates(nums); // Calls your implementation

// assert k == expectedNums.length;
// for (int i = 0; i < k; i++) {
//     assert nums[i] == expectedNums[i];
// }
// If all assertions pass, then your solution will be accepted.

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {

    let k = 0;

    for (let i = 0; i < nums.length; i++) {
        if (i === 0) k++;
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] < nums[j]) {
                k++;
                if (j != (i + 1)) nums[i + 1] = nums[j];
                break;
            } else if (nums[i] > nums[j]) {
                continue;
            } else {
                continue;
            }
        }
        if (nums[i] > nums[i + 1]) break;
    }
    console.log(nums);
    return k;
};

// pseudo
// let k=0;
// left pointer iterate through array (stop when nums[i] < nums[i-1] after 1st read)
// 	i==0, k++
// 	right pointer iterate through array starting at i+1
// 		if nums[i] < nums[j] then unique found
// 			k++
// 			nums[i+1] = nums[j]
// 			break //back to next left pointer
// 		else if nums[i] > nums[j]
// 			break; //done
// 		else
// 			continue
// 	if nums[i] > nums[i+1] then break
// return k


let case1 = [1, 1, 2];
let case2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
let case3 = [1];

export { removeDuplicates };

console.log(removeDuplicates(case1));
console.log(removeDuplicates(case2));
console.log(removeDuplicates(case3));