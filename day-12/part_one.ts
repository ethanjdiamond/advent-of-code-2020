type Heading = "N" | "S" | "E" | "W"

interface ShipState {
    x: number,
    y: number,
    heading: Heading
}

function turn(initialHeading: Heading, degrees: number): Heading {
    if (degrees < 0) {
        degrees = 360 + degrees
    }
    
    const headings: Heading[] = ["N", "E", "S", "W"]
    let headingIndex = (headings.indexOf(initialHeading) + (degrees / 90)) % headings.length
    return headings[headingIndex]
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
        if (instruction.command == "F") {
            instruction.command = state.heading
        }

        switch (instruction.command) {
            case "S":
                state.y -= instruction.value
                break
            case "N":
                state.y += instruction.value
                break
            case "W":
                state.x -= instruction.value
                break
            case "E":
                state.x += instruction.value
                break
            case "R":
                state.heading = turn(state.heading, instruction.value)
                break
            case "L":
                state.heading = turn(state.heading, -instruction.value)
                break
        }
        return state
    }, { x: 0, y: 0, heading: "E"})

console.log(`The answer is ${Math.abs(state.x) + Math.abs(state.y)}`)

export {}