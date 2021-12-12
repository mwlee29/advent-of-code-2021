import { readFileSync } from "fs";
import _ from "lodash";

export function parseInput(input: string): number[] {
  const splitInput = input.split(",").map((x) => parseInt(x));
  return _.sortBy(splitInput);
}

export function calculateTotalFuel(
  positions: number[],
  positionToCheck: number
) {
  let totalFuel = _.sumBy(positions, (x) =>
    calculateFuelSeries(x, positionToCheck)
  );
  return totalFuel;
}

export function calculateMedian(positions: number[]): number {
  let medianIndex = positions.length / 2;
  let median: number = 0;
  if (medianIndex % 1 !== 0) {
    let low = Math.floor(medianIndex);
    let high = Math.ceil(medianIndex);
    median = (positions[low] + positions[high]) / 2;
  } else {
    median = positions[medianIndex];
  }

  return median;
}

export function getDistancesToMedian(
  positions: number[],
  median: number
): number[] {
  return positions.map((x) => Math.abs(x - median));
}

export function calculateFuelSeries(position: number, target: number) {
  let diff = Math.abs(position - target) + 1;
  return _.sum(_.range(diff));
}

export function part1(input: string) {
  const positions = parseInput(input);
  const median = calculateMedian(positions);
  const distances = getDistancesToMedian(positions, median);

  return _.sum(distances);
}

export function findPart2Value(positions: number[]) {
  // Either first or last point would produce the maximum return value.
  // The goal is to find the value at the median, since the median is
  // defined as the point minimizing the sum of distances to the sample points.
  // See https://en.wikipedia.org/wiki/Geometric_median

  let high = Math.max(...positions);
  let low = 0;

  while (low < high) {
    let midLow = low + _.round((high - low) / 3);
    let midHigh = high - _.round((high - low) / 3);

    let distLow = calculateTotalFuel(positions, midLow);
    let distHigh = calculateTotalFuel(positions, midHigh);

    if (distLow === distHigh) return distHigh;
    if (distLow > distHigh) {
      low = midLow;
    } else {
      high = midHigh;
    }
  }

  return calculateTotalFuel(positions, high);
}

export function part2(input: string) {
  const positions = parseInput(input);

  return findPart2Value(positions);
}

if (require.main === module) {
  const input = readFileSync("day7.txt", "utf-8");
  console.log(`Day 7, part 1: ${part1(input)}`);
  console.log(`Day 7, part 2: ${part2(input)}`);
}
