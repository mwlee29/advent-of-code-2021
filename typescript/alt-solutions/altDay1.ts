import fs from "fs"
import { part2 } from "../day1";

export function parseInput(input: string): number[] {
  const inputParsed: number[] = input.split('\n').map(x => parseInt(x));

  return inputParsed;
}

export function altPart1(input: string): number {
  let countIncrease: number = 0;

  const inputParsed = parseInput(input);

  inputParsed.forEach((value, index, arr) => {
    if (index - 1 < 0) return

    if (value > arr[index - 1]) countIncrease++;
  })

  return countIncrease;
}

export function altPart2(input: string): number {
  let countIncrease: number = 0;

  const inputParsed = parseInput(input);

  let low = 0;
  let high = 3;

  while (high < inputParsed.length) {
    if (inputParsed[high] > inputParsed[low]) countIncrease++;
    low++;
    high++;
  }

  return countIncrease;
}

if (require.main === module) {
  const input = fs.readFileSync("./day1.txt", "utf-8")
  console.log(`Day 1, Part 1: ${altPart1(input)}`)
  console.log(`Day 2, Part 2: ${altPart2(input)}`)
}