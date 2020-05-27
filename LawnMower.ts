var fs = require('fs');

enum Direction{ N,E,S,W };

function turnLeft(tempD:Direction){
        
    if(tempD > 3 || tempD < 0 ){
        throw new Error('Invalid Direction')
    };
        --tempD;
        if(tempD < 0) tempD = 3;
        return tempD;
    };

function turnRight(tempD:Direction){

    if(tempD > 3 || tempD < 0 ){
        throw new Error('Invalid Direction')
    };
        ++tempD;
        if(tempD > 3) tempD = 0;
        return tempD;    
    };

function forward(tempX:number, tempY:number, tempD:Direction){

   switch(tempD){
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
        return [tempX,tempY,tempD];
};

function logic(upperRightXY:any, initialMowerXY:any, sequence:string[]){
        
        var tempX:number = initialMowerXY[0];
        var tempY:number = initialMowerXY[1];
        var tempD:Direction = +Direction[initialMowerXY[2]];
        
        for(let instruction of sequence){
            if(instruction == 'F') {
                let updated = forward(tempX,tempY,tempD);
                if((updated[0] > upperRightXY[0]) || (updated[0] < 0) || (updated[1] > upperRightXY[2]) || (updated[1] < 0)) continue;
                tempX = updated[0];
                tempY = updated[1];
                tempD = updated[2];
                }
               else if(instruction == 'L') tempD = turnLeft(tempD);
               else if(instruction == 'R') tempD = turnRight(tempD);
               else { throw new Error(" Invalid Instructions ");}
            };
            var finalOutput = [tempX, tempY, Direction[tempD]]; 
            //console.log(tempX, tempY, Direction[tempD]);
            return finalOutput;
};


function readAndParse(inputFile:string){

    var data = '';
    var numberOfLines = 0;
    var readStream = fs.createReadStream(inputFile, 'utf8');
    readStream.on('data', (function(chunk: any) {
        data += chunk;
    })).on('end', function() {
        var upperRightXY = data.split('\n')[0];
        for( let i = 0, n = data.length;  i < n;  ++i ) {
            if( data[i] === '\n' )  ++numberOfLines; 
        }
        for(let j=1 ; j < numberOfLines ; )
        {
            const initialPoint = data.replace(/(\r)/gm," ").split('\n')[j].split(" ");
            const sequence = data.replace(/(\r)/gm,"").split('\n')[j+1].split('');
            logic(upperRightXY,initialPoint,sequence);
            j = j+2;            
        }
    });    
};
readAndParse('twoMowers.txt');



module.exports = {logic,forward,turnLeft,turnRight};

