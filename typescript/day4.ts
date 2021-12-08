import fs from "fs"
import _ from "lodash"

type InputParsed = {
  drawOrder: number[];
  boards: Board[]
}

type Square = {
  value: number;
  marked: boolean;
}

type Board = {
  lines: Square[][]
}

export function mapRowsToColumnsAndReturnBoard(board: number[][]): Board {
    let newLines: Square[][] = [];
    board.forEach((row) => {
      newLines.push(row.map(s => {return { value: s, marked: false }}));
    })
    let columns = _.unzip(board);
    columns.forEach((column) => {
      newLines.push(column.map(s => {return { value: s, marked: false }}));
    })

    let newBoard = {
      lines: newLines
    }

    return newBoard;
}

export function parseInput(input: string): InputParsed {
  const splitInput = input.split(/\r?\n\r?\n/);
  let boards: Board[] = [];

  const drawOrder = splitInput.shift()!.split(',').map(x => parseInt(x));
  const boardStrings = splitInput.map(b => b.split(/\r?\n/));
  const boardsParsed = boardStrings.map(board => 
    board.map(row => 
      row.split(/\s\s?/).filter(x => x !== '').map(digit => parseInt(digit))
    )
  );

  boardsParsed.forEach((board) => {
    boards.push(mapRowsToColumnsAndReturnBoard(board))
  })

  const parsedInput = {
    drawOrder: drawOrder,
    boards: boards
  }

  return parsedInput;
}

export function filterBoard(drawnNumber: number, board: Board): boolean {
  for (let i = 0; i < board.lines.length; i++) {
    let indexOfDrawnNumber = board.lines[i].findIndex(s => s.value === drawnNumber);
    if (indexOfDrawnNumber !== -1) {
      board.lines[i][indexOfDrawnNumber].marked = true;
    }
    if (board.lines[i].every(s => s.marked === true)) return true;
  }

  return false;
}

export function calculateRemainingSquares(board: Board): number {
  let sum = 0;

  for (let i = 0; i < 5; i++) {
    board.lines[i].forEach((square) => {
      if (!square.marked) {
        sum += square.value;
      }
    })
  }
  return sum;
}

export function part1(input: string) {
  let inputParsed = parseInput(input);
  let i = 0

  while (i < inputParsed.drawOrder.length) {
    let drawnNumber = inputParsed.drawOrder[i];

    for (let j = 0; j < inputParsed.boards.length; j++) {
      if (filterBoard(drawnNumber, inputParsed.boards[j])) {
        return drawnNumber * calculateRemainingSquares(inputParsed.boards[j]);
      }
    }

    i++
  }
  return 1
}

export function part2(input: string) {
  let inputParsed = parseInput(input);
  let i = 0;

  while (i < inputParsed.drawOrder.length ) {
    let drawnNumber = inputParsed.drawOrder[i];

    for (let j = inputParsed.boards.length - 1; j >= 0; j--) {
      if (filterBoard(drawnNumber, inputParsed.boards[j])) {
        if (inputParsed.boards.length === 1) {
          return drawnNumber * calculateRemainingSquares(inputParsed.boards[j]);
        } else {
          inputParsed.boards.splice(j, 1);
        }
      }
    }

    i++
  }
  return 1

}

if (require.main === module) {
  const input = fs.readFileSync("./day4.txt", "utf-8");
  console.log(`Day 4, Part 1: ${part1(input)}`)
  console.log(`Day 4, Part 2: ${part2(input)}`)
}