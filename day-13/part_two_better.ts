/*
{ busId: 19, offset: 0 },
{ busId: 37, offset: 13 },
{ busId: 599, offset: 19 },
{ busId: 29, offset: 21 },
{ busId: 17, offset: 36 },
{ busId: 23, offset: 42 },
{ busId: 761, offset: 50 },
{ busId: 41, offset: 60 },
{ busId: 13, offset: 63 }
*/

const input = (await Deno.readTextFile("bus_schedule.txt"))
    .split("\n")[1]
    .split(',')
    .map(char => parseInt(char))
    .reduce((input: Array<{busId: number, offset: number}>, busId, index) => {
        if (!isNaN(busId)) {
            input.push({busId: busId, offset: index})
        }
        return input
    }, [])

const solution = input.reduce((state, bus) => {
    while(((state.minutes + bus.offset) % bus.busId) != 0) {
        state.minutes += state.step
    }
    state.step *= bus.busId
    return state
}, {step: 1, minutes: 1})

console.log(`The answer is ${solution.minutes}`)