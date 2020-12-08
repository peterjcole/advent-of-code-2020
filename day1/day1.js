const fs = require("fs")

const day1 = (function () {
    const expenses = fs.readFileSync('./expense-report.txt')
        .toString('utf-8')
        .split('\n')
        .map(expenseString => parseInt(expenseString))

    function part1() {
        const product = expenses.reduce((foundProduct, firstExpense) => {
            return foundProduct || expenses.find((secondExpense) => secondExpense + firstExpense === 2020) * firstExpense
        }, undefined)

        console.log(`Part 1 - product of 2 entries which sum to 2020: ${product}`)
    }


    function part2() {
        let product

        expenses.forEach((currentFirst, firstIndex) => {
            expenses.forEach((currentSecond, secondIndex) => {
                expenses.forEach((currentThird, thirdIndex) => {
                    if (firstIndex !== secondIndex 
                        && secondIndex !== thirdIndex 
                        && firstIndex !== thirdIndex) {
                        if (currentFirst + currentSecond + currentThird === 2020) {
                            product = currentFirst * currentSecond * currentThird
                        }
                    }
                })
            })
        })

        console.log(`Part 2 - product of 3 entries which sum to 2020: ${product}`)
    }

    part1()
    part2()

}())