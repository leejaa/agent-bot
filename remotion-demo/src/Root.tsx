import "./index.css";
import { Composition } from "remotion";
import { PolymindDemo } from "./PolymindDemo";
import { FPS, SCENE_FRAMES } from "./theme";
import { ShortsComposition } from "./shorts/ShortsComposition";
import { TOTAL_SHORT_FRAMES, SHORT_FPS } from "./shorts/theme";
import { shot as shot001 } from "./shots/001-interview-email";

const TOTAL_FRAMES = Object.values(SCENE_FRAMES).reduce((a, b) => a + b, 0);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Landscape demo — landing page hero (1920×1080, 30s) */}
      <Composition
        id="PolymindDemo"
        component={PolymindDemo}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* Vertical shorts — YouTube Shorts / TikTok / Instagram Reels (1080×1920, 29s) */}
      <Composition
        id="Shorts-001"
        component={ShortsComposition}
        defaultProps={{ shot: shot001 }}
        durationInFrames={TOTAL_SHORT_FRAMES}
        fps={SHORT_FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
