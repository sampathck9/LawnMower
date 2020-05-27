var fs = require('fs');
var Direction;
(function (Direction) {
    Direction[Direction["N"] = 0] = "N";
    Direction[Direction["E"] = 1] = "E";
    Direction[Direction["S"] = 2] = "S";
    Direction[Direction["W"] = 3] = "W";
})(Direction || (Direction = {}));
;
function turnLeft(tempD) {
    if (tempD > 3 || tempD < 0) {
        throw new Error('Invalid Direction');
    }
    ;
    --tempD;
    if (tempD < 0)
        tempD = 3;
    return tempD;
}
;
function turnRight(tempD) {
    if (tempD > 3 || tempD < 0) {
        throw new Error('Invalid Direction');
    }
    ;
    ++tempD;
    if (tempD > 3)
        tempD = 0;
    return tempD;
}
;
function forward(tempX, tempY, tempD) {
    switch (tempD) {
        case 0:
            ++tempY;
            break;
        case 1:
            ++tempX;
            break;
        case 2:
            --tempY;
            break;
        case 3:
            --tempX;
            break;
        default:
            console.log("Invalid Direction");
            break;
    }
    return [tempX, tempY, tempD];
}
;
function logic(upperRightXY, initialMowerXY, sequence) {
    var tempX = initialMowerXY[0];
    var tempY = initialMowerXY[1];
    var tempD = +Direction[initialMowerXY[2]];
    for (var _i = 0, sequence_1 = sequence; _i < sequence_1.length; _i++) {
        var instruction = sequence_1[_i];
        if (instruction == 'F') {
            var updated = forward(tempX, tempY, tempD);
            if ((updated[0] > upperRightXY[0]) || (updated[0] < 0) || (updated[1] > upperRightXY[2]) || (updated[1] < 0))
                continue;
            tempX = updated[0];
            tempY = updated[1];
            tempD = updated[2];
        }
        else if (instruction == 'L')
            tempD = turnLeft(tempD);
        else if (instruction == 'R')
            tempD = turnRight(tempD);
        else {
            throw new Error(" Invalid Instructions ");
        }
    }
    ;
    var finalOutput = [tempX, tempY, Direction[tempD]];
    //console.log(tempX, tempY, Direction[tempD]);
    return finalOutput;
}
;
function readAndParse(inputFile) {
    var data = '';
    var numberOfLines = 0;
    var readStream = fs.createReadStream(inputFile, 'utf8');
    readStream.on('data', (function (chunk) {
        data += chunk;
    })).on('end', function () {
        var upperRightXY = data.split('\n')[0];
        for (var i = 0, n = data.length; i < n; ++i) {
            if (data[i] === '\n')
                ++numberOfLines;
        }
        for (var j = 1; j < numberOfLines;) {
            var initialPoint = data.replace(/(\r)/gm, " ").split('\n')[j].split(" ");
            var sequence = data.replace(/(\r)/gm, "").split('\n')[j + 1].split('');
            logic(upperRightXY, initialPoint, sequence);
            j = j + 2;
        }
    });
}
;
readAndParse('twoMowers.txt');
module.exports = { logic: logic, forward: forward, turnLeft: turnLeft, turnRight: turnRight };
