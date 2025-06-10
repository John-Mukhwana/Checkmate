// interface FlowState {
//   message: string;
//   options?: { [key: string]: string };
// }

// export const ussdFlow: { [key: string]: FlowState } = {
//   welcome: {
//     message: "Welcome to TelePsyche 💚\n1. I'm feeling anxious\n2. I need motivation\n3. Talk to a therapist\n4. Learn about mental health",
//     options: {
//       '1': 'anxious',
//       '2': 'motivation',
//       '3': 'therapist',
//       '4': 'learn'
//     }
//   },
//   anxious: {
//     message: "It's okay to feel anxious. Try deep breathing: inhale for 4 seconds, hold for 4, exhale for 4.\n1. Try again\n2. Back to menu",
//     options: { '1': 'anxious', '2': 'welcome' }
//   },
//   motivation: {
//     message: "You're stronger than you know! Keep going.\n1. Another tip\n2. Back to menu",
//     options: { '1': 'motivation', '2': 'welcome' }
//   },
//   therapist: {
//     message: "We'll connect you to a therapist soon. Reply with your preferred time or press 1 to go back.",
//     options: { '1': 'welcome' }
//   },
//   learn: {
//     message: "Mental health matters. Learn more at www.mind.org\n1. Back to menu",
//     options: { '1': 'welcome' }
//   }
// };

export const ussdFlow = {
  welcome: {
    message: `Welcome to TelePsyche 💚
1. I'm feeling anxious
2. I need motivation
3. Talk to a therapist
4. Learn about mental health`,
    options: {
      '1': 'anxious',
      '2': 'motivation',
      '3': 'therapist',
      '4': 'learn',
    },
  },
  anxious: {
    message: 'Take a deep breath. Try these tips:\n1. Practice deep breathing\n2. Talk to a friend\n3. Call 1195 for help',
    options: {
      '3': 'emergency',
    },
  },
  motivation: {
    message: 'You are enough! Keep going:\n1. Set small goals\n2. Celebrate progress\n3. Stay positive',
  },
  therapist: {
    message: 'A therapist will contact you. Reply with a time (e.g., 2 PM) or text TALK to confirm.',
  },
  emergency: {
    message: 'Call 1195 now for immediate support.',
  },
  learn: {
    message: `Learn about mental health:
1. Anxiety
2. Stress Management
3. Depression`,
    options: {
      '1': 'learn_anxiety',
      '2': 'learn_stress',
      '3': 'learn_depression',
    },
  },
  learn_anxiety: {
    message: 'Notes on Anxiety sent via SMS. Check your messages.',
  },
  learn_stress: {
    message: 'Notes on Stress Management sent via SMS. Check your messages.',
  },
  learn_depression: {
    message: 'Notes on Depression sent via SMS. Check your messages.',
  },
};