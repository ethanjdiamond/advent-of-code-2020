class Seat {
    row: number
    column: number
    id: number

    constructor(directions: Array<string>) {
        let possibleRows = {min: 0, max: 127}
        let possibleColumns = {min: 0, max: 7}

        function delta(values: {min: number, max: number}) {
            return values.max - values.min + 1
        }

        directions.forEach(direction => {
            switch(direction) {
                case "B":
                    possibleRows.min += delta(possibleRows) / 2
                    break
                case "F":
                    possibleRows.max -= delta(possibleRows) / 2
                    break
                case "R":
                    possibleColumns.min += delta(possibleColumns) / 2
                    break
                case "L": 
                    possibleColumns.max -= delta(possibleColumns) / 2
                    break
                default: 
                    Deno.exit(1)
            }
        })
        if (possibleRows.min != possibleRows.max || possibleColumns.min != possibleColumns.max) {
            Deno.exit(1)
        }

        this.row = possibleRows.min
        this.column = possibleColumns.max
        this.id = 8 * this.row + this.column
    }
}

const seats = (await Deno.readTextFile('seats.txt'))
    .split("\n")
    .map(seatLine => {
        return new Seat(seatLine.split(''))
    })


export default seats