const fs = require('fs')
const { exit } = require('process')
const readline = require('readline')

let numbers = new Set()
fs.readFile('numbers.txt', 'utf-8', (err, data) => {
    data.split('\n').forEach(numberString => {
        const number = parseInt(numberString)
        if (numbers.has(2020 - number)) {
            console.log("Part 1:")
            console.log(`The numbers are ${number} and ${2020 - number}`)
            console.log(`The answer is ${number * (2020 - number)}`)
            exit(0)
        }
        numbers.add(number)
    })
})