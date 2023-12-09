// You have as many options as you have milliseconds
// You increment through from 0 to milliseconds
// For each option, i, your distance is (milliseconds - i) * i
// You filter your result array for values that are higher than the race record
// The multiply all those values together

import fs from "fs";

const input = fs.readFileSync('Day6Input.txt', 'utf8');
const lineArray = input.split('\n');

const parseInput = () => {
    const [ , ...times] = lineArray[0].split(/\s+/);
    const [ , ...distances ] = lineArray[1].split(/\s+/);
    return [times, distances];
}
const getMaxDistance = (time, buttonHold) => {
    return (time - buttonHold) * buttonHold;
}

const getMaxDistances = (time) => {
    let maxDistances = [];
    for (let i = 0; i <= time; i++) {
        maxDistances[i] = getMaxDistance(time, i)
    }
    return maxDistances;
}

const getWinningDistances = (maxDistances, distances, index) => {
   return maxDistances.filter((distance) => distance > distances[index]);
}

const getNumOfWinningDistances = (winningDistances) => {
    return winningDistances.length;
}

const getAnswerPart1 = () => {
    const [ times, distances ] = parseInput();
    return times.reduce((acc, time, i) => {
        const maxDistances = getMaxDistances(time);
        const winningDistances = getWinningDistances(maxDistances, distances, i);
        const numOfWinningDistances = getNumOfWinningDistances(winningDistances);
        return acc *= numOfWinningDistances;
    }, 1);
}

//-------------- Part 2 -----------

const parseInputPart2 = (parsedInputPart1) => {
    const [ times, distances ] = parsedInputPart1;
    return [[times.join("")], [distances.join("")]]
}

const getAnswerPart2 = () => {
    const [ time, distance ] = parseInputPart2(parseInput());
    const maxDistances = getMaxDistances(time[0]);
    const winningDistances = getWinningDistances(maxDistances, distance, 0);
    return getNumOfWinningDistances(winningDistances);
}

console.log(getAnswerPart2())

