const fs = require("fs")

const day6 = (function () {
  const groupAnswers = fs.readFileSync('./customsforms.txt')
    .toString('utf-8')
    .split('\n\n')
    
    function part1() {
      const sum = groupAnswers.reduce((countSum, groupAnswer) => {
        const uniqueAnswers = new Set()
        groupAnswer.replace(/\n/g, '').split('').forEach(answer => uniqueAnswers.add(answer))
        return countSum + uniqueAnswers.size
      }, 0)
      console.log(`Part 1 - sum of counts of answers: ${sum}`)
    }

    function part2() {
      const sum = groupAnswers.reduce((countSum, groupAnswer) => {
        const people = groupAnswer.split(/\n/g)
        const everyoneAnswered = people.reduce((accEveryoneAnswered, personAnswered) => {
          const personArr = personAnswered.split('')
          return accEveryoneAnswered.filter(answer => personArr.includes(answer))
        }, people[0].split(''))
        return countSum + everyoneAnswered.length
      }, 0)
      console.log(`Part 2 - sum of counts of answers: ${sum}`)
    }

    part1()
    part2()
})()