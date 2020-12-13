const fs = require("fs")

const day7 = (function () {
  const rules = fs.readFileSync('./bagrules.txt')
    .toString('utf-8')
    .split('\n')

  const bagRules = rules.map((ruleString) => parseRule(ruleString))

  function part1() {
    const numBags = bagRules.reduce((accNumBags, bagRule) => {
      return canContain(bagRule, 'shiny gold') ? accNumBags + 1 : accNumBags
    }, 0)

    console.log(`Part 1 - number of bag colours which can hold a shiny gold bag: ${numBags}`)
  }

  function part2() {
    const bags = numBagsIn('shiny gold')
    console.log(`Part 2 - number of bags inside a shiny gold bag: ${bags}`)
  }

  function numBagsIn(bagColour) {
    const rule = getRule(bagColour);
    if (!rule.contents) {
      return 0
    } else {
      return rule.contents.reduce((acc, content) => { 
        return acc + content.num + content.num * numBagsIn(content.colour)
      }, 0)
    }
  }

  function canContain(bagRule, desiredBag) {
    if (!bagRule.contents || bagRule.colour === desiredBag) {
      return false
    } else if (bagRule.contents.some(content => content.colour === desiredBag)) {
      return true
    } else {
      return bagRule.contents.some(content => {
        return canContain(getRule(content.colour), desiredBag)
      })
    }
  }

  function getRule(colour) {
    return bagRules.find(rule => rule.colour === colour)
  }

  function parseRule(ruleString) {
    const colour = ruleString.match(/^\w+ \w+/)
    const contents = ruleString.match(/(\d \w+ \w+)(?= bags?)/g)

    const rule = {
      colour: colour[0],
      contents: contents && contents.map(content => {
        return {
          num: parseInt(content.slice(0, 1)),
          colour: content.slice(2)
        }
      })
    }

    return rule
  }

  part1()
  part2()
})()