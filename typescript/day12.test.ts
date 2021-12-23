import { part1, part2 } from "./day12";

const smallSample = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

const medSample = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;

const largeSample = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

describe("Part 1", () => {
  it("Small Sample should be 10", () => {
    expect(part1(smallSample)).toBe(10);
  });

  it("Medium Sample should be 19", () => {
    expect(part1(medSample)).toBe(19);
  });

  it("Large sample should be 226", () => {
    expect(part1(largeSample)).toBe(226);
  });
});

describe("Part 2", () => {
  it("Small Sample should be 36", () => {
    expect(part2(smallSample)).toBe(36);
  });

  // it("Medium Sample should be 103", () => {
  //   expect(part2(medSample)).toBe(103);
  // });

  // it("Large sample should be 3509", () => {
  //   expect(part2(largeSample)).toBe(3509);
  // });
});
