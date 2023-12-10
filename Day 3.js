import fs from "fs";

const input = fs.readFileSync('Day3Input.txt', 'utf8');
const lineArray = input.split('\n');
let answer = 0;

// DOES NOT WORK YET

const isSymbol = (char) => {
    return (/[^\d\.]/).test(char);
}
const doItAll = () => {
    let x = 0;
    while (x < lineArray.length) {
        console.log("Line: " + (x + 1))
        let line = lineArray[x];
        let previousLine = lineArray[x - 1] || lineArray[x];
        let nextLine = lineArray[x + 1] || lineArray[x];
        let numbers = line.match(/\d+/g);
        if (numbers.length > 0) {
            for (let i = 0; i < numbers.length; i++) {
                let flag = false;
                let firstIndex = line.indexOf(numbers[i]) - 1;
                let lastIndex = line.indexOf(numbers[i]) + numbers[i].length;
                if (firstIndex < 0) {
                    firstIndex = 0;
                }
                if (lastIndex > line.length - 1) {
                    lastIndex = line.length - 1;
                }
                if (isSymbol(line[firstIndex]) || isSymbol(line[lastIndex])) {
                    flag = true;
                }
                for (let j = firstIndex; j <= lastIndex; j++) {
                    if (isSymbol(previousLine[j])) {
                        flag = true;
                    }
                    if (isSymbol(nextLine[j])) {
                        flag = true;
                    }
                }
                if (flag) {
                    console.log(numbers[i] + " is going in")
                    answer += +numbers[i];
                } else {
                    console.log(numbers[i] + " is not going in")
                }
            }
        }
        x++;
    }
    console.log(answer);
}
doItAll();





