import { readFileSync } from "fs";
import _ from "lodash";

export interface Location {
  x: number;
  y: number;
}

export interface IOctopus {
  location: Location;
  energyLevel: number;
  totalFlashes: number;
  hasFlashed: boolean;
  adjacentOctopus: IOctopus[];
  tryFlash: () => void;
  reset: () => void;
  increaseEnergyLevel: () => void;
  init: (octuopusArray: IOctopus[][]) => void;
}

export class Octopus implements IOctopus {
  location: Location;
  energyLevel: number;
  totalFlashes: number;
  hasFlashed: boolean = false;
  adjacentOctopus: IOctopus[];

  constructor(x: number, y: number, energyLevel: number) {
    this.location = { x, y };
    this.energyLevel = energyLevel;
    this.totalFlashes = 0;
    this.adjacentOctopus = [];
  }

  init(octopusArray: IOctopus[][]) {
    let x = this.location.x;
    let y = this.location.y;
    this.adjacentOctopus.push(octopusArray[x + 1][y + 1]);
    this.adjacentOctopus.push(octopusArray[x + 1][y]);
    this.adjacentOctopus.push(octopusArray[x + 1][y - 1]);
    this.adjacentOctopus.push(octopusArray[x][y + 1]);
    this.adjacentOctopus.push(octopusArray[x][y - 1]);
    this.adjacentOctopus.push(octopusArray[x - 1][y + 1]);
    this.adjacentOctopus.push(octopusArray[x - 1][y]);
    this.adjacentOctopus.push(octopusArray[x - 1][y - 1]);
  }

  tryFlash() {
    if (this.energyLevel < 10 || this.hasFlashed) return;
    this.totalFlashes += 1;
    this.hasFlashed = true;
    this.adjacentOctopus.forEach((o) => {
      o.increaseEnergyLevel();
      o.tryFlash();
    });
    this.energyLevel = 0;
  }

  reset() {
    this.hasFlashed = false;
  }

  increaseEnergyLevel() {
    if (this.hasFlashed) return;
    else this.energyLevel += 1;
  }
}

export class Mocktopus implements IOctopus {
  location: Location = { x: -1, y: -1 };
  energyLevel: number = 0;
  hasFlashed: boolean = true;
  totalFlashes: number = 0;
  adjacentOctopus: IOctopus[] = [];
  tryFlash() {}
  reset() {}
  increaseEnergyLevel() {}
  init(octopusArray: IOctopus[][]) {}
}

export function parseInput(input: string) {
  const lines = input.split(/\r?\n/);
  let energyLevels = lines.map((x) => {
    return x
      .split("")
      .filter((x) => x !== "")
      .map((y) => {
        return parseInt(y);
      });
  });

  energyLevels.forEach((x) => {
    x.push(-1);
    x.unshift(-1);
  });

  let mockEnergyLevels: number[] = [];
  for (let i = 0; i < energyLevels.length + 2; i++) {
    mockEnergyLevels.push(-1);
  }

  energyLevels.push(mockEnergyLevels);
  energyLevels.unshift(mockEnergyLevels);

  return createOctopusArrayFromEnergyLevels(energyLevels);
}

export function createOctopusArrayFromEnergyLevels(energyLevels: number[][]) {
  let octopusArray = energyLevels.map((x, xIndex) =>
    x.map((y, yIndex) => {
      if (y === -1) return new Mocktopus();
      else return new Octopus(xIndex, yIndex, y);
    })
  );

  octopusArray.forEach((x) => {
    x.forEach((y) => {
      y.init(octopusArray);
    });
  });

  return octopusArray.flat();
}

export function part1(input: string) {
  const octopuses = parseInput(input);
  for (let i = 0; i < 100; i++) {
    octopuses.forEach((o) => {
      o.increaseEnergyLevel();
      o.tryFlash();
    });
    octopuses.forEach((o) => {
      o.reset();
    });
  }

  let totalFlashes = 0;
  octopuses.forEach((o) => {
    totalFlashes += o.totalFlashes;
  });
  return totalFlashes;
}

export function part2(input: string): number {
  const octopuses = parseInput(input);
  let counter = 0;
  while (true) {
    counter++;
    let allFlashed = true;
    octopuses.forEach((o) => {
      o.increaseEnergyLevel();
      o.tryFlash();
    });
    octopuses.forEach((o) => {
      if (!o.hasFlashed) allFlashed = false;
      o.reset();
    });
    if (allFlashed) return counter;
  }
}

if (require.main === module) {
  const input = readFileSync("day11.txt", { encoding: "ascii" });
  console.log(`Day 11, part 1: ${part1(input)}`);
  console.log(`Day 11, part 2: ${part2(input)}`);
}
