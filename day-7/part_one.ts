import bagMap from "./bags.ts"

const invertedBagMap = Array.from(bagMap.entries())
    .reduce((map, entry) => {
        const [bag, innerBags] = entry
        innerBags.forEach(innerBag => {
            const list = map.get(innerBag.bag) || []
            list.push(bag) 
            map.set(innerBag.bag, list)
        })
        return map
    }, new Map<string, Array<string>>())

let bags = new Set<string>()
let visitQueue = ['shiny gold']
while (visitQueue.length > 0) {
    let item = visitQueue.pop()!
    if (bags.has(item)) { continue }
    bags.add(item)
    visitQueue.push(...(invertedBagMap.get(item) ?? []))
}

console.log(`It can be carried by ${bags.size - 1} bags`)