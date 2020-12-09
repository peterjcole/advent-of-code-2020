const fs = require("fs")

const day2 = (function () {

  const rows = fs.readFileSync('./passwords.txt')
  .toString('utf-8')
  .split('\n')

  function parseRow(row) {
    const args = row.split(' ')
    const minMax = args[0].split('-')
    return {
      minOccurences: minMax[0],
      maxOccurences: minMax[1],
      requiredChar: args[1].replace(':', ''),
      password: args[2]
    }
  }

  function part1() {
    const numValidPasswords = rows.reduce((accValidPasswords, textRow) => {
      const row = parseRow(textRow)

      const occurences = Array.from(row.password.matchAll(row.requiredChar))

      const correctNumOccurences = occurences.length >= row.minOccurences && occurences.length <= row.maxOccurences

      return correctNumOccurences ? accValidPasswords + 1 : accValidPasswords
    }, 0)

    console.log(`Part 1: Number of valid passwords: ${numValidPasswords}`)
  }

  function part2() {
    const numValidPasswords = rows.reduce((accValidPasswords, textRow) => {
      const row = parseRow(textRow)

      const firstMatch = row.password[row.minOccurences - 1] === row.requiredChar
      const secondMatch = row.password[row.maxOccurences - 1] === row.requiredChar

      const firstXorSecondMatch = (firstMatch || secondMatch) && (firstMatch !== secondMatch)

      return firstXorSecondMatch ? accValidPasswords + 1 : accValidPasswords
    }, 0)

    console.log(`Part 2: Number of valid passwords: ${numValidPasswords}`)
  }

  part1()
  part2()

})()