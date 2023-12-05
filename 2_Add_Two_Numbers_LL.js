
/*
* Leetcode Problem #2 Add Two Numbers
* Difficulty: Medium [12.5.23]
*
* Description: You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
* You may assume the two numbers do not contain any leading zero, except the number 0 itself.

* Algorithm solution author: Brandon Shaver
* Solve Date: [12.5.23 2:15pm CT]
*
* Date published: 12.5.23 P(Earth) G(Milky Way) timeline alias - devil shift
* 
* Status [Stable] 12.5.23
* Test Case Pass Rate [1568/1568] 12.5.23
* Subject to copyright protection lasting through 2023 and beyond and before through prophetization effect
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {

    //build the first number
    //iterate through the LL until the end, then get the number
    let l1_length = getListSize(l1);
    let l2_length = getListSize(l2);

    //get full canonical number representations
    l1_int = getFullNumber(l1, l1_length);
    l2_int = getFullNumber(l2, l2_length);

    let sum;
    if (typeof l1_int == 'bigint' || typeof l2_int == 'bigint') {
        sum = BigInt(0);
        sum = BigInt(l1_int) + BigInt(l2_int);
    } else {
        //add together
        sum = l1_int + l2_int;
    }

    //build reverse notation LL
    // console.log('sum is: ' + sum + " and typeof " + typeof sum);
    let sum_list = buildRevSumList(sum);
    //return LL
    return sum_list;
};

var getListSize = function (list) {
    let list_head = list;
    //get length of LL
    if (list.val == null) {
        list_length = 0;
    } else {
        list_length = 1;
    }
    while (list.next != null) {
        list = list.next;
        list_length++;
    }
    list = list_head; //reassign the head
    return list_length;
}

var getFullNumber = function (list, list_length) {

    let number;
    let isBigInt;
    if (list_length >= 15) {
        number = BigInt(0);
        isBigInt = true;
    } else {
        number = 0;
        isBigInt = false;
    }
    let list_head = list;

    for (let i = 0; i < list_length; i++) {
        //traverse list length - (length -  1 - index) # of steps

        // // forward read [highest digit place is first]
        // for (let j = 0; j < list_length - 1 - i; j++) {
        //     list = list.next;
        // }

        //reverse read [lowest digit place is first]
        if (i != 0) {
            list = list.next;
        }

        //extract number
        let value;
        //convert number and increment total
        //multiple # by 10 ^ index of iteration
        if (isBigInt) {
            //extract number
            value = BigInt(list.val);
            value = BigInt(value);
            value = BigInt(BigInt(10) ** BigInt(i)) * value;
            number = BigInt(number) + BigInt(value);
        } else {
            //extract number
            value = list.val;
            value = (10 ** i) * value;
            //increment and assign back to number
            number += value;
        }

        //set back to head, repeat
        // list = list_head;
    }
    return number;
}

var buildRevSumList = function (sum) {

    let isBigInt = false;
    let ten = 10, zero = 0;
    if (typeof sum == 'bigint') {
        isBigInt = true;
        ten = BigInt(10);
        zero = BigInt(0);
    }
    let sumList = new ListNode();
    let sumListHead = sumList;

    let digits = []; //from lowest tenth's place first
    while (sum / ten > zero && sum != zero) {
        digits.push(sum % ten);
        if (isBigInt) {
            sum = BigInt((sum / ten));
            ten = BigInt(10);
            zero = BigInt(0);
        } else {
            sum = Math.floor(sum / ten); //eliminate lowest place digit
            ten = Number(10);
            zero = Number(0);
        }
        if (sum < Number.MAX_SAFE_INTEGER) {
            sum = Number(sum);
            ten = Number(10);
            zero = Number(0);
            isBigInt = false;
        } else {
            sum = BigInt(sum);
            isBigInt = true;
            ten = BigInt(10);
            zero = BigInt(0);
        }
    }

    //build sumList
    //for each digit, assign to List
    for (let i = 0; i < digits.length; i++) {
        sumList.val = digits[i];
        if (i != digits.length - 1) { //if not the last digit
            sumList.next = new ListNode();
            sumList = sumList.next;
        }
    }

    //assign digit to list value,
    return sumListHead;
}

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

var genLLfromArray = function (values) {
    let head = new ListNode();
    let list = head; //create another reference

    //iterate through values
    for (let i = 0; i < values.length; i++) {
        list.val = Number(values[i]);
        if (i != values.length - 1) {
            list.next = new ListNode();
            list = list.next;
        }
    }
    return head;
}


//big int test case:
let l1 = genLLfromArray([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
let l2 = genLLfromArray([5, 6, 4]);

const result = addTwoNumbers(l1, l2);
console.log(result);