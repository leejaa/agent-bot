import React from "react";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { loadFont } from "@remotion/google-fonts/Inter";
import { Audio, staticFile } from "remotion";
import { HookScene } from "./scenes/HookScene";
import { PromptScene } from "./scenes/PromptScene";
import { ModelScene } from "./scenes/ModelScene";
import { VerdictScene } from "./scenes/VerdictScene";
import { CTAScene } from "./scenes/CTAScene";
import { SHORT_SCENE_FRAMES, SHORT_TRANSITION_FRAMES } from "./theme";
import type { ShotData } from "../shots/types";

loadFont("normal", {
  weights: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

const T = SHORT_TRANSITION_FRAMES;

/**
 * Vertical shorts template (1080×1920). Takes a ShotData prop so the same
 * component can render any shot — just register a new Composition in Root.tsx
 * with a different defaultProps.
 *
 * Sequence durations: first scene owns its frames directly; all subsequent
 * sequences add +T to absorb the crossfade overlap so that every scene
 * displays for exactly SHORT_SCENE_FRAMES[key] frames on screen.
 */
export const ShortsComposition: React.FC<{ shot: ShotData }> = ({ shot }) => {
  return (
    <>
      {/*
       * BGM — replace public/bgm.mp3 with any royalty-free track (MP3/WAV).
       * Good sources: Pixabay Music, YouTube Audio Library, Bensound.
       * volume: 0.18 keeps music subtle under caption text.
       */}
      <Audio src={staticFile("bgm.mp3")} volume={0.18} />

    <TransitionSeries>
      {/* 1. Hook */}
      <TransitionSeries.Sequence durationInFrames={SHORT_SCENE_FRAMES.hook}>
        <HookScene lines={shot.hook} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: T })}
      />

      {/* 2. Prompt */}
      <TransitionSeries.Sequence
        durationInFrames={SHORT_SCENE_FRAMES.prompt + T}
      >
        <PromptScene text={shot.prompt} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: T })}
      />

      {/* 3. GPT */}
      <TransitionSeries.Sequence
        durationInFrames={SHORT_SCENE_FRAMES.model + T}
      >
        <ModelScene provider="gpt" text={shot.responses.gpt} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({
          config: { damping: 200 },
          durationInFrames: T,
        })}
      />

      {/* 4. Claude */}
      <TransitionSeries.Sequence
        durationInFrames={SHORT_SCENE_FRAMES.model + T}
      >
        <ModelScene provider="claude" text={shot.responses.claude} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({
          config: { damping: 200 },
          durationInFrames: T,
        })}
      />

      {/* 5. Gemini */}
      <TransitionSeries.Sequence
        durationInFrames={SHORT_SCENE_FRAMES.model + T}
      >
        <ModelScene provider="gemini" text={shot.responses.gemini} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: T })}
      />

      {/* 6. Verdict */}
      <TransitionSeries.Sequence
        durationInFrames={SHORT_SCENE_FRAMES.verdict + T}
      >
        <VerdictScene verdict={shot.verdict} />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={springTiming({
          config: { damping: 200 },
          durationInFrames: T,
        })}
      />

      {/* 7. CTA */}
      <TransitionSeries.Sequence durationInFrames={SHORT_SCENE_FRAMES.cta + T}>
        <CTAScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    </>
  );
};
