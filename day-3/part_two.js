const fs = require('fs')

function countTreesHit({xDelta, yDelta}) {
    return fs.readFileSync('slope.txt', { encoding:'utf8' })
      .split("\n")
      .filter((line, index) => {
          return index % yDelta == 0
      })
      .reduce((accum, line) => {
        return { 
            xPos: (accum.xPos + xDelta) % line.length, 
            treeCount: accum.treeCount + (line.charAt(accum.xPos) == "#" ? 1 : 0) 
        }
      }, { xPos: 0, treeCount: 0 })
      .treeCount
}

var results = [
    countTreesHit({xDelta: 1, yDelta: 1}),
    countTreesHit({xDelta: 3, yDelta: 1}),
    countTreesHit({xDelta: 5, yDelta: 1}),
    countTreesHit({xDelta: 7, yDelta: 1}),
    countTreesHit({xDelta: 1, yDelta: 2})
]
      
results.forEach(result => {
    console.log(`You hit ${result} trees`)    
})

let resultProduct = results.reduce((accum, result) => {
    return accum * result
}, 1)
console.log(`The answer is ${resultProduct}`)