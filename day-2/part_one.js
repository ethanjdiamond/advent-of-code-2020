const fs = require('fs')
const { exit } = require('process')
const readline = require('readline')

function decomposeLine(line) {
    const [rule, password] = line.split(": ")
    const [minMax, letter] = rule.split(" ")
    const [minCount, maxCount] = minMax.split("-")
    return [letter, parseInt(minCount), parseInt(maxCount), password]
}

function passwordIsValid(letter, minCount, maxCount, password) {
    const letterCount = password.split('').filter(char => char == letter).length
    console.log(`${letter} ${minCount}-${maxCount}, ${password}`)
    console.log(letterCount)
    return letterCount >= minCount && letterCount <= maxCount
}

let validCount = 0
fs.readFile('passwords.txt', 'utf-8', (err, data) => {
    data.split('\n').forEach(line => {
        const [letter, minCount, maxCount, password] = decomposeLine(line)
        if (passwordIsValid(letter, minCount, maxCount, password)) {
            validCount += 1
        }
    })

    console.log(`There are ${validCount} valid passwords`)
})