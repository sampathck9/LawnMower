# LawnMower

#How to Run

npm install -g tsc ;
npm install @types/node --save-dev;
tsc --init;                               /*: open tsconfig.json=>change "target": "es5" to "target": "es6"*/
tsc LawnMower.ts;
npm install --save-dev jest;              /*: open package.json change test to "jest"*/
npm test;

to see the result:
remove comment from //console.log(tempX, tempY, Direction[tempD]); in LawnMower.ts :66 to console.log(tempX, tempY, Direction[tempD])

tsc LawnMower.ts;
node LawnMower.js;
