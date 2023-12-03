/*
Algorithm solution author: vezcha 11.30.23
Leetcode Problem #42 Trapping Rain Water

Difficulty: Hard [11.30.23]
Test Case Pass Rate: 79/322 [12.2.23]

Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

Topics:
============
Array
Two Pointers
Dynamic Programming
Stack
Monotonic Stack


Solution unique modifiers:
===================
 Stackless
*/



/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {

    let totalWater = 0;
    let hasPotentialWater = false;

    //sanity checks
    if (height.length > 2 && Math.max(...height) > 0) {
        hasPotentialWater = true;
    }

    if (!hasPotentialWater) {
        return totalWater;
    }

    //calc water between two edges
    //iterate through height data set
    //find a left edge
    for (let i = 0; i < height.length; i++) {
        if (height[i] > 0) {
            let l_edge_pos = i;
            //find a right edge
            for (let j = i + 1; j < height.length; j++) {
                let r_edge_pos = j;
                let l_edge_pos = i;

                //distance between edges contains a gap and non-zero height edges
                if (height[l_edge_pos] > 0 && height[r_edge_pos] > 0 && r_edge_pos - l_edge_pos > 1 && height[l_edge_pos] <= height[r_edge_pos]) { //ascending gap found

                    //has enough height difference to hold water
                    if (height[r_edge_pos] - height[r_edge_pos - 1] >= 1) {
                        //calc surface water
                        // totalWater = totalWater + (r_edge_pos - l_edge_pos - 1);

                        //calc deep water layers (if any)
                        for (let k = height[l_edge_pos]; k > 0; k--) {
                            let depth_layer = k;

                            //count water layer units until blocked start at next right
                            for (let l = l_edge_pos + 1; l < r_edge_pos; l++) {
                                let column = l;
                                if (height[column] < depth_layer) { //next edge height is low enough to allow a unit of water
                                    totalWater++;
                                } else if (height[column] == depth_layer) { //next edge is the same level
                                    continue; // to next water unit
                                } else if (height[column] >= height[r_edge_pos]) { //next edge is equal to or higher than right edge, so no unit of water
                                    break; // to next depth layer (if any)
                                } else {
                                    continue;
                                }
                            }
                        }
                        //since water calculated re-align left and right edges for next iteration (decrement to counterbalance for loop increment)
                        //set right ledge to left ledge
                        i = j;
                        //right ledge is left ledge + 1
                        j = i + 1;
                        continue;
                    }
                } else if (height[l_edge_pos] > 0 && height[r_edge_pos] > 0 && r_edge_pos - l_edge_pos > 1 && height[l_edge_pos] >= height[r_edge_pos]) { //descending gap found

                    //determine if final descent
                    let isFinalDescent = false;
                    if (r_edge_pos == height.length - 1) {
                        isFinalDescent = true;
                    } else {
                        const remaning_r_edges = height.slice(r_edge_pos + 1);
                        if (height[r_edge_pos] >= Math.max(...remaning_r_edges)) {
                            isFinalDescent = true;
                        } else {
                            isFinalDescent = false;
                        }
                    }

                    if (height[r_edge_pos] - height[r_edge_pos - 1] > 0 && isFinalDescent) {

                        //if l edge height is greater than r edge, then advance left edge until its equal height or 1 pos away
                        let temp_l_edge_pos = l_edge_pos;
                        while (height[temp_l_edge_pos] > height[r_edge_pos] && ((r_edge_pos - temp_l_edge_pos) > 2)) {
                            temp_l_edge_pos++;
                        }
                        l_edge_pos = temp_l_edge_pos;

                        //calc surface water
                        totalWater = totalWater + (r_edge_pos - l_edge_pos - 1);

                        //calc deep water layers (if any)
                        for (let k = height[r_edge_pos] - 2; k > 0; k--) {
                            let depth_layer = k;

                            //count water layer units until blocked start at next right
                            for (let l = l_edge_pos + 1; l_edge_pos < r_edge_pos; l++) {
                                let column = l;
                                if (height[column] < depth_layer) { //next edge height is low enough to allow a unit of water
                                    totalWater++;
                                } else if (height[column] == depth_layer) { //next edge is the same level
                                    continue; // to next water unit
                                } else if (height[column] >= height[r_edge_pos]) { //next edge is equal to or higher than right edge, so no unit of water
                                    break; // to next depth layer (if any)
                                } else {
                                    continue;
                                }
                            }
                        }
                        //since water calculated re-align left and right edges for next iteration (decrement to counterbalance for loop increment)
                        //set right ledge to left ledge
                        i = j;
                        //right ledge is left ledge + 1
                        j++;
                        continue;
                    }

                } else {
                    continue; //looking for a gap
                }
            }
        } else {
            continue; // looking for edge
        }
    }
    return totalWater;
};


let case1 = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]; //6
let case2 = [4, 2, 0, 3, 2, 5]; //9
let case3 = [2, 0, 2];
let case4 = [4, 2, 3];
let case5 = [5, 4, 1, 2];
let case6 = [4, 2, 0, 3, 2, 4, 3, 4];
let case7 = [5, 5, 1, 7, 1, 1, 5, 2, 7, 6];
let case8 = [6, 4, 2, 0, 3, 2, 0, 3, 1, 4, 5, 3, 2, 7, 5, 3, 0, 1, 2, 1, 3, 4, 6, 8, 1, 3];

console.log(trap(case8));

//problem case 8;
//case advancement 87/322


//stump cases
console.log("Testing case 1 result: " + trap(case1) + " to be 6");
console.log("Testing case 2 result: " + trap(case2) + " to be 9");
console.log("Testing case 3 result: " + trap(case3) + " to be 2");
console.log("Testing case 4 result: " + trap(case4) + " to be 1");
console.log("Testing case 5 result: " + trap(case5) + " to be 1");
console.log("Testing case 6 result: " + trap(case6) + " to be 10");
console.log("Testing case 7 result: " + trap(case7) + " to be 23");
console.log("Testing case 8 result: " + trap(case8) + " to be 83");
