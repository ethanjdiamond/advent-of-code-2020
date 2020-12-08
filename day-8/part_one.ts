import { Instruction, Computer } from "./computer.ts"

const instructions = (await Deno.readTextFile("instructions.txt"))
            .split("\n")
            .map(line => new Instruction(line))
const computer = new Computer(instructions)
const programOutput = computer.run()

console.log(`The accumulator value is ${programOutput.accumulator}`)