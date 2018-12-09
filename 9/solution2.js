var input = require('./input').input;

var scores = {};
var marble = 1;
var circle = [0];
var currentIndex = 0;
var start = new Date().getTime();
var factor = 100;

var current = { number: 0 };
current.left = current;
current.right = current;
var player = 1;
for (var marble = 1; marble <= input.lastMarble * factor; marble++){
    var player = ((marble - 1) % input.players) + 1
    if (marble % 23 === 0){
        scores[player] = (scores[player] || 0) + marble;
        for (var i = 1; i <= 7; i++){
            current = current.left;
        }

        current.left.right = current.right;
        current.right.left = current.left;
        scores[player]+= current.number;
        current = current.right;
    } else {
        current = current.right;
        var newMarble = { number: marble, left: current, right: current.right };
        current.right.left = newMarble;
        current.right = newMarble;
        current = newMarble;
    }
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

console.log(`took ${new Date().getTime() - start}ms`)