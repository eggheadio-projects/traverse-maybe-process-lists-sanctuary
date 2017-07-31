import { Just, Nothing, of, traverse, justs, fromMaybe,
equals, gte, mult, map, compose, join, mean } from 'sanctuary'


//   3 Player Team:    Player1    Player2    Player3
const TEAM_POINTS = [ [2, 4, 5], [6, 0, 7], [1, 3, 8] ]
// Rules: Players with 0 points in any round get disqualified,
// points >= 5 get doubled, & team score = avg of valid scores

const maybeScore = points => equals(0)(points)
  ? Nothing
  : gte(5)(points) ? Just(mult(2)(points)) : Just(points)

// const beforeTraversal = map(map(maybeScore))(TEAM_POINTS)
// console.log('\n before traversal: \n', beforeTraversal, '\n')

const applyRules = traverse(of)(maybeScore)
const playerScores = map(applyRules)(TEAM_POINTS)
console.log('\n player scores: \n', playerScores, '\n')

const validScores = compose(join, justs)(playerScores)
console.log('\n valid player scores: \n', validScores, '\n')

const teamScore = compose(fromMaybe(0), mean)(validScores)
console.log('\n team score: \n', teamScore, '\n')