/* Iterate through each line from each end, grab first digit
combine digits, convert to number
sum all numbers
 */

import * as fs from "fs";
import * as readline from "readline";

const numConversion = {
    one: "o1e",
    two: "t2o",
    three: "t3e",
    four: "f4r",
    five: "f5e",
    six: "s6x",
    seven: "s7n",
    eight: "e8t",
    nine: "n9e",
}
const isDigit = (char) => {
    if (char.matches("\\d")) {
        return char;
    }
}

const firstDigit = (line) => {
    let firstDigit;
    for (let i = 0; i < line.length; i++) {
        if (line[i].match("\\d")) {
            firstDigit = line[i];
            break;
        }
    }
    return firstDigit;
}

const lastDigit = (line) => {
    let lastDigit;
    for (let i = line.length -1; i >= 0; i--) {
        if (line[i].match("\\d")) {
            lastDigit = line[i];
            break;
        }
    }
    return lastDigit;
}

const allMatches = (line) => {
    return line.match(/(one|two|three|four|five|six|seven|eight|nine|\d)/g);
}

const toDigit = (word) => {
    if (!word.match("\\d")) {
        return numConversion[word].toString();
    }
    return word.toString();
}

const replaceWords = (line) => {

}

const fileStream = fs.createReadStream('Day1Input.txt');

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const answerArray = [];
rl.on('line', (line) => {
    answerArray.push(toDigit(allMatches(line)[0]) + toDigit(allMatches(line)[allMatches(line).length - 1]));
});

rl.on('close', () => {
    let answer = answerArray.reduce((a, b) => +a + +b);
    console.log(answer);
    console.log('Finished reading the file.');
});




