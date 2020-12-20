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

const maxMultiple = input
    .sort((a, b) => a.busId - b.busId)
    [input.length - 1]

let logger = 0
let answer = 0
for (let i = maxMultiple.busId - maxMultiple.offset; true; i += maxMultiple.busId) {    
    const mismatches = input
        .find(entry => {
            const mod = i % entry.busId
            const offset = (mod == 0) ? 0 : entry.busId - mod
            return offset != entry.offset
        })
    
    if (mismatches == undefined) {
        answer = i
        break
    }

    if (logger % 100000000 == 0) {
        console.log(`${i} (${Math.ceil(Math.log10(i))} digits)`)
    }
    logger += 1
}

console.log(`The answer is ${answer}`)
    
export {}