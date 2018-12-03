var input = require('./input').input;

var grid = [];
for(var x = 0; x < 1000; x++){
    grid.push([]);
    for(var y = 0; y < 1000; y++){
        grid[x][y] = 0;
    }   
}

function parse(strRow, index){
    try {
        var result = /#(\d+)\s@\s(\d+),(\d+):\s(\d+)x(\d+)/.exec(strRow);
        return {
            id: Number.parseInt(result[1], 10),
            x: Number.parseInt(result[2], 10),
            y: Number.parseInt(result[3], 10),
            width: Number.parseInt(result[4], 10),
            height: Number.parseInt(result[5], 10)
        };
    } catch (ex){
        console.log(ex);
        console.log(index);
    }
}

function addToGrid(claim){
    for(var x = claim.x; x < claim.width + claim.x; x++){
        for(var y = claim.y; y < claim.height + claim.y; y++){
            grid[x][y]++;
        }
    }
}

function isAllOnes(claim){
    for(var x = claim.x; x < claim.width + claim.x; x++){
        for(var y = claim.y; y < claim.height + claim.y; y++){
            if (grid[x][y] !== 1){
                return false;
            }
        }
    }
    return true;
}

var parsedInput = input.map(parse);
parsedInput.forEach(addToGrid);

console.log(parsedInput.filter(isAllOnes));