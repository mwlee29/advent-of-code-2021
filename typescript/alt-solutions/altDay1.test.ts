import { altPart1, altPart2 } from "./altDay1"

var sampleInput: string = `199
200
208
210
200
207
240
269
260
263`

test('sample input altPart1 should return 7', () => {
  expect(altPart1(sampleInput)).toBe(7)
})

test('sample input altPart2 should return 5', () => {
  expect(altPart2(sampleInput)).toBe(5)
})
