var input = require('./input').input;

var scores = {};
var marble = 1;
var circle = [0];
var currentIndex = 0;
log('-')
while (marble <= input.lastMarble){
    for(var player = 1; player <= input.players && marble <= input.lastMarble; player++){

        var newIndex = getInsertionPoint();
        if (newIndex !== null){
            circle.splice(newIndex, 0, marble);
            if (newIndex < currentIndex){
                currentIndex++;
            }
            if (indexMath(2) == newIndex || indexMath(-2) == newIndex || marble == 1){
                currentIndex = newIndex;
            }
        } else {
            var indexToRemove = indexMath(-7);
            scores[player] = (scores[player] || 0) + marble + circle[indexToRemove];
            circle.splice(indexToRemove, 1);
            currentIndex = indexToRemove === circle.length ? circle.length - 1 : indexToRemove;
        }
        marble++;
        log(player);
    }
}

function getInsertionPoint(){
    if (marble % 23 == 0){
        return null;
    }
    return indexMath(2);
}

function indexMath(diff){
    var newIndex = diff + currentIndex;
    if (newIndex > circle.length - 1){
        return newIndex - circle.length;
    }
    if (newIndex < 0){
        return circle.length + newIndex;
    }
    return newIndex;
}

function log(player){
    if (!input.verbose){
        return;
    }
    var str = circle.map((num, index) => {
        return index === currentIndex ? `(${num})` : `${num}`;
    }).join(' ');
    console.log(`[${player}] ${str}`);
}

var winner = Object.keys(scores).sort((a,b) => {
    return scores[b] - scores[a];
})[0];

console.log(`winner is player #${winner} with ${scores[winner]}`);
if (input.highScore && input.highScore === scores[winner]){
    console.log('answer correct');
} else if (input.highScore){
    console.log(`expected ${input.highScore} but got ${scores[winner]}`)
}