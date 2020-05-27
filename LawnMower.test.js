const { logic,turnLeft,turnRight,forward } = require('../LawnMower');
const top = [5,'',5];
const ini = [1,2,'N']
const seq = "LFLFLFLFF";

test('result of logic must be [ 1, 3, N ]', ()=>{
    
        expect(logic(top,ini,seq)).toEqual([ 1, 3, 'N' ]);
        
});
test('result of Forward must be [ 1, 3, 0 ]', ()=>{
  
        expect(forward(1,2,0)).toStrictEqual([1,3,0]);    
});
test('turnRight should turn Mower to Right North=>East', ()=>{
  
    expect(turnRight(0)).toEqual(1);    
});
test('turnLeft should turn Mower to Right North:0 => West:3', ()=>{
  
    expect(turnLeft(2)).toEqual(1);    
});