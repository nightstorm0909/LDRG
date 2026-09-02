import type { IconName } from '../components/LineIcon'

export type Category = {
  id: string
  title: string
  blurb: string
  icon: IconName
  tone: 'default' | 'alt' | 'accent'
}

export type Game = {
  id: string
  categoryId: string
  title: string
  blurb: string
  rules: string
  steps: string[]
  players: string
  tone: 'default' | 'alt' | 'accent'
}

export const categories: Category[] = [
  {
    id: 'cozy',
    title: 'Cozy & connect',
    blurb: 'Would You Rather, This or That — talk until sunrise.',
    icon: 'heart',
    tone: 'alt',
  },
  {
    id: 'party',
    title: 'Party',
    blurb: 'Two Truths, Never Have I Ever — silly on purpose.',
    icon: 'spark',
    tone: 'default',
  },
  {
    id: 'classic',
    title: 'Classic',
    blurb: 'Tic-Tac-Toe and Connect Four, one board, two cities.',
    icon: 'grid',
    tone: 'accent',
  },
  {
    id: 'words',
    title: 'Words',
    blurb: 'Hangman and other quiet duels over a shared screen.',
    icon: 'type',
    tone: 'default',
  },
]

export const games: Game[] = [
  {
    id: 'would-you-rather',
    categoryId: 'cozy',
    title: 'Would You Rather',
    blurb: 'Two options. One pick. Then talk about why.',
    rules: 'Take turns. Each round shows two choices. Both answer, then compare.',
    steps: [
      'A prompt with two options appears for both of you.',
      'Each person picks one side.',
      'Reveal together and talk about the choice.',
    ],
    players: '2',
    tone: 'alt',
  },
  {
    id: 'this-or-that',
    categoryId: 'cozy',
    title: 'This or That',
    blurb: 'Fast picks. No overthinking.',
    rules: 'A pair appears. Both tap one side. Reveal together.',
    steps: [
      'Two words or ideas show up.',
      'Tap one. No essays.',
      'See if you matched, then the next pair.',
    ],
    players: '2',
    tone: 'default',
  },
  {
    id: 'two-truths',
    categoryId: 'party',
    title: 'Two Truths and a Lie',
    blurb: 'Three statements. Spot the fake.',
    rules: 'One player sends three lines. The other guesses the lie.',
    steps: [
      'One of you writes two truths and one lie.',
      'The other guesses which line is fake.',
      'Swap roles and go again.',
    ],
    players: '2',
    tone: 'default',
  },
  {
    id: 'never-have-i-ever',
    categoryId: 'party',
    title: 'Never Have I Ever',
    blurb: 'Confess or pass, one prompt at a time.',
    rules: 'A prompt appears. Both mark yes or no. Then the next one.',
    steps: [
      'Read the prompt.',
      'Both tap “I have” or “I have not”.',
      'Compare, laugh, next prompt.',
    ],
    players: '2',
    tone: 'accent',
  },
  {
    id: 'tic-tac-toe',
    categoryId: 'classic',
    title: 'Tic-Tac-Toe',
    blurb: 'Three in a row, two cities.',
    rules: 'Host is X. Guest is O. Alternate taps on the shared board.',
    steps: [
      'Host plays X, guest plays O.',
      'Take turns claiming a cell.',
      'Three in a row wins. Full board is a draw.',
    ],
    players: '2',
    tone: 'accent',
  },
  {
    id: 'connect-four',
    categoryId: 'classic',
    title: 'Connect Four',
    blurb: 'Drop discs. Get four in a line.',
    rules: 'Take turns dropping a disc. First to four wins.',
    steps: [
      'Pick a column. Your disc falls to the lowest empty slot.',
      'Alternate turns.',
      'First to four in a row — across, down, or diagonal — wins.',
    ],
    players: '2',
    tone: 'default',
  },
  {
    id: 'hangman',
    categoryId: 'words',
    title: 'Hangman',
    blurb: 'One thinks of a word. The other guesses letters.',
    rules: 'Host sets a word. Guest guesses letters until it is solved or missed.',
    steps: [
      'Host secretly enters a word.',
      'Guest guesses one letter at a time.',
      'Fill the blanks before the misses run out.',
    ],
    players: '2',
    tone: 'default',
  },
]

export function getCategory(id: string): Category | undefined {
  return categories.find((category) => category.id === id)
}

export function getGame(id: string): Game | undefined {
  return games.find((game) => game.id === id)
}

export function gamesInCategory(categoryId: string): Game[] {
  return games.filter((game) => game.categoryId === categoryId)
}
