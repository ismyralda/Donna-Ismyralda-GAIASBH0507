const lorem = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.',
]

// Image block colours cycle: mint, yellow, charcoal (style-guide colour names)
export const tones = [
  { bg: 'bg-[var(--mint)]', icon: 'text-[var(--charcoal)]' },
  { bg: 'bg-[var(--yellow)]', icon: 'text-[var(--charcoal)]' },
  { bg: 'bg-[var(--charcoal)]', icon: 'text-[var(--mint)]' },
]

// [slug, title, icon name (see data/icons.js), description]
export const posts = [
  ['open-with-a-hook', 'Open with a hook', 'microphone', 'Your first ten seconds decide if they listen.'],
  ['cut-filler-words', 'Cut filler words', 'player-pause', 'Swap every um and uh for a calm pause.'],
  ['find-your-pace', 'Find your pace', 'clock', 'Too fast loses people, too slow loses interest.'],
  ['calm-your-nerves', 'Calm your nerves', 'mood-smile', 'Simple habits that steady you before you speak.'],
  ['structure-in-60-seconds', 'Structure in 60 seconds', 'list-numbers', 'Open, prove, close: a frame for short pitches.'],
  ['one-main-point', 'One main point', 'target', 'Make a single idea stick instead of five.'],
  ['body-language', 'Body language', 'user', 'Posture and eye contact that back up your words.'],
  ['use-pauses-on-purpose', 'Use pauses on purpose', 'bulb', 'Silence can make your key line land harder.'],
  ['handle-tough-questions', 'Handle tough questions', 'message-question', 'Stay steady when the panel pushes back.'],
].map(([slug, title, icon, description]) => ({ slug, title, icon, description, body: lorem }))
