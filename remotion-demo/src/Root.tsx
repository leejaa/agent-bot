import "./index.css";
import { Composition } from "remotion";
import { PolymindDemo } from "./PolymindDemo";
import { FPS, SCENE_FRAMES } from "./theme";

// Total = scenes only; the 5 transition fades overlap adjacent sequences and
// shorten the timeline by `5 × TRANSITION_FRAMES` (60). PolymindDemo declares
// `scene + transition` per sequence so that each scene's full duration is
// preserved and the composition lands at exactly 30s.
const TOTAL_FRAMES = Object.values(SCENE_FRAMES).reduce((a, b) => a + b, 0);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PolymindDemo"
        component={PolymindDemo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
