"use client";

import { useState } from "react";
import FadingInkTool from "./FadingInkTool";
import AnchorPointTool from "./AnchorPointTool";
import VoiceHighlightTool from "./VoiceHighlightTool";

type ToolMode = "ink" | "anchor" | "voice";

const images = [
  {
    name: "Group Project Report",
    src: "/annotshare/scenario-1.png",
    voiceQuestion: "So which tool has the biggest room for improvement?",
    voiceAnswer: "75% accuracy detected.",
    voiceBoxes: ["panel4-highlight-report-row"],
  },
  {
    name: "Diagram Editor",
    src: "/annotshare/scenario-2.png",
    voiceQuestion: 'Say "rectangle" to find matching shapes.',
    voiceAnswer: "Rectangle detected.",
    voiceBoxes: [
      "panel4-shape-box-1",
      "panel4-shape-box-2",
      "panel4-shape-box-3",
    ],
  },
];

export default function CombinedStoryTool() {
  const [imageIndex, setImageIndex] = useState(0);
  const [toolMode, setToolMode] = useState<ToolMode>("ink");

  const image = images[imageIndex];

  function nextImage() {
    setImageIndex((oldIndex) =>
      oldIndex === images.length - 1 ? 0 : oldIndex + 1
    );
  }

  return (
    <article className="demo-tool-card card demo-combined-card">
      <div className="demo-tool-content demo-tool-content-top demo-combined-header">
        <h2>Combined Tools</h2>

        <div className="demo-button-row">
          <button
            className={
              toolMode === "ink"
                ? "demo-tool-button tool-toggle-active"
                : "demo-tool-button secondary tool-toggle-inactive"
            }
            type="button"
            onClick={() => setToolMode("ink")}
          >
            Fading Ink
          </button>

          <button
            className={
              toolMode === "anchor"
                ? "demo-tool-button tool-toggle-active"
                : "demo-tool-button secondary tool-toggle-inactive"
            }
            type="button"
            onClick={() => setToolMode("anchor")}
          >
            Anchor Points
          </button>

          <button
            className={
              toolMode === "voice"
                ? "demo-tool-button tool-toggle-active"
                : "demo-tool-button secondary tool-toggle-inactive"
            }
            type="button"
            onClick={() => setToolMode("voice")}
          >
            Voice Highlight
          </button>

          <button
            className="demo-tool-button secondary"
            type="button"
            onClick={nextImage}
          >
            Next Image
          </button>

          <span className="demo-step-count">
            Image {imageIndex + 1} of {images.length}
          </span>
        </div>
      </div>

      <div className="demo-combined-tool-area">
        {toolMode === "ink" && (
          <FadingInkTool
            key={`ink-${imageIndex}`}
            imageSrc={image.src}
            imageAlt={`${image.name} fading ink workspace`}
            showTitle={false}
            showStatus={true}
            className="demo-combined-tool-instance"
          />
        )}

        {toolMode === "anchor" && (
          <AnchorPointTool
            key={`anchor-${imageIndex}`}
            imageSrc={image.src}
            imageAlt={`${image.name} anchor workspace`}
            showTitle={false}
            className="demo-combined-tool-instance"
          />
        )}

        {toolMode === "voice" && (
          <VoiceHighlightTool
            key={`voice-${imageIndex}`}
            imageSrc={image.src}
            imageAlt={`${image.name} voice highlight workspace`}
            showTitle={false}
            showBubbles={false}
            buttonText="Detect Voice"
            startingStatus={image.voiceQuestion}
            detectedText={image.voiceAnswer}
            highlightClassNames={image.voiceBoxes}
            className="demo-combined-tool-instance"
          />
        )}
      </div>
    </article>
  );
}