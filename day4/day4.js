const { captureRejectionSymbol } = require("events")
const fs = require("fs")

const day4 = (function () {
  const passports = fs.readFileSync('./passports.txt')
    .toString('utf-8')
    .split('\n\n')

  console.log(passports[0])

  const required = [
    'byr:',
    'iyr:',
    'eyr:',
    'hgt:',
    'hcl:',
    'ecl:',
    'pid:'
  ]

  function includesRequired (passport) {
    return required.every(requiredField => passport.includes(requiredField))
  }

  function part1 () {

    
    const numValidPassports = passports.reduce((accValidPassports, passport) => {
      return includesRequired(passport) ? accValidPassports + 1 : accValidPassports
    }, 0)
  
    console.log(`Part 1: Number of valid passports: ${numValidPassports}`)
  }

  //WIP: Not returning the right answer...
  function part2 () {

    const hexCodeRegex = /^#[a-f0-9]{6}$/
    const passportRegex = /^[0-9]{9}$/
    const eyeColours = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

    const validators = {
      'byr': byr => byr.length === 4 && parseInt(byr, 10) >= 1920 && parseInt(byr, 10) <= 2002,
      'iyr': iyr => iyr.length === 4 && parseInt(iyr, 10) >= 2010 && parseInt(iyr, 10) <= 2020, 
      'eyr': eyr => eyr.length === 4 && parseInt(eyr, 10) >= 2020 && parseInt(eyr, 10) <= 2030,
      'hgt': hgt => (hgt.slice(-2) === 'cm' && parseInt(hgt, 10) >= 150 && parseInt(hgt, 10) <= 193) || (hgt.slice(-2) === 'in' && parseInt(hgt, 10) >= 59 && parseInt(hgt, 10) <= 76),
      'hcl': hcl => !!hcl.match(hexCodeRegex),
      'ecl': ecl => eyeColours.includes(ecl),
      'pid': pid => !!pid.match(passportRegex)
    }

    const numValidPassports = passports.reduce((accValidPassports, passport) => {
      if(!includesRequired) {
        return accValidPassports
      }

      const args = passport.split(/\n| /g)

      console.log(`${passport}\n\n`)
      console.log(`${args}\n\n`)
      const valid = args.every(arg => {
        const [type, value] = arg.split(':')

        console.log(`${arg}\n`)

        return !validators[type] || validators[type](value)
      })
      return valid ? accValidPassports + 1 : accValidPassports
    }, 0)


    console.log(`Part 2: Number of valid passports: ${numValidPassports}`)

  }


  part1()
  part2()


}())