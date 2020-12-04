/*
    byr (Birth Year) - four digits; at least 1920 and at most 2002.
    iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
    hgt (Height) - a number followed by either cm or in:
    If cm, the number must be at least 150 and at most 193.
    If in, the number must be at least 59 and at most 76.
    hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
    ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    pid (Passport ID) - a nine-digit number, including leading zeroes.
*/

function fetchField(field: string, passport: string) {
    const regex = new RegExp(`${field}:(\\S*)`)
    const match = passport.match(regex)
    return match ? match[1] : null
}

function hasValidBirthYear(passport: string) {
    const value = fetchField("byr", passport)
    if (value == null) { return false }
    return value.match(/^\d{4}$/) && parseInt(value) >= 1920 && parseInt(value) <= 2002
}

function hasValidIssueYear(passport: string) {
    const value = fetchField("iyr", passport)
    if (value == null) { return false }
    return value.match(/^\d{4}$/) && parseInt(value) >= 2010 && parseInt(value) <= 2020
}

function hasValidExpirationYear(passport: string) {
    const value = fetchField("eyr", passport)
    if (value == null) { return false }
    return value.match(/^\d{4}$/) && parseInt(value) >= 2020 && parseInt(value) <= 2030
}

function hasValidHeight(passport: string) {
    const value = fetchField("hgt", passport)
    if (value == null) { return false }
    const [, number, measure] = value.match(/^(\d*)(cm|in)$/) || []
    switch(measure) {
        case "cm": { 
            return parseInt(number) >= 150 && parseInt(number) <= 193
        }
        case "in": {
            return parseInt(number) >= 59 && parseInt(number) <= 76
        }
        default: {
            return false
        }
    }
}

function hasValidHairColor(passport: string) {
    const value = fetchField("hcl", passport)
    if (value == null) { return false }
    return value.match(/^#[0-9a-f]{6}$/)
}

function hasValidEyeColor(passport: string) {
    const value = fetchField("ecl", passport)
    if (value == null) { return false }
    return value.match(/^amb|blu|brn|gry|grn|hzl|oth/)
}

function hasValidPassportId(passport: string) {
    const value = fetchField("pid", passport)
    if (value == null) { return false }
    return value.match(/^\d{9}$/)
}

const validPassportCount = 
    (await Deno.readTextFile('passports.txt'))
        .split("\n\n")
        .filter(passport => {
            return hasValidBirthYear(passport) &&
                hasValidIssueYear(passport) &&
                hasValidExpirationYear(passport) &&
                hasValidHeight(passport) &&
                hasValidHairColor(passport) &&
                hasValidEyeColor(passport) &&
                hasValidPassportId(passport)
        })
        .length

console.log(`There are ${validPassportCount} valid profiles`)