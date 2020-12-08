const fs = require("fs")

const day1 = (function() {

    const expenses = fs.readFileSync('./expense-report.txt')
    .toString('utf-8')
    .split('\n')
    .map(expenseString => parseInt(expenseString))

    function part1() {
        const product = expenses.reduce((foundProduct, firstExpense) => {
            return foundProduct || expenses.find((secondExpense) => secondExpense + firstExpense === 2020) * firstExpense
        }, undefined)

        console.log(`Part 1 - product of entries which sum to 2020: ${product}`)
    }

    part1()
    
}());