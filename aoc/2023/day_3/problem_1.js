const fs = require('node:fs');

const sumPartNumbers = function (fileInput) {

    let schematic = readInput(fileInput);
    schematic = schematic.replaceAll('\r', '');

    let lines = schematic.split('\n');
    let sum = 0;

    if (lines.length < 1) {
        return sum;
    }

    //iterate through each line
    for (let i = 0; i < lines.length - 2; i++) {
        if (lines.length === 1) { } //ignore for now
        if (lines.length === 2) { } //ignore for now

        let valids = [];
        let pncsMap = new Map();
        let confirmed = [];

        //assume lines >= 3, read 3 lines at a time, top, mid, bot
        top = i;
        mid = i + 1;
        bot = i + 2;

        if (top === 0) { //read top line only if it is the first line
            pncsMap = findPNCs(lines[top]);
            confirmed = adjCheck(pncsMap, [null, lines[top], lines[mid]]);
            if (confirmed.length > 0) {
                valids = confirmed;
                if (valids.length > 0) {
                    //parse and increment assign to sum
                    let prevSum = sum;
                    for (let j = 0; j < valids.length; j++) {
                        sum += parseInt(valids[j]);
                    }
                    console.log('Valid PNs for line #:', top, valids.toString(), prevSum, sum);
                }
                valids = [];
            }

        }
        //read mid always
        pncsMap = findPNCs(lines[mid]);
        confirmed = adjCheck(pncsMap, [lines[top], lines[mid], lines[bot]]);
        if (confirmed.length > 0) {
            valids = confirmed;
            if (valids.length > 0) {
                //parse and increment assign to sum
                let prevSum = sum;
                for (let j = 0; j < valids.length; j++) {
                    sum += parseInt(valids[j]);
                }
                console.log('Valid PNs for line #:', mid, valids.toString(), prevSum, sum);
            }
            valids = [];
        }

        //read bot only if it is last line
        if (lines[bot] != undefined && bot === (lines.length - 1)) {
            pncsMap = findPNCs(lines[bot]);
            confirmed = adjCheck(pncsMap, [lines[mid], lines[bot], null]);
            if (confirmed.length > 0) {
                valids = confirmed;
                if (valids.length > 0) {
                    //parse and increment assign to sum
                    let prevSum = sum;
                    for (let j = 0; j < valids.length; j++) {
                        sum += parseInt(valids[j]);
                    }
                    console.log('Valid PNs for line #:', bot, valids.toString(), prevSum, sum);

                }
                valids = [];
            }
        }
    }
    return sum;
}

const findPNCs = function (line) {
    let pncRegex = /\d+/g;
    let pncs = line.match(pncRegex);
    let curIndex = 0; pncMap = new Map();
    if (pncs && pncs.length > 0) {
        for (const pnc of pncs) {
            curIndex = line.indexOf(pnc, curIndex);
            pncMap.set(curIndex, pnc);
            curIndex += pnc.length;
        };
    }
    return pncMap;
}

const adjCheck = function (pncMap, block) {
    let prev = block[0], cur = block[1], next = block[2];
    let validPNs = []; symbRegex = /[!@#$%^&*\-+=\/]/;
    let pnc_iterator = pncMap.entries();
    let entry = pnc_iterator.next();
    while (entry != undefined && !entry.done) {
        let pnc = entry.value[1];
        let start = entry.value[0] - 1;
        let end = start + pnc.length + 1;
        //keep range in bounds
        start = start < 0 ? 0 : start;
        if (prev) {
            end = end > prev.length - 1 ? prev.length - 1 : end;
            if (symbRegex.test(prev.substring(start, end + 1))) { //these blocks can be reduced into a loop
                validPNs.push(pnc);
                entry = pnc_iterator.next();
                continue;
            }
        }
        if (cur) {
            end = end > cur.length - 1 ? cur.length - 1 : end;
            if (symbRegex.test(cur.substring(start, end + 1))) {
                validPNs.push(pnc);
                entry = pnc_iterator.next();
                continue;
            }
        }
        if (next) {
            end = end > next.length - 1 ? next.length - 1 : end;
            if (symbRegex.test(next.substring(start, end + 1))) {
                validPNs.push(pnc);
                entry = pnc_iterator.next();
                continue;
            }
        }
        entry = pnc_iterator.next();
    }
    return validPNs;
}


//read input from file
const readInput = function (file) {
    return fs.readFileSync(file, 'utf8', (err) => {
        if (err) throw err;
    });
}


// let answer = sumPartNumbers('./input/sample.txt');
let answer = sumPartNumbers('./input/input.txt');
console.log('solution: ', answer);

//correct is 537732

