import seats from "./seats.ts"

let missingId = seats
    .sort((seatA, seatB) => {
        return seatA.id - seatB.id
    })
    .find((seat, index, seats) => {
        return seat.id + 2 == seats[index + 1].id
    })!
    .id + 1

console.log(`This missng id is ${missingId}`)