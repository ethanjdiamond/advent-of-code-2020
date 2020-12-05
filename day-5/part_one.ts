import seats from "./seats.ts"

let highestId = seats
    .reduce((highestId, seat) => {
        return Math.max(highestId, seat.id)
    }, 0)

console.log(`The highest id is ${highestId}`)
    