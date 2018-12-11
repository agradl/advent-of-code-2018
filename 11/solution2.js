var input = require('./input').input
var serialNumber = input.serialNumber;
var gridSize = input.gridSize;
var lastSizeSum = [];
var power = [];
for(var x = 1; x <= gridSize; x++){
    power[x-1] = power[x-1] || [];
    lastSizeSum[x-1] = lastSizeSum[x-1] || [];
    for(var y = 1; y <= gridSize; y++){
        power[x-1].push(powerOf( x, y ));
        lastSizeSum[x-1][y-1] = 0
    }
}

function powerOf(x, y){
    var rackID = x + 10;
    var power = (rackID * (rackID * y + serialNumber)).toString();
    var hundredsDigit = power.length >= 3 ? power.substr(power.length - 1 - 2, 1) : 0;
    return Number.parseInt(hundredsDigit, 10) - 5;
}

var maxSum  = 0;
var maxPosition;

for (var size = 1; size <= 300; size++){
    for (var x = 1; x <= input.gridSize - size + 1; x++){
        for (var y = 1; y <= input.gridSize - size + 1; y++){
            var sum = lastSizeSum[x-1][y-1];
            for (var dx = x; dx <= x + size - 1; dx++){
                sum = sum + power[dx-1][y + size - 2];
            }
            for (var dy = y; dy <= y + size - 2; dy++){
                sum = sum + power[x + size - 2][dy-1];
            }
            lastSizeSum[x-1][y-1] = sum;
            if (sum > maxSum){
                maxSum = sum;
                maxPosition = `${x},${y},${size}`
            }
        }
    }
}

console.log(`max is ${maxPosition} with sum ${maxSum}`);

if (input.expectCoordinate){
    console.log(`expected ${maxPosition} with power ${maxSum} to be ${input.expectCoordinate} with power ${input.expectPower} `);
}