var input = require('./input').input.map((coord, id) => ({ x: coord[0], y: coord[1], id: String.fromCharCode(id + 97) }));

var points = input.reduce((accum, coord) => { accum[coord.x + ',' + coord.y] = coord.id; return accum; }, {});

var getDistance = (coord1, coord2) => Math.abs(coord1.x - coord2.x) + Math.abs(coord1.y - coord2.y);

var threshold = 10000
var max = threshold / 19;
var area = 0
var isInRegion = (currentCoordinate) => {
    var totalDistance = input
        .map(coordinate => getDistance(coordinate, currentCoordinate))
        .reduce((sum, distance) => sum + distance, 0);
    if (totalDistance < threshold){
        area++;
        return points[currentCoordinate.x + ',' + currentCoordinate.y] || '#';
    }
    return points[currentCoordinate.x + ',' + currentCoordinate.y] || ' ';
}

for (var y = max / 2 * -1; y <= max; y++){
    var row = '';
    for (var x = max / 2 * -1; x <= max; x++){
        var id = isInRegion({ x, y })
        row += points[x + ',' + y] === id ? id.toUpperCase() : id;
    }
    // console.log(row);
}

console.log('total area is ' + area)