"use client";

import { useState } from "react";

type VoiceTarget = {
  name: string;
  label: string;
  prompt: string;
  top: string;
  left: string;
  width: string;
  height: string;
};

const voiceTargets: VoiceTarget[] = [
  {
    name: "folder",
    label: "Folder",
    prompt: "Highlight the folder",
    top: "18%",
    left: "12%",
    width: "22%",
    height: "18%",
  },
  {
    name: "button",
    label: "Button",
    prompt: "Highlight the button",
    top: "48%",
    left: "52%",
    width: "20%",
    height: "14%",
  },
  {
    name: "menu",
    label: "Menu",
    prompt: "Highlight the menu",
    top: "72%",
    left: "18%",
    width: "26%",
    height: "12%",
  },
];

export default function VoiceHighlightTool() {
  const [highlightedTarget, setHighlightedTarget] = useState("");
  const [status, setStatus] = useState(
    "No voice prompt selected yet. Have the user say a prompt, then click the matching mock button."
  );

  function mockVoiceCommand(target: VoiceTarget) {
    setHighlightedTarget(target.name);
    setStatus(`Mock voice command: "${target.prompt}"`);
  }

  function clearHighlight() {
    setHighlightedTarget("");
    setStatus("Highlight cleared.");
  }

  return (
    <article className="demo-tool-card card">
      <div className="demo-image-area demo-voice-area">
        <img src="/annotshare/scenario-3.jpg" alt="Voice highlight scenario" />

        {voiceTargets.map((target) => (
          <div
            key={target.name}
            className={
              highlightedTarget === target.name
                ? "demo-voice-box voice-on"
                : "demo-voice-box"
            }
            style={{
              top: target.top,
              left: target.left,
              width: target.width,
              height: target.height,
            }}
          >
            <span>{target.label}</span>
          </div>
        ))}
      </div>

      <div className="demo-tool-content">
        <span className="badge badge-gold">Tool 3</span>

        <h2>Voice Highlight</h2>

        <p className="text-muted">
          This section introduces voice highlight. For the prototype, the voice
          command is mocked with buttons so we can test the idea without needing
          real microphone support.
        </p>

        <div className="demo-tool-task">
          <strong>User study task:</strong>
          <p>
            Ask the user to say one of the prompts below. Then click the matching
            mock button to show what the voice highlight would do.
          </p>
        </div>

        <div className="demo-voice-prompts">
          {voiceTargets.map((target) => (
            <button
              key={target.name}
              className={
                highlightedTarget === target.name
                  ? "demo-small-tool-button selected"
                  : "demo-small-tool-button"
              }
              type="button"
              onClick={() => mockVoiceCommand(target)}
            >
              Say: “{target.prompt}”
            </button>
          ))}
        </div>

        <div className="demo-button-row">
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