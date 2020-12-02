const fs = require('fs')
const { exit } = require('process')
const readline = require('readline')

let baseNumbers = new Set()
let sumNumbers = new Set()
let sumNumberLookup = new Map()

fs.readFile('numbers.txt', 'utf-8', (err, data) => {
    data.split('\n').forEach(numberString => {
        const number = parseInt(numberString)
        if (sumNumbers.has(2020 - number)) {
            let otherNumbers = sumNumberLookup[2020 - number]

            console.log("Part 2:")
            console.log(`The numbers are ${number}, ${otherNumbers[0]} and ${otherNumbers[1]}`)
            console.log(`The answer is ${number * otherNumbers[0] * otherNumbers[1]}`)
            exit(0)
        }

        baseNumbers.forEach(baseNumber => {
            const sum = baseNumber + number
            sumNumbers.add(sum)
            sumNumberLookup[sum] = [baseNumber, number]
        })
        baseNumbers.add(number)
    })
})