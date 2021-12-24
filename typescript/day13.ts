import { readFileSync } from "fs";
import _ from "lodash";

export type Dot = {
  x: number;
  y: number;
};

export type Fold = {
  axis: "x" | "y";
  coordinate: number;
};

export type Paper = {
  dots: Dot[];
  folds: Fold[];
};

export function parseInput(input: string): Paper {
  let [dotStrings, foldStrings] = input.split(/\r?\n\r?\n/);
  let dots = dotStrings.split(/\r?\n/).map((x) => {
    let split = x.split(",", 2);
    return {
      x: parseInt(split[0]),
      y: parseInt(split[1]),
    };
  });
  let folds = foldStrings.split(/\r?\n/).map((x) => {
    let split = x.split("=", 2);
    return {
      axis: split[0].charAt(split[0].length - 1) as "x" | "y",
      coordinate: parseInt(split[1]),
    };
  });

  return { folds: folds, dots: dots };
}

export function fold(dots: Dot[], fold: Fold) {
  let newDots: Dot[] = [];

  dots.forEach((dot) => {
    let newDot = dot;
    if (dot[fold.axis] > fold.coordinate) {
      let diff = dot[fold.axis] - fold.coordinate;
      newDot[fold.axis] = fold.coordinate - diff;
    }

    newDots.push(newDot);
  });

  return newDots;
}

export function part1(input: string) {
  let paper = parseInput(input);
  paper.dots = _.uniqWith(fold(paper.dots, paper.folds[0]), _.isEqual);
  return paper.dots.length;
}

export function createMap(dots: Dot[]) {
  let max = _.maxBy(dots, "x");
  let mapArray = new Array<string>(max!.x + 1);
  let grouped = _.values(_.groupBy(dots, "x"));
  let sorted = grouped.map((x) => _.orderBy(x, "y"));

  let map: string[][] = [];

  sorted.forEach((x) => {
    let yArr = x.map((y) => y.y);
    for (let i = 0; i < mapArray.length; i++) {
      if (yArr.includes(i)) mapArray[i] = "#";
      else mapArray[i] = " ";
    }
    map.push(mapArray);
    mapArray = new Array<string>(max!.x + 1);
  });
  let spacer: string[] = [];
  for (let i = 0; i < map.length - 1; i++) {
    spacer.push("   ");
  }
  for (let i = map.length - 1; i > 0; i--) {
    if (i % 4 === 0) {
      map.splice(i, 0, spacer);
    }
  }
  map = _.unzip(map);
  let newMap = map.map((x) => x.join(""));
  newMap.unshift("");
  let joinedMap = newMap.join("\r\n");
  return joinedMap;
}

export function part2(input: string) {
  let paper = parseInput(input);
  paper.folds.forEach((f) => {
    paper.dots = _.uniqWith(fold(paper.dots, f), _.isEqual);
  });

  let map = createMap(paper.dots);
  return map;
}

if (require.main === module) {
  const input = readFileSync("day13.txt", { encoding: "ascii" });
  console.log(`Day 13, part 1: ${part1(input)}`);
  console.log(`Day 13, part 2: ${part2(input)}`);
}
