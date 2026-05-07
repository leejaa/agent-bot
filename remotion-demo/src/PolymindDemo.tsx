import React from "react";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { loadFont } from "@remotion/google-fonts/Inter";
import { IntroScene } from "./scenes/IntroScene";
import { EmptyChatScene } from "./scenes/EmptyChatScene";
import { TypingScene } from "./scenes/TypingScene";
import { StreamingScene } from "./scenes/StreamingScene";
import { DoneScene } from "./scenes/DoneScene";
import { OutroScene } from "./scenes/OutroScene";
import { SCENE_FRAMES } from "./theme";

// Block the render until Inter is ready so headings don't flash a fallback.
loadFont("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin"] });

const TRANSITION_FRAMES = 12;

/**
 * Top-level composition. Six scenes wired with crossfades; transition frames
 * are absorbed by both adjacent sequences so the durations declared in
 * `SCENE_FRAMES` reflect what each scene actually owns on screen.
 */
export const PolymindDemo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.intro}>
        <IntroScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_FRAMES })}
      />

      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.empty + TRANSITION_FRAMES}>
        <EmptyChatScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.typing + TRANSITION_FRAMES}>
        <TypingScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.streaming + TRANSITION_FRAMES}>
        <StreamingScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.done + TRANSITION_FRAMES}>
        <DoneScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      <TransitionSeries.Sequence durationInFrames={SCENE_FRAMES.outro + TRANSITION_FRAMES}>
        <OutroScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
