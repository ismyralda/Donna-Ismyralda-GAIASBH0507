export const gradeFor = (s) => (s >= 90 ? 'S' : s >= 80 ? 'A' : s >= 65 ? 'B' : s >= 50 ? 'C' : 'D')

// Sample past rounds so the demo looks lived-in. Scoring is mock for now.
export const sessions = [
  { id: 1, title: 'Self intro', mode: 'Impression Blitz', score: 58,
    content: { main: 60, hook: 50, structure: 62 },
    delivery: { pace: 55, fillers: 48, eye: 66, pauses: 58, posture: 60 } },
  { id: 2, title: 'Elevator pitch', mode: 'Impression Blitz', score: 64,
    content: { main: 66, hook: 58, structure: 68 },
    delivery: { pace: 62, fillers: 55, eye: 70, pauses: 64, posture: 66 } },
  { id: 3, title: 'Interview opener', mode: 'Impression Blitz', score: 71,
    content: { main: 74, hook: 66, structure: 72 },
    delivery: { pace: 70, fillers: 64, eye: 76, pauses: 70, posture: 73 } },
  { id: 4, title: 'Investor roleplay', mode: 'Improv Showdown', score: 69,
    content: { main: 72, hook: 62, structure: 70 },
    delivery: { pace: 68, fillers: 60, eye: 74, pauses: 66, posture: 71 } },
  { id: 5, title: 'Self intro', mode: 'Impression Blitz', score: 77,
    content: { main: 80, hook: 72, structure: 78 },
    delivery: { pace: 76, fillers: 70, eye: 80, pauses: 74, posture: 78 } },
  { id: 6, title: 'Customer roleplay', mode: 'Improv Showdown', score: 84,
    content: { main: 86, hook: 80, structure: 84 },
    delivery: { pace: 83, fillers: 78, eye: 88, pauses: 82, posture: 85 } },
]

export const player = { level: 3, rank: 'Rookie Speaker', xp: 340, xpNext: 500, streak: 4 }
