import { Instruction, Computer } from "./computer.ts"

let programOutput = {accumulator: 0, didTerminate: false}
let flippedInstruction = 0
while (true) {
    let instructions = (await Deno.readTextFile("instructions.txt"))
            .split("\n")
            .map(line => new Instruction(line))

    let didFlip = true
    switch (instructions[flippedInstruction].instruction) {
        case "jmp":
            instructions[flippedInstruction].instruction = "nop"
            break
        case "nop":
            instructions[flippedInstruction].instruction = "jmp"
            break
        default:
            didFlip = false
            break
    }

    flippedInstruction += 1

    if (!didFlip) {
        continue
    }

    const computer = new Computer(instructions)
    programOutput = computer.run()
    if (programOutput.didTerminate) {
        break
    }
}

console.log(`The accumulator value is ${programOutput.accumulator} and the instruction I changed was ${flippedInstruction}`)