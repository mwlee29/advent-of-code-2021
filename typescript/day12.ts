import { readFileSync } from "fs";
import _ from "lodash";

export interface Cave {
  key: string;
  isSmall: boolean;
}

export type CaveSystemAdjacencyList = Record<string, Cave[]>;

export class CaveSystem {
  pathCount: number;
  adjacencyList: CaveSystemAdjacencyList;

  constructor(adjacencyList: CaveSystemAdjacencyList) {
    this.adjacencyList = adjacencyList;
    this.pathCount = 0;
  }

  findPaths() {
    let isVisited: Record<string, boolean> = {};

    for (let i in this.adjacencyList) {
      isVisited[i] = false;
    }

    let pathList: string[] = [];
    pathList.push("start");
    this.findAllPaths("start", "end", isVisited, pathList);
  }

  findAllPaths(
    current: string,
    goal: string,
    isVisited: Record<string, boolean>,
    localPathList: string[]
  ) {
    if (current === goal) {
      this.pathCount += 1;
      return;
    }

    isVisited[current] = true;

    for (let cave of this.adjacencyList[current]) {
      if (isVisited[cave.key] && cave.isSmall) {
        continue;
      } else {
        localPathList.push(cave.key);
        this.findAllPaths(cave.key, goal, isVisited, localPathList);
        localPathList.splice(localPathList.indexOf(cave.key), 1);
      }
    }

    isVisited[current] = false;
  }
}

export type SmallCave = {
  visited: boolean;
  visitCount: number;
};

export class CaveSystemPart2 extends CaveSystem {
  findAllPaths(
    current: string,
    goal: string,
    isVisited: Record<string, boolean>,
    localPathList: string[],
    caveVisitedTwice = ""
  ) {
    if (current === goal) {
      this.pathCount += 1;
      return;
    }

    isVisited[current] = true;

    for (let cave of this.adjacencyList[current]) {
      let newCaveVisitedTwice = caveVisitedTwice;
      if (isVisited[cave.key] && cave.isSmall) {
        if (!caveVisitedTwice && cave.key !== "start" && cave.key !== "end") {
          newCaveVisitedTwice = cave.key;
        } else {
          continue;
        }
      }
      localPathList.push(cave.key);
      this.findAllPaths(
        cave.key,
        goal,
        isVisited,
        localPathList,
        newCaveVisitedTwice
      );
      localPathList.splice(localPathList.lastIndexOf(cave.key), 1);
    }

    if (caveVisitedTwice === current) {
      caveVisitedTwice === "";
    } else {
      isVisited[current] = false;
    }
  }
}

export function parseInputIntoAdjancenyList(
  input: string,
  adjacencyList: CaveSystemAdjacencyList
) {
  const matches = /^(.+)-(.+)$/.exec(input) as RegExpMatchArray;
  const [a, b] = matches.slice(1);
  const isBSmall = b.toUpperCase() === b ? false : true;
  const isASmall = a.toUpperCase() === a ? false : true;
  let currA: Cave[] = [{ key: a, isSmall: isASmall }];
  let currB: Cave[] = [{ key: b, isSmall: isBSmall }];
  if (adjacencyList[a]) {
    currB.push(...adjacencyList[a]!);
  }
  if (adjacencyList[b]) {
    currA.push(...adjacencyList[b]!);
  }
  adjacencyList[a] = currB;
  adjacencyList[b] = currA;
}

export function parseInput(input: string): CaveSystemAdjacencyList {
  const lines = input.split(/\r?\n/);
  let adjacencyList: CaveSystemAdjacencyList = {};
  lines.forEach((line) => {
    parseInputIntoAdjancenyList(line, adjacencyList);
  });

  return adjacencyList;
}

export function part1(input: string) {
  let caveSystem = new CaveSystem(parseInput(input));
  caveSystem.findPaths();
  return caveSystem.pathCount;
}

export function part2(input: string) {
  let caveSystem = new CaveSystemPart2(parseInput(input));
  caveSystem.findPaths();
  return caveSystem.pathCount;
}

if (require.main === module) {
  const input = readFileSync("day12.txt", { encoding: "ascii" });
  console.log(`Day 12, part 1: ${part1(input)}`);
  console.log(`Day 12, part 2: ${part2(input)}`);
}
