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

const getMoves = () => {
    parseInput();
    let steps = 0;
    let value = myMap.get("AAA");
    let nextKey;
    while (nextKey !== "ZZZ") {
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
// Brute force, does not work!
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
const moveThread = (threadID, nextMovement, value, threadValues, endsInZ) => {
    let nextKey;
    endsInZ[threadID] = false;
    if (nextMovement === "R") {
        nextKey = value[1];
    }
    if (nextMovement === "L") {
        nextKey = value[0];
    }
    if (nextKey[2] === "Z") {
        endsInZ[threadID] = true;
    }
    threadValues[threadID] = myMap.get(nextKey);
}

const getMovesPart2 = () => {
    parseInput();
    let steps = 0;
    let threadValues = getThreadKeys().map((key) => {
        return myMap.get(key);
    });
    let endsInZ = [ false ];
    while (!endsInZ.every(e => e)) {
        const nextMovement = movementArray[steps % movementArray.length];
        threadValues.forEach((threadValue, i) => {
            return moveThread(i, nextMovement, threadValue, threadValues, endsInZ);
        })
        steps++
    }
    return steps;
}

