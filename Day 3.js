import fs from "fs";

const input = fs.readFileSync('Day3Input.txt', 'utf8');
const lineArray = input.split('\n');
let answer = 0;

// Think I need to deal with each line, pull the numbers and their indices including the preceding and following indices
// Then take the next line and check if there are any symbols in those index slots, and if so, add the corresponding number to the answer
// Then proceed again but with the next line as the intial line
// But I need to check for adjaecnt symbls on the same line, and I need to nt count numbers twice if they're
// Adjacent to more than one symbol. Replace them with dots once counted?

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





