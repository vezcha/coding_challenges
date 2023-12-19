var isMatch = function (s, p) {


    while (p.indexOf('**') > -1) {
        // let i = p.indexOf('**');
        p = p.replaceAll('**', '*');
    }

    let re = new RegExp('^' + p + '$');
    return re.test(s);

};

let s1 = "abc";
let p1 = "a***abc";

console.log(isMatch(s1, p1));