const OCCUPIED_SEAT = "#"
const EMPTY_SEAT = "L"
const FLOOR = "."

abstract class Seats {
    protected seats: string[][]
    protected cachedHash: number | null = null

    constructor(seats: string[][]) {
        this.seats = seats
    }

    hash(): number {
        if (this.cachedHash != null) {
            return this.cachedHash
        }

        const string = this.seats.flatMap(row => row).join('')
        let hash = 0, i = 0, len = string.length
        while (i < len) {
            hash  = ((hash << 5) - hash + string.charCodeAt(i++)) << 0
        }

        this.cachedHash = hash

        return hash
    }

    iterate() {
        this.cachedHash = null
        this._iterate()
    }

    protected abstract _iterate(): void

    print() {
        this.seats.forEach(row => console.log(row.join('')))
    }

    countOccupiedSeats(): number {
        return this.seats.reduce((sum, row) => {
            return sum + row.reduce((sum, tile) => {
                return tile == OCCUPIED_SEAT ? sum + 1 : sum
            }, 0)
        }, 0)
    }
}

class SeatsPartOne extends Seats {
    _iterate() {
        let newSeats: string[][] = []
        for (let i = 0; i < this.seats.length; i++) {
            newSeats.push([])
            for (let j = 0; j < this.seats[i].length; j++) {
                switch (this.seats[i][j]) {
                    case FLOOR:
                        newSeats[i].push(FLOOR)
                        break
                    case EMPTY_SEAT:
                        newSeats[i].push(this.surroundingOccupiedSeatCount(this.seats, i, j) == 0 ? OCCUPIED_SEAT : EMPTY_SEAT)
                        break
                    case OCCUPIED_SEAT:
                        newSeats[i].push(this.surroundingOccupiedSeatCount(this.seats, i, j) >= 4 ? EMPTY_SEAT : OCCUPIED_SEAT)
                        break
                }
            }
        }
        this.seats = newSeats
    }

    private surroundingOccupiedSeatCount(seats: string[][], row: number, column: number): number {       
        return [
            {row: -1, column: -1},
            {row: 0, column: -1},
            {row: 1, column: -1},
            {row: -1, column: 0},
            {row: 1, column: 0},
            {row: -1, column: 1},
            {row: 0, column: 1},
            {row: 1, column: 1}
        ].map(offset => {
            const coordinate = {row: row + offset.row, column: column + offset.column}
            if (coordinate.row < 0 || coordinate.row >= seats.length) { return null }
            if (coordinate.column < 0 || coordinate.column >= seats[0].length) { return null }
            return seats[coordinate.row][coordinate.column]
        })
        .filter(tile => tile == OCCUPIED_SEAT)
        .length
    }
}

class SeatsPartTwo extends Seats {
    _iterate() {
        let newSeats: string[][] = []
        for (let i = 0; i < this.seats.length; i++) {
            newSeats.push([])
            for (let j = 0; j < this.seats[i].length; j++) {
                switch (this.seats[i][j]) {
                    case FLOOR:
                        newSeats[i].push(FLOOR)
                        break
                    case EMPTY_SEAT:
                        newSeats[i].push(this.surroundingOccupiedSeatCount(this.seats, i, j) == 0 ? OCCUPIED_SEAT : EMPTY_SEAT)
                        break
                    case OCCUPIED_SEAT:
                        newSeats[i].push(this.surroundingOccupiedSeatCount(this.seats, i, j) >= 5 ? EMPTY_SEAT : OCCUPIED_SEAT)
                        break
                }
            }
        }
        this.seats = newSeats
    }

    private surroundingOccupiedSeatCount(seats: string[][], row: number, column: number): number {       
        return [
            {row: -1, column: -1},
            {row: 0, column: -1},
            {row: 1, column: -1},
            {row: -1, column: 0},
            {row: 1, column: 0},
            {row: -1, column: 1},
            {row: 0, column: 1},
            {row: 1, column: 1}
        ].map(direction => {
            let coordinate = {row: row, column: column}
            while(true) {
                coordinate = {row: coordinate.row + direction.row, column: coordinate.column + direction.column}
                if (coordinate.row < 0 || coordinate.row >= seats.length) { return null }
                if (coordinate.column < 0 || coordinate.column >= seats[0].length) { return null }
                const tile = seats[coordinate.row][coordinate.column]
                if (tile != FLOOR) { return tile }
            }
        })
        .filter(tile => tile == OCCUPIED_SEAT)
        .length
    }
}

let initialSeats = (await Deno.readTextFile("seats.txt"))
    .split("\n")
    .map(line => line.split('') )

export {
    SeatsPartOne,
    SeatsPartTwo,
    initialSeats
} 

