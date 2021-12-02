import fs from "fs"

function parseInput(input: string) {
  const lines = input.split('\n').filter(x => x !== '');
  const linesWithDistance: string[][] = lines.map(x => x.split(' ', 2))

  return linesWithDistance;
}

export function altPart1(input: string) {
  const lines: string[][] = parseInput(input)
  let horizontalDistance = 0;
  let verticalDistance = 0;

  lines.forEach(x => {
    if (x[0].startsWith('f')) horizontalDistance += parseInt(x[1])
    else if (x[0].startsWith('u')) verticalDistance -= parseInt(x[1])
    else if (x[0].startsWith('d')) verticalDistance += parseInt(x[1])
  })

  return horizontalDistance * verticalDistance;
}

export function altPart2(input: string) {
  const lines: string[][] = parseInput(input);
  let aim = 0;
  let horizontalDistance = 0;
  let depth = 0;

  lines.forEach(x => {
    let increment = parseInt(x[1])
    if (x[0].startsWith('f')) {
      horizontalDistance += increment;
      depth += increment * aim;
    } else if (x[0].startsWith('u')) {
      aim -= increment;
    } else if (x[0].startsWith('d')) {
      aim += increment;
    }
  })

  return horizontalDistance * depth;
}

if (require.main === module) {
  const input = fs.readFileSync("./day2.txt", "utf-8");
  console.log(`Day 1, Part 1: ${altPart1(input)}`)
  console.log(`Day 2, Part 2: ${altPart2(input)}`)
}