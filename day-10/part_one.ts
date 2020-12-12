import joltage from './joltage.ts'

interface Output {
    one: number,
    two: number,
    three: number,
    lastNumber: number | null
}

const output = joltage
    .reduce((output: Output, number) => {
        if (output.lastNumber != null) {
            switch (output.lastNumber - number) {
                case 1:
                    output.one += 1
                    break
                case 2:
                    output.two += 1
                    break
                case 3:
                    output.three += 1
                    break
            }   
        }
        output.lastNumber = number
        return output
    }, {
        one: 0,
        two: 0,
        three: 0,
        lastNumber: null
    })
console.log(`The answer is ${output.one * output.three}`)