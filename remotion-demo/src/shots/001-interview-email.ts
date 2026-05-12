import type { ShotData } from "./types";

export const shot: ShotData = {
  id: "001",
  hook: ["Asked 3 AIs", "the exact", "same question"],
  prompt: "Write a thank-you email after my job interview",
  responses: {
    gpt: `Subject: Thank you for today

Hi Sarah,

Really enjoyed our conversation about the team's roadmap. I'm excited about the role.

Let me know if there's anything else I can share.

Best,
Alex`,
    claude: `Hi Sarah,

Your point about how the team prototypes ideas really stuck with me. I came away even more excited.

Anything else I can share, just say the word.

Alex`,
    gemini: `Tips: send within 24h, reference one specific moment, reiterate your fit.

Hi Sarah, thanks for today. Our discussion about cross-team work reinforced my interest. Looking forward to next steps.

Alex`,
  },
  verdict: {
    gpt: "Formal business tone",
    claude: "Emotional + specific details",
    gemini: "Strategy guide + sample",
  },
};
