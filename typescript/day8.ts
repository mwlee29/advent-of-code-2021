import { readFileSync } from "fs";
import _, { flatten, keys, keysIn, property, propertyOf } from "lodash";

export type Entry = {
  signalPatterns: string[];
  outputValue: string[];
};

/*
 0000
1    2
1    2
 3333  
4    5
4    5
 6666

  0: 0, 1, 2, 4, 5, 6     6
  1: 2, 5                 2
  2: 0, 2, 3, 4, 6        5
  3: 0, 2, 3, 5, 6        5
  4: 1, 2, 3, 5           4
  5: 0, 1, 3, 5, 6        5
  6: 0, 1, 3, 4, 5, 6     6
  7: 0, 2, 5              3
  8: 0, 1, 2, 3, 4, 5, 6  7
  9: 0, 1, 2, 3, 5, 6     6
 */

export const clockNumbers = [
  "1110111",
  "0010010",
  "1011101",
  "1011011",
  "0111010",
  "1101011",
  "1101111",
  "1010010",
  "1111111",
  "1111011",
];

export const getNewSegmentCandidates = function () {
  let candidates: string[][] = [];
  for (let i = 0; i < clockNumbers[i].length; i++) {
    candidates.push("1111111".split(""));
  }
  return candidates;
};

const numbersByPattern = _.invert(clockNumbers);

export const clockNumberLengths = (function () {
  let lengths: number[] = [];
  for (let i in clockNumbers) {
    lengths.push(_.sum(i.split("").map((x) => parseInt(x))));
  }
  return lengths;
})();

export function parseInput(input: string): Entry[] {
  const lines = input.split(/\r?\n/);
  const splitInput = lines.map((x) => x.split(" | "));
  const parsedInput = splitInput.map((x) => {
    return {
      signalPatterns: x[0].split(/\s/).filter((y) => y !== ""),
      outputValue: x[1].split(/\s/).filter((y) => y !== ""),
    };
  });
  return parsedInput;
}

export function findEasyNumbers(pattern: string[]) {
  let filteredPatterns: string[] = [];
  pattern.forEach((x) => {
    if ([2, 3, 4, 7].includes(x.length)) filteredPatterns.push(x);
  });

  return filteredPatterns;
}

export function findNumbersForEntry(entry: string): number[] {
  let lengths: number[] = [];
  clockNumberLengths.forEach((c) => {
    if (c === entry.length) lengths.push(c);
  });
  return lengths;
}

export function filterSegmentCandidate(
  entryPossibleValues: string[],
  segmentCandidate: string[]
) {}

export function part1(input: string) {
  let entries = parseInput(input);
  let patterns = entries.map((x) => x.outputValue);
  let filteredPatterns = patterns.map((pattern) => findEasyNumbers(pattern));
  let count = _.sumBy(filteredPatterns, (x) => x.length);
  return count;
}

export function part2(input: string) {
  const entries = parseInput(input);
  let currentClockNumbers = clockNumbers;
  let segmentCandidates = getNewSegmentCandidates();
  // Get New candidates
  // Find which lengths match up with each entry in signal patterns
  // Find which entries it would be if pattern was in order
  // Intersection on those entries
}

if (require.main === module) {
  const input = readFileSync("day8.txt", "utf-8");
  console.log(`Day 8, part 1: ${part1(input)}`);
  console.log(`Day 8, part 2: ${part2(input)}`);
}
