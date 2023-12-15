const fs = require('node:fs');

const sumPartNumbers = function (fileInput) {

    let schematic = readInput(fileInput);
    schematic = schematic.replaceAll('\r', '');

    let lines = schematic.split('\n');
    let pn_sum = 0;
    let gr_sum = 0;

    if (lines.length < 1) {
        return pn_sum;
    }

    //iterate through each line of input file , reading 3 lines as a block
    for (let i = 0; i < lines.length - 2; i++) {
        if (lines.length === 1) { } //ignore for now
        if (lines.length === 2) { } //ignore for now

        let pncsMap = new Map();
        //assume lines >= 3, read 3 lines at a time, top, mid, bot
        top = i;
        mid = i + 1;
        bot = i + 2;

        if (top === 0) { //read top line only if it is the first line
            let block = [null, lines[top], lines[mid]];
            let line = lines[top];

            let prevSum = pn_sum;
            let gcs = findGearCandidates(line);
            gr_sum += findGearRatio(gcs, block);

            pncsMap = findPNCs(line);
            valid_pns = findValidPNs(pncsMap, block);
            pn_sum += findPNSum(pncsMap, block);
            console.log('Valid PNs for line #:', top, valid_pns.toString(), prevSum, pn_sum, gr_sum);

        }
        //read mid always
        let block = [lines[top], lines[mid], lines[bot]];
        let line = lines[mid];

        let prevSum = pn_sum;
        let gcs = findGearCandidates(line);
        gr_sum += findGearRatio(gcs, block);

        pncsMap = findPNCs(line);
        valid_pns = findValidPNs(pncsMap, block);
        pn_sum += findPNSum(pncsMap, block);
        console.log('Valid PNs for line #:', mid, valid_pns.toString(), prevSum, pn_sum, gr_sum);


        //read bot only if it is last line
        if (lines[bot] != undefined && bot === (lines.length - 1)) {
            let block = [lines[mid], lines[bot], null];
            let line = lines[bot];

            let gcs = findGearCandidates(line);
            gr_sum += findGearRatio(gcs, block);

            pncsMap = findPNCs(line);
            valid_pns = findValidPNs(pncsMap, block);
            pn_sum += findPNSum(pncsMap, block);
            console.log('Valid PNs for line #:', bot, valid_pns.toString(), prevSum, pn_sum, gr_sum);
        }
    }
    console.log('Gear Ratio Sum: ', gr_sum);
    console.log('Part Number Sum: ', pn_sum);
    return pn_sum;
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

const findGearCandidates = function (line) {
    const gearRegex = /\*/g;
    const gcs = line.match(gearRegex);
    let gci = [];
    let ci = 0;
    if (gcs && gcs.length > 0) {
        for (const gc of gcs) {
            ci = line.indexOf(gc, ci);
            gci.push(ci);
            ci += 1;
        }
    }
    return gci;
}

const findPNSum = function (pncsMap, block) {
    let sum = 0;
    let valids = adjCheck(pncsMap, block);
    if (valids.length > 0) {
        //parse and increment assign to sum
        for (let j = 0; j < valids.length; j++) {
            sum += parseInt(valids[j]);
        }
    }
    return sum;
}

const findValidPNs = function (pncsMap, block) {
    let valids = adjCheck(pncsMap, block);
    return valids;
}

const findGearRatio = function (gcs, block) {
    let gr_sum = 0;
    if (gcs != undefined) {
        for (const gc of gcs) {
            let gp = findAdjPartNumbers(gc, block);
            if (gp.length === 2) {
                let gr = parseInt(gp[0]) * parseInt(gp[1]);
                gr_sum += gr;
            }
        }
    }
    return gr_sum;
}

const findAdjPartNumbers = function (gci, block) {
    let adj = [];
    let PNMaps = [];
    let isGear = true;

    //get PNCs for each line
    for (let i = 0; i < block.length; i++) {
        if (block[i]) {
            let PNCs = findPNCs(block[i]);
            PNMaps.push(PNCs);
        } else {
            PNMaps.push(null);
        }
    }

    let gsi = gci - 1 < 0 ? 0 : gci - 1;
    let gei = gci + 1;

    //iterate through block lines to find adjacents
    for (let i = 0; i < block.length; i++) {
        let line = block[i];
        if (!line) {
            break;
        }
        for (const pnMap of PNMaps[i]) {
            if (pnMap.length < 1) {
                continue;
            }
            let pncSI = pnMap[0];
            let pncEI = pncSI + pnMap[1].length - 1;
            if (!(pncEI < gsi || pncSI > gei)) {
                adj.push(pnMap[1]);
            }
            //invalid if more than 2 adj
            if (adj.length > 2) {
                adj = [];
                isGear = false;
                break;
            }
        }
        if (!isGear) {
            break;
        }
    }
    return adj;
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

let rp = './input/input.txt';
let answer = sumPartNumbers(rp);
console.log('solution: ', answer);

//correct sum is 537732

//gear ratio sum
// 84883664