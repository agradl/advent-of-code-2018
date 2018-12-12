var input = require('./input');
var state = input.initialState.map((stateStr, i) => ({ val: stateStr, i }));
var log = [];
var generation = 0;
state.forEach((stateObj, i) => {
    if (i === 0){
        stateObj.left = null;
        stateObj.right = state[i+1]
    } else if (i === state.length - 1){
        stateObj.right = null;
        stateObj.left = state[i-1]
    } else {
        stateObj.left = state[i-1];
        stateObj.right = state[i+1];
    }
});
pad();
var rules = input.rules.map(ruleStr => {
    var result = /([#\.]{5})\s=>\s([#\.]{1})/.exec(ruleStr);
    var arr = result[1].split('');
    return {
        left: arr.slice(0, 2),
        target: arr[2],
        right: arr.slice(3, 2),
        result: result[2],
        matchStr: result[1]
    };
});

function pad(){
    var newStart1 = { i: state[0].i - 1, right: state[0], left: null, val: '.' };
    var newStart2 = { i: state[0].i - 2, right: newStart1, left: null, val: '.' };
    newStart1.left = newStart2;
    state[0].left = newStart1;
    var newEnd1 = { i: state[state.length - 1].i + 1, right: null, left: state[state.length - 1], val: '.' };
    var newEnd2 = { i: state[state.length - 1].i + 2, right: null, left: newEnd1, val: '.' };
    newEnd1.right = newEnd2;
    state[state.length - 1].right = newEnd1;
    state.splice(0,0,newStart2, newStart1);
    state.push(newEnd1);
    state.push(newEnd2);
    log.forEach((msg,i) => {
        log[i] = '..' + msg + '..';
    });
}

function next(){
    var alive = [];
    pad();
    state.forEach(stateObj => {
        var current = `${get(stateObj, -2)}${get(stateObj, -1)}${stateObj.val}${get(stateObj, 1)}${get(stateObj, 2)}`
        // console.log(`${generation} ${stateObj.i} ${current}`);
        rules.forEach(rule => {
            // console.log(`rule check ${rule.matchStr} ${current} ${rule.matchStr === current}`)
            if (rule.matchStr === current){
                
                // console.log(`rule ${generation} ${stateObj.i} ${rule.matchStr} ${current} =>     ${rule.result}`)
                
                alive[stateObj.i] = rule.result === '#' ? true : false;
            }
        })
    });
    state.forEach(stateObj => {
        stateObj.val = alive[stateObj.i] ? '#' : '.';
    });
    
}

function get(current, diff){
    var c = current;
    var left = diff < 0;
    while (diff !== 0 && c !== null){
        c = left ? c.left: c.right;
        diff = diff + (left ? 1 : -1);
    }
    return c ? c.val : '.';
}

log.push(state.map(stateObj => stateObj.val).join(''));
var lastSum = getSum();
console.log(`0 ${lastSum}`)
for(generation = 1; generation <= 200; generation++){
    next()
    var newSum = getSum();
    console.log(`${generation} ${newSum} diff of ${newSum - lastSum}`)
    lastSum = newSum;
    log.push(state.map(stateObj => stateObj.val).join(''));
}

console.log('  ' + state.map(stateObj => stateObj.i % 10 === 0 ? `${stateObj.i / 10}` : ' ').join(''));
log.forEach((msg, i) => {
    console.log(`${i % 10} ${msg}`);
});

function getSum(){
    return state.reduce((accum, stateObj) => {
        return accum + (stateObj.val === '#' ? stateObj.i : 0);
    }, 0);
}

console.log(getSum());

console.log((50000000000 - 1000) * 81 + 81798);