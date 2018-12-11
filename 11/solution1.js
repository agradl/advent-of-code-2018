var input = require('./input').input

var serialNumber = input.serialNumber;
var gridSize = input.gridSize;

var grid = [];
for(var x = 1; x <= gridSize; x++){
    grid[x-1] = grid[x-1] || [];
    for(var y = 1; y <= gridSize; y++){
        grid[x-1].push(powerOf( x, y ));
    }
}

function powerOf(x, y){
    var rackID = x + 10;
    var power = (rackID * (rackID * y + serialNumber)).toString();
    var hundredsDigit = power.length >= 3 ? power.substr(power.length - 1 - 2, 1) : 0;
    return Number.parseInt(hundredsDigit, 10) - 5;
}

function powerOf3x3(inputX, inputY, log){
    if (inputX + 2 > gridSize || inputY + 2 > gridSize){
        return 0;
    }
    var maxX = inputX + 2;
    var maxY = inputY + 2;
    var total = 0;
    for(var y = inputY; y <= maxY; y++){
        var row = '';
        for(var x = inputX; x <= maxX; x++){
            total += grid[x-1][y-1];
            var power = grid[x-1][y-1] + '';
            row += ` ${power.length === 1 ? ' ' + power : power} `;
        }
        if (log){
            console.log(row);
        }
    }
    return total;
}

var max = {x: 1, y: 1, power: grid[0][0]};

for(var x = 1; x <= gridSize; x++){
    for(var y = 1; y <= gridSize; y++){
        var power = powerOf3x3(x, y);
        
        if (power > max.power){
            max.power = power;
            max.x = x;
            max.y = y;
        }
    }
}

console.log(`max is ${JSON.stringify(max)}`);

if (input.expectCoordinate){
    console.log(`expected ${max.x},${max.y} with power ${max.power} to be ${input.expectCoordinate} with power ${input.expectPower} `);
}