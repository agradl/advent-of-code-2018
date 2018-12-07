var file = require('./input');
var input = file        .input;
var workers = file.workers;
var offset = file.offset;
var steps = { };
function process(row){
    var result = /Step ([A-Z]) must be finished before step ([A-Z]) can begin\./.exec(row);
    var first = result[1];
    var second = result[2];
    steps[first] = steps[first] || { key: first, pre:[], post:[] };
    steps[second] = steps[second] || { key: second, pre:[], post:[] };
    steps[first].post.push(steps[second]);
    steps[second].pre.push(steps[first]);
}

function time(letter){
    return letter.charCodeAt(0) - 64 + offset;
}

function removePreAndPostRequisites(stepToRemove){
    Object.keys(steps).forEach(key => {
        var step = steps[key];
        step.pre.forEach((preStep, index) => {
            if (preStep.key === stepToRemove.key){
                step.pre.splice(index,1);
            }
        });
        step.post.forEach((postStep, index) => {
            if (postStep.key === stepToRemove.key){
                step.post.splice(index,1);
            }
        });
        
    });
    removeQueue(stepToRemove);
}
function removeQueue(stepToRemove){
    for(var i = queue.length - 1; i >= 0; i--){
        if (queue[i].key === stepToRemove.key){
            queue.splice(i, 1);
        }
    }
}

input.forEach(process);

var queue = Object.keys(steps).filter(key => steps[key].pre.length === 0).sort().map(key => steps[key]);
var answer = '';
var second = 0;
var inProgress = {};
var processed = {};
function canProcess(workerId){
    return !inProgress[workerId];
}

function beginProcess(workerId, step, currentSecond){
    inProgress[workerId] = { 
        step, 
        completeTime: currentSecond + time(step.key),
        postSteps: step.post.slice()
    };
    processed[step.key] = true;
    removeQueue(step);
}

function processStep(workerId){
    var step = inProgress[workerId].step;
    answer += step.key;
    inProgress[workerId].postSteps.forEach(postStep => {
        if (!processed[postStep.key]){
            queue.push(postStep);
        }
    });
    removePreAndPostRequisites(step);
    queue.sort(alphaNoPreRequisites);
    delete inProgress[workerId];
}

function alphaNoPreRequisites(a, b){
    if (a.pre.length > 0 && b.pre.length > 0) {
        return a.key.localeCompare(b.key);    
    }
    if (a.pre.length > 0){
        return 1;
    }
    if (b.pre.length > 0){
        return -1;
    }
    return a.key.localeCompare(b.key);
}
while(true){
    
    workers.forEach(id => {
        if (inProgress[id] && inProgress[id].completeTime === second){
            processStep(id);
        }
    });
    if (second === 66){
        console.log(JSON.stringify(queue.map(step => step.key)));
    }
    workers.forEach(id => {
        if (canProcess(id) && queue.length > 0 && queue[0].pre.length === 0){
            beginProcess(id, queue.splice(0,1)[0], second);
        }    
    });
    
    console.log(second + ' ' 
    + (inProgress[1] ? inProgress[1].step.key : '.') + '-' + (inProgress[1] ? inProgress[1].completeTime : '.') + ' ' 
    + (inProgress[2] ? inProgress[2].step.key : '.') + '-' + (inProgress[2] ? inProgress[2].completeTime : '.') + ' ' 
    + (inProgress[3] ? inProgress[3].step.key : '.') + '-' + (inProgress[3] ? inProgress[3].completeTime : '.') + ' ' 
    + (inProgress[4] ? inProgress[4].step.key : '.') + '-' + (inProgress[4] ? inProgress[4].completeTime : '.') + ' ' 
    + (inProgress[5] ? inProgress[5].step.key : '.') + '-' + (inProgress[5] ? inProgress[5].completeTime : '.') + ' ' 
    );

    if (answer.length >= Object.keys(steps).length){
        break;
    }
    second++;
    
}
console.log(answer);
console.log(second);