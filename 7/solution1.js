var input = require('./input').input;
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
    for(var i = queue.length - 1; i >= 0; i--){
        if (queue[i].key === stepToRemove.key){
            queue.splice(i, 1);
        }
    }
}

input.forEach(process);

var queue = Object.keys(steps).filter(key => steps[key].pre.length === 0).sort().map(key => steps[key]);
var answer = '';
while (queue.length > 0){
    var step = queue.splice(0,1)[0];
    answer += step.key;
    step.post.forEach(postStep => queue.push(postStep));
    removePreAndPostRequisites(step);
    queue.sort(alphaNoPreRequisites);
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


console.log(answer);