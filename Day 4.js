import fs from "fs";

const input = fs.readFileSync('Day4Input.txt', 'utf8');
const lineArray = input.split('\n');

const parseLine = (line) => {
    const splitLine = line.split(/[:|]/);
    const [ , winningNumbers, yourNumbers ] = splitLine;
    return [winningNumbers.trim().split(/\s+/), yourNumbers.trim().split(/\s+/)];
}

const getMatchPoints = (parsedLine) => {
    const [ winningNumbers, yourNumbers ] = parsedLine;
    let matchPoints = 0;
    winningNumbers.forEach((winNum) => {
        if (yourNumbers.includes(winNum)) {
            matchPoints === 0 ? matchPoints = 1 : matchPoints *= 2;
        }
    })
    return matchPoints;
}

const getAnswerPart1 = () => {
    let answer = lineArray.reduce((acc, line) => {
        const parsedLine = parseLine(line);
        const matchPoints = getMatchPoints(parsedLine);
        return acc += matchPoints;
    }, 0)
    console.log(answer)
}

// -------- Part 2 -------------

const getMatches = (parsedLine) => {
    const { winningNumbers, yourNumbers } = parsedLine;
    let matches = 0;
    winningNumbers.forEach((winNum) => {
        if (yourNumbers.some((yourNum) => yourNum === winNum)) {
            matches += 1;
        }
    })
    return matches;
}

const parsedLineWithTally = (parsedLine) => {
    return ({
        tally: 1,
        winningNumbers: parsedLine[0],
        yourNumbers: parsedLine[1]
    })
}

const incrementTally = (times, lineWithTally) => {
    lineWithTally.tally += times;
}

const convertToTallied = () => {
    let talliedInput = [];
    for (let i = 0; i < lineArray.length; i++) {
        talliedInput[i] = parsedLineWithTally(parseLine(lineArray[i]));
    }
    return talliedInput;
}



const tallySubsequent = (inputArray) => {
    for (let i = 0; i < inputArray.length; i++) {
        const matches = getMatches(inputArray[i]);
        for (let j = 1; j <= matches; j++) {
            incrementTally(inputArray[i].tally, inputArray[i + j]);
        }
    }
}

const getAnswerPart2 = () => {
    const talliedInput = convertToTallied(lineArray);
    tallySubsequent(talliedInput);
    let answer = talliedInput.reduce((acc, line) => acc += line.tally, 0);
    console.log(answer);
}

getAnswerPart1()








