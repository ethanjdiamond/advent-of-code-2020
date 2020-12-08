class Instruction {
    instruction: string
    value: number

    constructor(line: string) {
        let [, instruction, operand, value] = line.match(/(nop|acc|jmp|tmt) (.)(\d*)/) || []
        this.instruction = instruction
        this.value = operand == "+" ? parseInt(value) : -parseInt(value)
    }

    static terminate(): Instruction {
        return new Instruction("tmt +0")
    }
}

class Computer {
    instructions: Array<Instruction>
    accumulator = 0
    pointer = 0

    constructor(instructions: Array<Instruction>) {
        this.instructions = instructions
        this.instructions.push(Instruction.terminate())
    }

    run(): {accumulator: number, didTerminate: boolean} {
        let visitedIndices = new Set<number>()
        
        while (true) {
            let instruction = this.instructions[this.pointer]

            if (visitedIndices.has(this.pointer))  {
                return {accumulator: this.accumulator, didTerminate: false}
            }
            visitedIndices.add(this.pointer)
            
            switch(instruction.instruction) {
                case "jmp":
                    this.pointer += instruction.value
                    break
                case "nop":
                    this.pointer += 1
                    break
                case "acc":
                    this.pointer += 1
                    this.accumulator += instruction.value
                    break
                case "tmt":
                    return {accumulator: this.accumulator, didTerminate: true}
            }
        }
        Deno.exit(1)
    }
}

export {
    Computer, 
    Instruction
}