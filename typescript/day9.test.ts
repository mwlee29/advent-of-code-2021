import _ from "lodash";
import { part1, part2 } from "./day9";

const sampleInput = `2199943210
3987894921
9856789892
8767896789
9899965678`;

describe("Part 1", () => {
  it("Should return 15", () => {
    expect(part1(sampleInput)).toBe(15);
  });
});

describe("Part 2", () => {
  it("Should be 1134", () => {
    expect(part2(sampleInput)).toBe(1134);
  });
});
