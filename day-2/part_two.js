const fs = require('fs')
const { exit } = require('process')
const readline = require('readline')

function decomposeLine(line) {
    const [rule, password] = line.split(": ")
    const [indices, letter] = rule.split(" ")
    const [firstIndex, secondIndex] = indices.split("-")
    return [letter, parseInt(firstIndex), parseInt(secondIndex), password]
}

function passwordIsValid(letter, firstIndex, secondIndex, password) {
    let letterCount = 0
    let indices = [firstIndex, secondIndex]
    indices.forEach(index => {
        if (password.charAt(index - 1) == letter) {
            letterCount += 1
        }
    })
    return letterCount == 1
}

let validCount = 0
fs.readFile('passwords.txt', 'utf-8', (err, data) => {
    data.split('\n').forEach(line => {
        const [letter, firstIndex, secondIndex, password] = decomposeLine(line)
        if (passwordIsValid(letter, firstIndex, secondIndex, password)) {
            validCount += 1
        }
    })

    console.log(`There are ${validCount} valid passwords`)
})