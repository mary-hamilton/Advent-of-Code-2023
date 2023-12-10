// Working on the assumption that sorting smaller arrays was more efficient than sorting a big array;
// I now know that this is not true 🙃

import fs from "fs";

const input = fs.readFileSync('Day7Input.txt', 'utf8');
const lineArray = input.split('\n');

const buckets = {
    highCard: [],
    onePair: [],
    twoPair: [],
    threeOfAKind: [],
    fullHouse: [],
    fourOfAKind: [],
    fiveOfAKind: [],
}

const part1Converter = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
}

const parseInput = (array) => {
    return array.map((line) => {
        return line.split(" ");
    });
}

const tallyCards = (line) => {
    let tally = {};
    for (let i = 0; i < line[0].length; i++) {
        const currentCard = line[0][i];
        tally[currentCard] ? tally[currentCard]++ : tally[currentCard] = 1;
    }
    return tally;
}

const intoBuckets = (line, tally) => {
    const uniqueCards = Object.keys(tally).length;
    let bucket = "";
    switch (uniqueCards) {
        case 1 :
            bucket = "fiveOfAKind"
            break;
        case 2:
            if (Object.values(tally).includes(1)) {
                bucket = "fourOfAKind"
            } else {
                bucket = "fullHouse"
            }
            break;
        case 3:
            if (Object.values(tally).includes(3)) {
                bucket = "threeOfAKind"
            } else {
                bucket = "twoPair"
            }
            break;
        case 4:
            bucket = "onePair"
            break;
        case 5:
            bucket = "highCard"
            break;
        default:
            console.log("Uh oh...")
    }
    buckets[bucket].push(line);
}

const sortByCardRanks = (bucket, converter) => {
    return bucket.sort((a, b) => {
        for (let i = 0; i < a[0].length; i++) {
            const rankA = converter[a[0][i]];
            const rankB = converter[b[0][i]];
            if (rankA !== rankB) {
                return rankA - rankB;
            }
        }
    })
}

const sortByHandType = (handArray, tallier) => {
    handArray.forEach((line) => {
        const tally = tallier(line);
        intoBuckets(line, tally);
    })
}

const orderHands = (tallier, converter) => {
    let orderedHands = [];
    const parsedInput = parseInput(lineArray);
    sortByHandType(parsedInput, tallier);
    for (let bucket in buckets) {
        buckets[bucket] = sortByCardRanks(buckets[bucket], converter);
        orderedHands.push(...buckets[bucket]);
    }
    return orderedHands;
}

const getAnswer = () => {
    const orderedHands = orderHands(tallyCards, part1Converter);
    return orderedHands.reduce((acc, hand, i) => {
        console.log("Hand " + (i + 1) + ", " + hand[1] + " * " + (i + 1))
        return acc += hand[1] * (i + 1);
    }, 0);
}

// --------- Part 2 -----------

const part2Converter = {
    A: 13,
    K: 12,
    Q: 11,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
    J: 1
}

const tallyCardsWithJokers = (line) => {
    let tally = {};
    for (let i = 0; i < line[0].length; i++) {
        const currentCard = line[0][i];
        tally[currentCard] ? tally[currentCard]++ : tally[currentCard] = 1;
    }
    if (tally["J"]) {
        const keyValues = Object.entries(tally);
        let highestKey = "";
        let highestValue = -1;
        for (let keyValue of keyValues) {
            if (keyValue[0] === "J") {
                continue;
            }
            if (keyValue[1] > highestValue) {
                highestValue = keyValue[1];
                highestKey = keyValue[0];
            }
        }
        tally[highestKey] += tally["J"];
        delete tally["J"];
    }
    return tally;
}

const getAnswerPart2 = () => {
    const orderedHands = orderHands(tallyCardsWithJokers, part2Converter);
    return orderedHands.reduce((acc, hand, i) => {
        console.log("Hand " + (i + 1) + ", " + hand[1] + " * " + (i + 1))
        return acc += hand[1] * (i + 1);
    }, 0);
}

console.log(getAnswerPart2())

