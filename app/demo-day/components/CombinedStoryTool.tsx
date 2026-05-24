"use client";

import { useState } from "react";

const storyImages = ["/annotshare/scenario-4.jpg"];

// Later when my team sends the real story images, I can use this instead:
// const storyImages = [
//   "/annotshare/scenario-4-1.jpg",
//   "/annotshare/scenario-4-2.jpg",
//   "/annotshare/scenario-4-3.jpg",
// ];

const toolChoices = ["Fading ink", "Shared anchor", "Voice highlight"];

export default function CombinedStoryTool() {
  const [storyStep, setStoryStep] = useState(0);
  const [selectedTool, setSelectedTool] = useState("");
  const [notes, setNotes] = useState<string[]>([]);
  const [status, setStatus] = useState(
    "Use this final scenario to decide which tool would help during the story."
  );

  function goToNextImage() {
    setStoryStep((currentStep) =>
      currentStep === storyImages.length - 1 ? 0 : currentStep + 1
    );

    setSelectedTool("");
    setStatus("Moved to the next story image.");
  }

  function chooseTool(toolName: string) {
    setSelectedTool(toolName);

    const newNote = `For story image ${storyStep + 1}, user chose: ${toolName}.`;

    setNotes([...notes, newNote]);
    setStatus(newNote);
  }

  function clearStoryTest() {
    setSelectedTool("");
    setNotes([]);
    setStatus("Combined story test reset.");
  }

  return (
    <article className="demo-tool-card card">
      <div className="demo-image-area demo-combined-area">
        <img
          src={storyImages[storyStep]}
          alt={`Combined AnnotShare story step ${storyStep + 1}`}
        />

        {selectedTool && (
          <div className="demo-combined-choice">Selected: {selectedTool}</div>
        )}
      </div>

      <div className="demo-tool-content">
        <span className="badge badge-gold">Tool 4</span>

        <h2>Combined Tools User Story</h2>

        <p className="text-muted">
          This final section puts the tools together. The user moves through a
          short scenario and chooses when fading ink, anchor points, or voice
          highlight would help most.
        </p>

        <div className="demo-tool-task">
          <strong>User study task:</strong>
          <p>
            Ask the user to go through the scenario images and choose which
            AnnotShare tool they would use at each point.
          </p>
        </div>

        <div className="demo-button-row">
          <button
            className="demo-tool-button"
            type="button"
            onClick={goToNextImage}
          >
            Next Image
          </button>

          <span className="demo-step-count">
            Image {storyStep + 1} of {storyImages.length}
          </span>
        </div>

        <div className="demo-combined-tool-row">
          {toolChoices.map((toolName) => (
            <button
              key={toolName}
              className={
                selectedTool === toolName
                  ? "demo-small-tool-button selected"
                  : "demo-small-tool-button"
              }
              type="button"
              onClick={() => chooseTool(toolName)}
            >
              {toolName}
            </button>
          ))}
        </div>

        <p className="demo-tool-status">{status}</p>

        {notes.length > 0 && (
          <div className="demo-story-notes">
            <strong>Prototype notes:</strong>

            <ul>
              {notes.map((note, index) => (
                <li key={`${note}-${index}`}>{note}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          className="demo-tool-button secondary"
          type="button"
          onClick={clearStoryTest}
        >
          Reset Story Test
        </button>
      </div>
    </article>
  );
}