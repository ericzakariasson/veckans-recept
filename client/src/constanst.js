export const WEEK_DAYS = {
  0: {
    index: 0,
    name: 'Måndag',
    recipe: null,
    frozen: false,
    enabled: true,
  },
  1: {
    index: 1,
    name: 'Tisdag',
    recipe: null,
    frozen: false,
    enabled: true,
  },
  2: {
    index: 2,
    name: 'Onsdag',
    recipe: null,
    frozen: false,
    enabled: true,
  },
  3: {
    index: 3,
    name: 'Torsdag',
    recipe: null,
    frozen: false,
    enabled: false,
  },
  4: {
    index: 4,
    name: 'Fredag',
    recipe: null,
    frozen: false,
    enabled: true,
  },
}

const options = {
  froze: false,
  enabled: true,
}

const DAYS = [
  'Måndag',
  'Tisdags',
  'Onsdag',
  'Torsdag',
  'Fredag',
  'Lördag',
  'Söndag',
]

DAYS.reduce((week, day, i) => (week[i] = { name: day, ...options }), {})
