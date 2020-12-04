const file = await Deno.readTextFile('passports.txt')

function isPassportValid(passport: string) {
  return ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
    .filter(field => {
      return !passport.includes(`${field}:`)
    })
    .length == 0
}

const validPassportCount = file
  .split("\n\n")
  .filter(passport => {
    return isPassportValid(passport)
  })
  .length
  
console.log(`There are ${validPassportCount} valid profiles`)