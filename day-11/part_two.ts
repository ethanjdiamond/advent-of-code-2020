import {SeatsPartTwo, initialSeats} from './seats.ts'

let seats = new SeatsPartTwo(initialSeats)

let previousHash = 0
do {
    previousHash = seats.hash()
    seats.iterate()
} while (previousHash != seats.hash())

console.log(`There are ${seats.countOccupiedSeats()} occupied seats`)