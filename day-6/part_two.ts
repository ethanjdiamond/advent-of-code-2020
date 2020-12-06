interface Set<T> {
    intersection(set: Set<T>): Set<T>
}
  
Set.prototype.intersection = function(set: Set<any>): Set<any> {
    return new Set([...this].filter(item => { return set.has(item) }))      
}

const fileName = Deno.args[0]
const answer = (await Deno.readTextFile(fileName))
    .split("\n\n")
    .map(groupAnswer => {
        return groupAnswer
            .split("\n")
            .map(line => {
                return new Set(line.split(''))
            })
            .reduce((sharedAnswers: Set<string> | null, answer) => {
                if (sharedAnswers === null) { return answer }
                return sharedAnswers.intersection(answer)
            }, null)!
            .size 
    })
    .reduce((sum, sharedAnswerCount) => {
        return sum + sharedAnswerCount
    }, 0)

console.log(`There are ${answer} unique answers when you sum the groups`)