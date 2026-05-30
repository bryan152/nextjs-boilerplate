"use client";

import { useState } from "react";

type VoiceHighlightToolProps = {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  buttonText?: string;
  startingStatus?: string;
  detectedText?: string;
  firstBubbleText?: string;
  showTitle?: boolean;
  showBubbles?: boolean;
  highlightClassName?: string;
  highlightClassNames?: string[];
  className?: string;
};

const defaultImage = {
  src: "/annotshare/voiceAmazon.png",
  alt: "Shopping page used for voice highlight demo",
};

export default function VoiceHighlightTool({
  imageSrc = defaultImage.src,
  imageAlt = defaultImage.alt,
  title = "Voice Highlight",
  buttonText = "Detect Voice Direction",
  startingStatus = "Voice highlight is off.",
  detectedText = "No, the eagle.",
  firstBubbleText = "This one?",
  showTitle = true,
  showBubbles = true,
  highlightClassName = "",
  highlightClassNames,
  className = "",
}: VoiceHighlightToolProps) {
  const [voiceOn, setVoiceOn] = useState(false);
  const [status, setStatus] = useState(startingStatus);

  // This lets panel 3 use one box, but panel 4 can use 2 or 3 boxes.
  const highlightBoxes =
    highlightClassNames && highlightClassNames.length > 0
      ? highlightClassNames
      : [highlightClassName];

  function toggleVoice() {
    const nextValue = !voiceOn;

    setVoiceOn(nextValue);
    setStatus(nextValue ? `Voice detected: "${detectedText}"` : startingStatus);
  }

  return (
    <article className={`demo-tool-card card ${className}`}>
      <div className="demo-tool-content demo-tool-content-top">
        {showTitle && <h2>{title}</h2>}

        <div className="demo-button-row">
          <button
            className={
              voiceOn
                ? "demo-tool-button tool-toggle-active"
                : "demo-tool-button secondary tool-toggle-inactive"
            }
            type="button"
            onClick={toggleVoice}
            aria-pressed={voiceOn}
          >
            {voiceOn ? "Voice Highlight On" : buttonText}
          </button>
        </div>

        <p className="demo-tool-status">{status}</p>
      </div>

      <div className="demo-image-area demo-voice-area">
        <img src={imageSrc} alt={imageAlt} />

        {showBubbles && (
          <div className="demo-chat-bubble demo-chat-bubble-question">
            <span className="demo-chat-label">Friend</span>
            “{firstBubbleText}”
          </div>
        )}

        {showBubbles && voiceOn && (
          <div className="demo-chat-bubble demo-chat-bubble-detected">
            <span className="demo-chat-label">Voice direction detected</span>
            “{detectedText}”
          </div>
        )}

        {highlightBoxes.map((boxClass) => (
          <div
            key={boxClass || "default-highlight"}
            className={
              voiceOn
                ? `demo-voice-highlight-box ${boxClass} active`
                : `demo-voice-highlight-box ${boxClass}`
            }
          />
        ))}
      </div>
    </article>
  );
}