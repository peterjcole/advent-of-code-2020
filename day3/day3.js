const fs = require("fs")

const day3 = (function () {
  const map = fs.readFileSync('./map.txt')
    .toString('utf-8')
    .split('\n')
    
  const mapWidth = map[0].length

  const TREE = '#'


  function part1() {
    const hits = map.reduce((accNumTrees, mapRow, rowIndex) => {
      const colIndex = (rowIndex * 3) % mapWidth
      const hitTree = mapRow[colIndex] === TREE
      return hitTree ? accNumTrees + 1 : accNumTrees
    }, 0)

    console.log(`Part 1 answer: hit ${hits} trees`)
  }

  function part2() {
    function calculateHits(rightBy, downBy) {
      const numAttemps = Math.floor(map.length / downBy)

      const hits = Array(numAttemps).fill().reduce((accNumTrees, _, attemptNum) => {
        const rowIndex = attemptNum * downBy
        const colIndex = (attemptNum * rightBy) % mapWidth
        const hitTree = map[rowIndex][colIndex] === TREE
        return hitTree ? accNumTrees + 1 : accNumTrees
      }, 0)
      
      console.log(`Right by ${rightBy}, down by ${downBy}. Hit ${hits} trees.`)
      return hits
    }

    const answer = calculateHits(1, 1)
      * calculateHits(3, 1)
      * calculateHits(5, 1)
      * calculateHits(7, 1)
      * calculateHits(1, 2)
       
    console.log(`Part 2 answer: ${answer}`)
  }
  
  part1()
  part2()

  }())