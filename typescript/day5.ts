import { readFileSync } from "fs";
import _, { uniq } from "lodash";

export type Point = {
  x: number;
  y: number;
};

export class Line {
  x1: number;
  x2: number;
  y1: number;
  y2: number;

  constructor(lineStr: string) {
    let regex = /^([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)$/;
    let matchArr: RegExpMatchArray = lineStr.match(regex)!;
    const [x1, y1, x2, y2] = matchArr.slice(1).map((x) => parseInt(x));

    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  get isVertical(): boolean {
    return this.x1 === this.x2;
  }

  get isHorizontal(): boolean {
    return this.y1 === this.y2;
  }

  get minX(): number {
    return Math.min(this.x1, this.x2);
  }

  get minY(): number {
    return Math.min(this.y1, this.y2);
  }

  get maxX(): number {
    return Math.max(this.x1, this.x2);
  }

  get maxY(): number {
    return Math.max(this.y1, this.y2);
  }

  get startPoint(): Point {
    return this.minX === this.x1
      ? { x: this.x1, y: this.y1 }
      : { x: this.x2, y: this.y2 };
  }

  get endPoint(): Point {
    return this.maxX === this.x1
      ? { x: this.x1, y: this.y1 }
      : { x: this.x2, y: this.y2 };
  }

  get slope(): number {
    return (
      (this.endPoint.y - this.startPoint.y) /
      (this.endPoint.x - this.startPoint.x)
    );
  }

  get points(): Point[] {
    let points: Point[] = [];

    if (this.isVertical) {
      return _.range(this.minY, this.maxY + 1).map((y) => {
        return { x: this.x1, y: y };
      });
    } else if (this.isHorizontal) {
      return _.range(this.minX, this.maxX + 1).map((x) => {
        return { x: x, y: this.y1 };
      });
    }

    let xs = _.range(this.startPoint.x, this.endPoint.x + 1).map((x, index) => {
      return { x: x, y: this.startPoint.y + index * this.slope };
    });

    return xs;
  }
}

export function parseInput(input: string): Line[] {
  let splitInput = input.split(/\r?\n/);
  let lines = splitInput.map((x) => new Line(x));
  return lines;
}

export function filterPart1Lines(lines: Line[]): Line[] {
  return lines.filter((line) => line.isHorizontal || line.isVertical);
}

export function calcIntersections(lines: Line[]): number {
  const allPoints = _.flatMap(lines, (x) => x.points);
  const countPoints = _.countBy(allPoints, (p) => [p.x, p.y]);
  const duplicatePoints = _.filter(countPoints, (x) => x > 1);
  return duplicatePoints.length;
}

export function part1(input: string) {
  const lines = parseInput(input);
  const part1lines = filterPart1Lines(lines);

  return calcIntersections(part1lines);
}

export function part2(input: string) {
  let pointA: Point = { x: 1, y: 1 };
  let pointB: Point = { x: 1, y: 1 };

  let arr = [pointA, pointB];
  let newArr = _.groupBy(arr, (p) => [p.x, p.y]);
  return newArr;
}

if (require.main === module) {
  const input = readFileSync("day5.txt", "utf-8");
  console.log(`Day 5, part 1: ${part1(input)}`);
  console.log(`Day 5, part 2: ${part2(input)}`);
}
