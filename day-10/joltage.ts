const joltage = (await Deno.readTextFile("joltage.txt"))
    .split("\n")
    .map(number => { return parseInt(number) })
    .sort((a, b) => { return b - a })
joltage.push(0)
joltage.unshift(joltage[0] + 3)
export default joltage
