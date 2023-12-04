/*
Algorithm solution author: vezcha 11.30.23
Leetcode Problem #42 Trapping Rain Water

Difficulty: Hard [11.30.23]
Test Case Pass Rate: 186/322 [12.3.23]

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

                    //determine if final ascent
                    let isFinalAscent = false;
                    let isStairCaseUp = false;
                    if (r_edge_pos == height.length - 1) {
                        isFinalAscent = true;
                    } else {
                        const remaining_r_edges = height.slice(r_edge_pos + 1);
                        if (height[r_edge_pos] >= Math.max(...remaining_r_edges)) {
                            isFinalAscent = true;
                        } else {
                            isFinalAscent = false;
                            let prevEdgesinRange = height.slice(l_edge_pos, (r_edge_pos - l_edge_pos));
                            if (Math.max(...remaining_r_edges) - height[r_edge_pos] >= 1 && Math.max(...prevEdgesinRange) < Math.max(...remaining_r_edges)) { // and the edges from l_edge to r edge - 1 are not greater than the max reaming r edges
                                isStairCaseUp = true;
                            }
                        }
                    }

                    //determine if its a staircase (r edge pos is not the highest of the remaining)



                    //has enough height difference to hold water
                    if (height[r_edge_pos] - height[r_edge_pos - 1] >= 1 && (isFinalAscent || isStairCaseUp)) {

                        //advance l edge if next edge is greater than previous edge && less than right edge
                        let temp_l_edge_pos = l_edge_pos;
                        while ((height[temp_l_edge_pos + 1] - height[temp_l_edge_pos] > 0)) {
                            temp_l_edge_pos++;
                        }
                        l_edge_pos = temp_l_edge_pos;

                        //calc deep water layers (if any) from top of height downwards
                        for (let k = height[l_edge_pos]; k > 0; k--) {
                            let depth_layer = k;

                            //count water layer units until blocked start at next right
                            for (let l = l_edge_pos + 1; l < r_edge_pos; l++) {
                                let column = l;
                                if (height[column] < depth_layer && depth_layer <= height[r_edge_pos]) { //next edge height is low enough to allow a unit of water and 
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
                        //occur only when there is another lesser high left edge
                        // let temp_l_edge_pos = l_edge_pos;
                        // while (height[temp_l_edge_pos] > height[r_edge_pos] && ((r_edge_pos - temp_l_edge_pos) > 2)) {
                        //     temp_l_edge_pos++;
                        // }
                        // l_edge_pos = temp_l_edge_pos;

                        //calc surface water
                        // totalWater = totalWater + (r_edge_pos - l_edge_pos - 1);

                        //calc deep water layers (if any)
                        for (let k = height[r_edge_pos]; k > 0; k--) {
                            let depth_layer = k;

                            //count water layer units until blocked start at next right
                            for (let l = l_edge_pos + 1; l < r_edge_pos; l++) {
                                let column = l;
                                if (height[column] < depth_layer) { //next edge height is low enough to allow a unit of water
                                    totalWater++;
                                } else if (height[column] == depth_layer) { //next edge is the same level
                                    continue; // to next water unit
                                } else if (height[column] >= height[r_edge_pos]) { //next edge is equal to or higher than right edge, so no unit of water
                                    continue; // to next depth layer (if any)
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

//create textual graph represetnation of depth heights
var visualize = function (height) {

    let result = height.map((x) => x); //create shallow copy

    //sanity check
    if (typeof result != 'object') {
        return
    }

    //[x][~]

    let title = 'Visualiation of ' + result + ' \n' +
        '====================================================\n';
    let line = '';
    let finalOutput = '';

    //iterate through heights
    //if ?>0 then print x, then tab, then subtract 1, then terminate line with \n prepend concat to graph
    while (Math.max(...result) > 0) {
        line = ''; //clear line
        for (let i = 0; i < result.length; i++) {
            if (result[i] > 0) {
                line = line + '[x]  ';
                result[i]--;
            } else {
                line = line + '     ';
            }
            if (i == result.length - 1) {
                line = line + '\n';
            }
        }
        finalOutput = line + finalOutput;
    }

    //prepend concat title
    finalOutput = title + finalOutput;

    //append height pos indicies
    finalOutput += '====================================================\n';
    for (let i = 0; i < result.length; i++) {
        finalOutput += '[' + i + ']  ';
    }

    //once iterated append graph to output, then print output
    console.log(finalOutput);
}

//stump cases
//todo map test cases -> result
let case1 = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]; //6
let case2 = [4, 2, 0, 3, 2, 5]; //9
let case3 = [2, 0, 2];
let case4 = [4, 2, 3];
let case5 = [5, 4, 1, 2];
let case6 = [4, 2, 0, 3, 2, 4, 3, 4];
let case7 = [5, 5, 1, 7, 1, 1, 5, 2, 7, 6];
let case8 = [6, 4, 2, 0, 3, 2, 0, 3, 1, 4, 5, 3, 2, 7, 5, 3, 0, 1, 2, 1, 3, 4, 6, 8, 1, 3]; //83
let case9 = [0, 7, 1, 4, 6];
let case10 = [0, 1, 2, 0, 3, 0, 1, 2, 0, 0, 4, 2, 1, 2, 5, 0, 1, 2, 0, 2]; //26
let case11 = [4, 9, 4, 5, 3, 2] // 1
let case12 = [2, 9, 6, 3, 6, 7, 6] //6

// visualize(case11);
console.log(trap(case12));

//problem case 12;
//case advancement 255/322
//todo debug ascend path to handle middle spikes

//stump cases
console.log("Testing case 1 result: " + trap(case1) + " to be 6");
console.log("Testing case 2 result: " + trap(case2) + " to be 9");
console.log("Testing case 3 result: " + trap(case3) + " to be 2");
console.log("Testing case 4 result: " + trap(case4) + " to be 1");
console.log("Testing case 5 result: " + trap(case5) + " to be 1");
console.log("Testing case 6 result: " + trap(case6) + " to be 10");
console.log("Testing case 7 result: " + trap(case7) + " to be 23");
console.log("Testing case 8 result: " + trap(case8) + " to be 83");
console.log("Testing case 9 result: " + trap(case9) + " to be 7");
console.log("Testing case 10 result: " + trap(case10) + " to be 26");
console.log("Testing case 11 result: " + trap(case11) + " to be 1");
console.log("Testing case 12 result: " + trap(case12) + " to be 6");