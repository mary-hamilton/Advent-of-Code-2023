// Iterate through each line, split into games
// Split the games into colours - don't need to do this? Just need to grab the values associated with the colours
// Extract the value of each colour
// Find the maximum value for each colour
// Compare to the maximum permitted value
// Filter impossible games
// Return sum of possible games' ids


import fs from "fs";
import readline from "readline";

const arrayToReduce = [];

const maxPermittedValues = {
    red: 12,
    green: 13,
    blue: 14
}

const exampleLine = "Game 6: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red"
const getLineID = (line) => {
/*    return first match (+ properties, we don't need them so we only return the first element of the array)
    for a group of 1 or more digits that is followed by a semicolon*/
    return line.match(/\d+(?=:)/)[0];
}

const getColourValues = (line, colour) => {
/*    checks for a group of one or more digits followed by a space and the specified colour, using 'g' flag
    returns an array of all the matches rather than just the first*/
    const pattern = new RegExp(`\\d+(?=\\s${colour})`, 'g')
    return line.match(pattern);
}

const maxColourValue = (line, colour) => {
    return Math.max(...getColourValues(line, colour));
}

const isPlayable = (line, colour) => {
    return maxColourValue(line, colour) <= maxPermittedValues[colour];
}

const validLine = (line) => {
    const lineID = getLineID(line);
    const isValid = (isPlayable(line, "red") && isPlayable(line, "blue") && isPlayable(line, "green"));
    if (isValid) {
        arrayToReduce.push(lineID);
    }
}

const powerOfLine = (line) => {
    return maxColourValue(line, "red") * maxColourValue(line, "blue") * maxColourValue(line, "green");
}


// Run itttt

const fileStream = fs.createReadStream('Day2Input.txt');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    arrayToReduce.push(powerOfLine(line));
});

rl.on('close', () => {
    let answer = arrayToReduce.reduce((a, b) => +a + +b);
    console.log(answer);
});



