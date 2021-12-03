import { altPart1, altPart2 } from './altDay2'

const sampleInput = `
forward 5
down 5
forward 8
up 3
down 8
forward 2
`

test('sample input for part one should return 150', () => {
  expect(altPart1(sampleInput)).toBe(150)
})

test('sample input for part two should return 900', () => {
  expect(altPart2(sampleInput)).toBe(900)
})