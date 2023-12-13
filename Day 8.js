import fs from "fs";

const input = fs.readFileSync('Day8Input.txt', 'utf8');
const inputArray = input.split('\n');
const myMap = new Map();
const movementArray = inputArray[0];

const parseInput = () => {
    for (let i = 2; i < inputArray.length; i++) {
        const [ key, left, right ] = inputArray[i].match(/[A-Z]+/g);
        myMap.set(key, [left, right]);
    }
}
parseInput();

const getMoves = (node) => {
    let steps = 0;
    let value = myMap.get(node);
    let nextKey = node;
    while (nextKey[2] !== "Z") {
        const nextMovement = movementArray[steps % movementArray.length];
        if (nextMovement === "R") {
            nextKey = value[1];
        }
        if (nextMovement === "L") {
            nextKey = value[0];
        }
        value = myMap.get(nextKey);
        steps++
    }
    return steps;
}

//------------ Part 2 ---------

const getThreadKeys = () => {
    const keys = myMap.keys()
    let threadKeys = [];
    for (const key of keys) {
        if (key[2] === "A") {
            threadKeys.push(key);
        }
    }
    return threadKeys;
}

const getThreadMoves = () => {
    const threadKeys = getThreadKeys()
    let moveTotals = [];
    while (moveTotals.length < threadKeys.length) {
        threadKeys.forEach((threadValue, i) => {
            moveTotals[i] = getMoves(threadValue);
        })
    }
    return moveTotals;
}

const getLowestCommonMultiple = () => {
    const moveTotals = getThreadMoves();
    const getGreatestCommonDivisor = (a, b) => {
        return a ? getGreatestCommonDivisor(b % a, a) : b;
    }
    return moveTotals.reduce((acc, el) => {
        return (acc * el) / getGreatestCommonDivisor(acc, el)
    })
}

const answer = getLowestCommonMultiple();
console.log(answer)



