"use client";

import { useState } from "react";

export default function VoiceHighlightTool() {
  const [highlightOn, setHighlightOn] = useState(false);
  const [status, setStatus] = useState(
    "Voice highlight is off. Click the button to simulate the voice command."
  );

  function runVoiceHighlight() {
    setHighlightOn(true);
    setStatus('Voice command detected: "No, not that one, the eagle."');
  }

  function clearHighlight() {
    setHighlightOn(false);
    setStatus("Highlight cleared.");
  }

  return (
    <article className="demo-tool-card card">
      <div className="demo-image-area demo-voice-area">
        <img
          src="/annotshare/voiceAmazon.png"
          alt="Shopping page used for voice highlight demo"
        />

        <div className="demo-voice-command-bubble">
          “No, not that one, the eagle.”
        </div>

        <div
          className={
            highlightOn
              ? "demo-voice-highlight-box active"
              : "demo-voice-highlight-box"
          }
        />
      </div>

      <div className="demo-tool-content">

        <h2>Voice Highlight</h2>

        <p className="text-muted">
          This tool shows the idea of a voice-activated highlighter. Instead of
          manually drawing or placing an anchor, the system listens for a spoken
          cue and highlights the intended item automatically.
        </p>
<div className="demo-button-row">
          <button
            className="demo-tool-button"
            type="button"
            onClick={runVoiceHighlight}
          >
            Simulate Voice Highlight
          </button>

          <button
            className="demo-tool-button secondary"
            type="button"
            onClick={clearHighlight}
          >
            Clear Highlight
          </button>
        </div>

        <p className="demo-tool-status">{status}</p>
      </div>
    </article>
  );
}