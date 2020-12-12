import joltage from './joltage.ts'

interface ComboTracker {
    number: number, 
    combos: number
}

const arrangementCount = joltage
    .reduce((comboTracker: ComboTracker[], jolts, index) => {    
        const combos = (comboTracker.length == 0) ? 1 : comboTracker
            .filter(combo => combo.number - jolts <= 3)
            .reduce((sum, combo) => { return sum += combo.combos }, 0)
        
        comboTracker.unshift({ number: jolts, combos: combos })
        
        if (comboTracker.length == 4) { 
            comboTracker.pop() 
        }

        return comboTracker
    }, [])[0]

console.log(`There are ${arrangementCount.combos} combos`)