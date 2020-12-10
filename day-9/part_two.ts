const numbers = (await Deno.readTextFile("numbers.txt"))
    .split("\n")
    .map(number => { return parseInt(number) })

function findConsecutiveWithSum(desiredSum: number, numbers: number[]) {
    for(let i = 0; i < numbers.length; i++) {
        let min = Number.MAX_SAFE_INTEGER
        let max = 0
        let sum = 0
        for (let j = i; j < numbers.length; j++) {
            max = Math.max(max, numbers[j])
            min = Math.min(min, numbers[j])
            sum += numbers[j]
    
            if (sum == desiredSum) {
                return {
                    min: min,
                    max: max
                }
            } else if (sum > desiredSum) {
                break
            }
        }
    }

    Deno.exit(1)
}

const consecutive = findConsecutiveWithSum(138879426, numbers)

console.log(`The answer is ${consecutive.min + consecutive.max}`)