const fs = require("fs")

const day5 = (function () {
  const boardingPasses = fs.readFileSync('./boardingpasses.txt')
    .toString('utf-8')
    .split('\n')
    
    function part1() {
      const highestSeatId = boardingPasses.reduce((max, boardingPass) => {
        const seatId = calculateSeatId(boardingPass)
        return seatId > max ? seatId : max
      }, 0)

      console.log(`Part 1: Highest seat id: ${highestSeatId}`)
    }

    function part2() {
      const seatIds = boardingPasses.map(boardingPass => calculateSeatId(boardingPass)).sort()

      const mySeat = seatIds.reduce((mySeat, currentId, index) => {
        if (mySeat) return mySeat

        const skippedASeat = seatIds[index - 1] === currentId - 2

        if (skippedASeat) {
          return currentId - 1
        }
      }, null)

      console.log(`Part 2: My seat id: ${mySeat}`)

    }

    function calculateSeatId(boardingPass) {
      const rowString = boardingPass.slice(0, 7)
      const colString = boardingPass.slice(7)
      const row = calculatePosition(rowString, 127)
      const col = calculatePosition(colString, 7)
      return row * 8 + col
    }

    function calculatePosition(string, upperBound) {
      return string.split('').reduce((range, char) => {
        if (char === 'F' || char === 'L') {
          return [range[0], averageRange(range)]
        } else {
          return [averageRange(range), range[1]]
        }
      }, [0, upperBound])[1]
    }

    function averageRange(range) {
      return Math.floor((range[0] + range[1]) / 2)
    }

    part1()
    part2()
})()