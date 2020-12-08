const bagMap = (await Deno.readTextFile("bags.txt"))
    .split("\n")
    .reduce((map, line) => {
        const [, bag, contentsLine] = line.match(/(.*) bags contain (.*)\./) || []
        const contents = contentsLine
            .split(", ")
            .map(line => {
                const [, count, bag] = line.match(/(\d+) (.*) bags?/) || []
                return {
                    count: parseInt(count),
                    bag: bag
                }
            })
        map.set(bag, contents.filter(content => { return !isNaN(content.count) }))
        return map
    }, new Map<string, Array<{bag: string, count: number}>>())

console.log(bagMap)

export default bagMap