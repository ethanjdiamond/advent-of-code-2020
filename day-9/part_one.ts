const numbers = (await Deno.readTextFile("numbers.txt"))
    .split("\n")
    .map(number => { return parseInt(number) })

function hasPair(sum: number, minIndex: number, maxIndex: number, numbers: number[]): boolean {    
    const array = numbers.slice(minIndex, maxIndex)
    const filteredArray = array.filter(number => {
        return array.includes(sum - number)
    })
    return filteredArray.length > 0
}

function findFirstIndex(range: number, numbers: number[]): number {
    for (let i = range; i++; i < numbers.length) {
        if (!hasPair(numbers[i], i - range, i, numbers)) {
            return i
        }
    }
    Deno.exit(1)
}

console.log(`The first number that doesn't match is ${numbers[findFirstIndex(25, numbers)]}`)

