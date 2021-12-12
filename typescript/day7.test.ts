import {
  part1,
  part2,
  parseInput,
  calculateMedian,
  calculateFuelSeries,
  getDistancesToMedian,
} from "./day7";

import _, { partition } from "lodash";
const sampleInput = `16,1,2,0,4,2,7,1,2,14`;

describe("Part 1", () => {
  it("Should return 37", () => {
    expect(part1(sampleInput)).toBe(37);
  });

  describe("Calculate Median", () => {
    it("Should be 2", () => {
      expect(calculateMedian(parseInput(sampleInput))).toBe(2);
    });
  });
});

describe("Part 2", () => {
  it("Should return 168", () => {
    expect(part2(sampleInput)).toBe(168);
  });

  describe("Calculate Fuel Series", () => {
    it("Should return 66", () => {
      expect(calculateFuelSeries(16, 5)).toBe(66);
    });

    it("Should return 10", () => {
      expect(calculateFuelSeries(1, 5)).toBe(10);
    });
    it("Should return 6", () => {
      expect(calculateFuelSeries(2, 5)).toBe(6);
    });
  });
});
