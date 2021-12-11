import { Line, part1, part2, Point } from "./day5";

const sampleInput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

test("part 1 example input should return 5", () => {
  expect(part1(sampleInput)).toBe(5);
});

test("part 2 example input should return 12", () => {
  expect(part2(sampleInput)).toBe(12);
});

describe("Line", () => {
  describe("Points", () => {
    it("Should contain 8,0 through 0,8", () => {
      let line = new Line("8,0 -> 0,8");
      let points: Point[] = [];

      for (let i = 0; i <= 8; i++) {
        points.push({ x: i, y: 8 - i });
      }

      expect(line.x1).toBe(8);
      expect(line.slope).toBe(-1);
      expect(line.startPoint).toEqual({ x: 0, y: 8 });
      expect(line.endPoint).toEqual({ x: 8, y: 0 });
      expect(line.points.length).toBe(9);
      expect(line.points).toEqual(points);
    });
  });
});

// describe("Line intersection", () => {
//   let verticalLine10Points: Line = new Line({ x: 0, y: 9 }, { x: 0, y: 0 });

//   let horizontalLine10Points: Line = new Line({ x: 0, y: 0 }, { x: 9, y: 0 });

//   // describe("Vertical Lines", () => {
//   //   it("Should return 3", () => {
//   //     let overlapping3PointVerticalLine: Line = new Line(
//   //       { x: 0, y: 0 },
//   //       { x: 0, y: 2 }
//   //     );

//   //     expect(
//   //       verticalLine10Points.countIntersectionPoints(
//   //         overlapping3PointVerticalLine
//   //       )
//   //     ).toBe(3);
//   //     expect(
//   //       overlapping3PointVerticalLine.countIntersectionPoints(
//   //         verticalLine10Points
//   //       )
//   //     ).toBe(3);
//   //   });
//   // });

//   describe("Horizontal Lines", () => {
//     it("Should return 3", () => {
//       let overlapping3PointHorizontalLine: Line = new Line(
//         { x: 0, y: 0 },
//         { x: 2, y: 0 }
//       );

//       expect(
//         horizontalLine10Points.countIntersectionPoints(
//           overlapping3PointHorizontalLine
//         )
//       ).toBe(3)
//     });
//   });
// });
