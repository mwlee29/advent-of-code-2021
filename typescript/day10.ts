import { readFileSync } from "fs";
import _ from "lodash";

export const OpenClosePairs: Record<string, string> = {
  ["("]: ")",
  ["["]: "]",
  ["{"]: "}",
  ["<"]: ">",
};

export const closingCharacters = (function () {
  return _.values(OpenClosePairs);
})();

export const IllegalCharValues: Record<string, number> = {
  [")"]: 3,
  ["]"]: 57,
  ["}"]: 1197,
  [">"]: 25137,
};

export const CompletionCharValues: Record<string, number> = {
  [")"]: 1,
  ["]"]: 2,
  ["}"]: 3,
  [">"]: 4,
};

export function parseInput(input: string): string[][] {
  const lines = input.split(/\r?\n/);
  const chunkLines = lines.map((x) => {
    return x.split("").filter((y) => y !== " ");
  });

  return chunkLines;
}

export function findIllegalCharacter(
  chunks: string[],
  chunkQueue: string[] = []
): string {
  chunkQueue.push(chunks.shift()!);

  while (chunks.length > 0) {
    if (chunkQueue.length === 0) {
      let firstChunk = chunks.shift()!;
      if (closingCharacters.includes(firstChunk) || chunks.length === 0) {
        return firstChunk;
      } else {
        chunkQueue.push(firstChunk);
      }
    }

    let next = chunks.shift()!;
    if (closingCharacters.includes(next)) {
      if (OpenClosePairs[chunkQueue[chunkQueue.length - 1]] === next) {
        chunkQueue.pop();
      } else {
        return next;
      }
    } else {
      chunkQueue.push(next);
    }
  }

  return "";
}

export function calculatePointTotal(illegalChars: string[]): number {
  let total: number = 0;
  illegalChars.forEach((char) => {
    if (!closingCharacters.includes(char))
      throw new Error(`${char} is not an illegal character`);
    total += IllegalCharValues[char];
  });

  return total;
}

export function calculatePointsForIncompleteLine(line: string[]): number {
  let points: number = 0;

  while (line.length > 0) {
    const openChar = line.pop()!;
    const completionChar = OpenClosePairs[openChar];
    points = points * 5 + CompletionCharValues[completionChar];
  }
  return points;
}

export function part1(input: string): number {
  const chunkLines = parseInput(input);
  let illegalChars: string[] = [];
  chunkLines.forEach((chunk, index) => {
    let char = findIllegalCharacter(chunk);
    if (char !== "") {
      illegalChars.push(char);
    }
  });

  return calculatePointTotal(illegalChars);
}

export function part2(input: string) {
  const chunkLines = parseInput(input);
  let incompleteLines: string[][] = [];
  chunkLines.forEach((chunk, index) => {
    let chunkQueue: string[] = [];
    let char = findIllegalCharacter(chunk, chunkQueue);
    if (char === "") {
      incompleteLines.push(chunkQueue);
    }
  });

  let pointsForLines = incompleteLines.map((line) => {
    return calculatePointsForIncompleteLine(line);
  });
  pointsForLines = _.sortBy(pointsForLines);
  return pointsForLines[Math.floor(pointsForLines.length / 2)];
}

if (require.main === module) {
  const input = readFileSync("day10.txt", { encoding: "ascii" });
  console.log(`Day 10, part 1: ${part1(input)}`);
  console.log(`Day 10, part 2: ${part2(input)}`);
}
