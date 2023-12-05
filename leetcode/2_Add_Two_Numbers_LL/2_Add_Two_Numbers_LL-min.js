
/*
* Leetcode Problem #2 Add Two Numbers [Minified/Hash] tool used https://www.toptal.com/developers/javascript-minifier with SHA-256 hash generator https://emn178.github.io/online-tools/sha256.html
* Difficulty: Medium [12.5.23]
*
* Description: You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.
* You may assume the two numbers do not contain any leading zero, except the number 0 itself.

* Algorithm solution author: Brandon Shaver
* Solve Date: [12.5.23 2:15pm CT]
* Version: [1.0.0]
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

//minified and hashed SHA-256 c65f43ed5887c08e6c97cdec1de592c73008b1a4f4eb176fa59583aa3974e0c3
var addTwoNumbers=function(t,e){let l=getListSize(t),n=getListSize(e);l1_int=getFullNumber(t,l),l2_int=getFullNumber(e,n);let $;return"bigint"==typeof l1_int||"bigint"==typeof l2_int?($=BigInt(0),$=BigInt(l1_int)+BigInt(l2_int)):$=l1_int+l2_int,buildRevSumList($)},getListSize=function(t){let e=t;for(list_length=null==t.val?0:1;null!=t.next;)t=t.next,list_length++;return t=e,list_length},getFullNumber=function(t,e){let l,n;e>=15?(l=BigInt(0),n=!0):(l=0,n=!1);for(let $=0;$<e;$++){0!=$&&(t=t.next);let u;n?(u=BigInt(t.val),u=BigInt(u),u=BigInt(BigInt(10)**BigInt($))*u,l=BigInt(l)+BigInt(u)):l+=u=10**$*(u=t.val)}return l},buildRevSumList=function(t){let e=!1,l=10,n=0;"bigint"==typeof t&&(e=!0,l=BigInt(10),n=BigInt(0));let $=new ListNode,u=$,i=[];for(;t/l>n&&t!=n;)i.push(t%l),e?(t=BigInt(t/l),l=BigInt(10),n=BigInt(0)):(t=Math.floor(t/l),l=Number(10),n=Number(0)),t<Number.MAX_SAFE_INTEGER?(t=Number(t),l=Number(10),n=Number(0),e=!1):(t=BigInt(t),e=!0,l=BigInt(10),n=BigInt(0));for(let r=0;r<i.length;r++)$.val=i[r],r!=i.length-1&&($.next=new ListNode,$=$.next);return u};


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