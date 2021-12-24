import { part1, part2 } from "./day13";

const sampleInput = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

describe("Part 1", () => {
  it("Should be 17", () => {
    expect(part1(sampleInput)).toBe(17);
  });
});

describe("Part 2", () => {
  it("Should be1234", () => {
    expect(part2(sampleInput)).toBe(18);
  });
});
