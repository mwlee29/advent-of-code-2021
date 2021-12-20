import { part1, part2 } from "./day11";

const sampleInput = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

describe("Part 1", () => {
  it("Should be 1656", () => {
    expect(part1(sampleInput)).toBe(1656);
  });
});

describe("Part 2", () => {
  it("Should be 195", () => {
    expect(part2(sampleInput)).toBe(195);
  });
});
