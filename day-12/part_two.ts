interface ShipState {
    ship: Coordinate,
    waypoint: Coordinate
}

interface Coordinate {
    x: number,
    y: number
}

function turn(initialCoordinate: Coordinate, degrees: number): Coordinate {
    if (degrees < 0) {
        degrees = 360 + degrees
    }

    switch (degrees / 90) {
        case 0:
            return initialCoordinate
        case 1:
            return {x: -initialCoordinate.y, y: initialCoordinate.x}
        case 2:
            return {x: -initialCoordinate.x, y: -initialCoordinate.y}
        case 3:
            return {x: initialCoordinate.y, y: -initialCoordinate.x}
        default:
            Deno.exit(1)
    }
}

let state = (await Deno.readTextFile("instructions.txt"))
    .split("\n")
    .map(line => {
        const [,command,value] = line.match(/(S|E|L|F|N|W|R)(\d*)/) || []
        return {
            command: command,
            value: parseInt(value)
        }
    })
    .reduce((state: ShipState, instruction) => {
        switch (instruction.command) {
            case "F":
                state.ship.x += state.waypoint.x * instruction.value
                state.ship.y += state.waypoint.y * instruction.value
                break
            case "S":
                state.waypoint.y -= instruction.value
                break
            case "N":
                state.waypoint.y += instruction.value
                break
            case "E":
                state.waypoint.x -= instruction.value
                break
            case "W":
                state.waypoint.x += instruction.value
                break
            case "R":
                state.waypoint = turn(state.waypoint, instruction.value)
                break
            case "L":
                state.waypoint = turn(state.waypoint, -instruction.value)
                break
        }
        return state
    }, { ship: {x: 0, y: 0}, waypoint: {x: -10, y: 1} })

console.log(`The answer is ${Math.abs(state.ship.x) + Math.abs(state.ship.y)}`)

export {}