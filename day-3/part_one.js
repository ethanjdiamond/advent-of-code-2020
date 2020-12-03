const fs = require('fs')

const treeCount = 
    fs.readFileSync('slope.txt', { encoding:'utf8' })
      .split("\n")
      .reduce((accum, line) => {
        return { 
            xPos: (accum.xPos + 3) % line.length, 
            treeCount: accum.treeCount + (line.charAt(accum.xPos) == "#" ? 1 : 0) 
        }
      }, { xPos: 0, treeCount: 0 })
      .treeCount
      
console.log(`You hit ${treeCount} trees`)