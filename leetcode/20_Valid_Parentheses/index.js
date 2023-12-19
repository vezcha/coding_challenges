/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {

    let stack = [];

    //iterate through s, pushing and popping to stack
    const open = ['(', '[', '{'];
    const close = [')', ']', '}'];
    for (let i = 0; i < s.length; i++) {

        //scan parenthesis type
        let pType = s[i];

        let openFound = open.find((element) => pType == element);
        let closeFound = close.find((element) => pType == element);

        //push if open
        if (openFound) {
            stack.push(openFound);
        } else if (closeFound) {
            if (closeFound == ']') {
                if (stack.at(-1) == '[') {
                    stack.pop();
                } else {
                    return false;
                }
            } else if (closeFound == ')') {
                if (stack.at(-1) == '(') {
                    stack.pop();
                } else {
                    return false;
                }

            } else if (closeFound == '}') {
                if (stack.at(-1) == '{') {
                    stack.pop();
                } else {
                    return false;
                }
            } else {
                return false; //unknown
            }

        }

    }

    //if stack is empty, return false, else true
    if (stack.length > 0) {
        return false;
    } else {
        return true;
    }
}


let s1 = '(]';
console.log(isValid(s1))