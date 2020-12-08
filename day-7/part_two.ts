import bagMap from "./bags.ts"

function calculateValue(bag: string, count: number): number {    
    let bagValue = (bagMap.get(bag)! || [])
        .reduce((value, bagData) => {
            return value + calculateValue(bagData.bag, bagData.count)
        }, 1)

    return count * bagValue
}

console.log(`There are ${calculateValue('shiny gold', 1) - 1} nested bags`)