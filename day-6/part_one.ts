const fileName = Deno.args[0]
const answer = (await Deno.readTextFile(fileName))
    .split("\n\n")
    .map(groupAnswer => {
        const joinedAnswers = groupAnswer
            .replace(/\n/g, '')
            .split('')
        const uniqueJoinedAnswers = new Set(joinedAnswers)
        return uniqueJoinedAnswers.size
    })
    .reduce((sum, uniqueLetterCount) => {
        return sum + uniqueLetterCount
    }, 0)

console.log(`There are ${answer} unique answers when you sum the groups`)