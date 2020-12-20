interface CalculationOutput {
    busId: number | null,
    minutesAway: number | null
}

const input = (await Deno.readTextFile("bus_schedule.txt")).split("\n")

const estimate = parseInt(input[0])
const busIds = input[1]
    .split(',')
    .map(char => parseInt(char))
    .filter(id => !isNaN(id))

const output = busIds.reduce((output: CalculationOutput, busId) => {
    const minutesAway = busId - (estimate % busId)
    if (output.minutesAway == null || minutesAway < output.minutesAway) {
        output.minutesAway = minutesAway
        output.busId = busId
    }
    return output
}, { busId: null, minutesAway: null })

console.log(`The answer is ${output.busId! * output.minutesAway!}`)

export {}