import { readFileSync } from "fs";
import _ from "lodash";

export type Location = {
  height: number;
  visited: boolean;
};

export type Input = {
  xMax: number;
  yMax: number;
  locations: Location[][];
};

export type LowPoint = {
  x: number;
  y: number;
  location: Location;
};

export type Basin = {
  locations: Location[];
};

export function parseInput(input: string): Input {
  let inputRows = input.split(/\r?\n/).filter((x) => x !== "");
  let parsedLocations = inputRows.map((x) =>
    x.split("").map((y) => {
      return { height: parseInt(y), visited: false };
    })
  );
  parsedLocations.forEach((loc) => {
    loc.push({ height: 10, visited: true });
    loc.unshift({ height: 10, visited: true });
  });
  let bufferRow: Location[] = [];
  for (let i = 0; i < parsedLocations[0].length; i++) {
    bufferRow.push({ height: 10, visited: true });
  }
  parsedLocations.push(bufferRow);
  parsedLocations.unshift(bufferRow);
  return {
    xMax: inputRows.length,
    yMax: inputRows[0].length,
    locations: parsedLocations,
  };
}

export function findLowPoints(
  locations: Location[][],
  x: number,
  y: number,
  lowPoints: LowPoint[]
) {
  if (locations[x][y].visited) return;

  locations[x][y].visited = true;
  if (
    locations[x][y + 1].height > locations[x][y].height &&
    locations[x][y - 1].height > locations[x][y].height &&
    locations[x + 1][y].height > locations[x][y].height &&
    locations[x - 1][y].height > locations[x][y].height
  ) {
    lowPoints.push({ x: x, y: y, location: locations[x][y] });
  } else {
    findLowPoints(locations, x, y + 1, lowPoints);
    findLowPoints(locations, x, y - 1, lowPoints);
    findLowPoints(locations, x + 1, y, lowPoints);
    findLowPoints(locations, x - 1, y, lowPoints);
  }
}

export function findBasin(
  locations: Location[][],
  x: number,
  y: number,
  prevHeight: number,
  basinLocations: Location[]
) {
  let currentHeight = locations[x][y].height;

  if (locations[x][y].visited) return;

  if (currentHeight < prevHeight) {
    return;
  } else {
    basinLocations.push(locations[x][y]);
    locations[x][y].visited = true;
    findBasin(locations, x, y + 1, locations[x][y].height, basinLocations);
    findBasin(locations, x, y - 1, locations[x][y].height, basinLocations);
    findBasin(locations, x + 1, y, locations[x][y].height, basinLocations);
    findBasin(locations, x - 1, y, locations[x][y].height, basinLocations);
  }
}

export function part1(input: string) {
  let parsedInput = parseInput(input);
  let lowPoints: LowPoint[] = [];
  findLowPoints(
    parsedInput.locations,
    Math.floor(parsedInput.xMax / 2),
    Math.floor(parsedInput.yMax / 2),
    lowPoints
  );
  let result = _.sumBy(lowPoints, "location.height");
  result += lowPoints.length;
  return result;
}

export function part2(input: string) {
  let parsedInput = parseInput(input);
  let lowPoints: LowPoint[] = [];
  findLowPoints(
    parsedInput.locations,
    Math.floor(parsedInput.xMax / 2),
    Math.floor(parsedInput.yMax / 2),
    lowPoints
  );
  let basins: Basin[] = [];

  // Reset visited
  parsedInput.locations.forEach((row) => {
    row.forEach((loc) => {
      if (loc.height < 9) loc.visited = false;
    });
  });

  lowPoints.forEach((point) => {
    let loc: Location[] = [];
    findBasin(parsedInput.locations, point.x, point.y, 0, loc);
    basins.push({ locations: loc });
  });

  let largestBasins = _.takeRight(_.orderBy(basins, "locations.length"), 3);
  let result = 1;
  largestBasins.forEach((basin) => {
    result *= basin.locations.length;
  });
  return result;
}

if (require.main === module) {
  const input = readFileSync("day9.txt", "utf-8");
  console.log(`Day 9, part 1: ${part1(input)}`);
  console.log(`Day 9, part 2: ${part2(input)}`);
}
