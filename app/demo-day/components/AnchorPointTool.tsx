"use client";

import { useState } from "react";

type AnchorPin = {
  id: number;
  x: number;
  y: number;
};

const anchorScenes = [
  {
    name: "Easy Farm Scene",
    difficulty: "Easy",
    src: "/annotshare/easyAnchor.png",
    task: "Place an anchor on every green tractor you can find. Count them as you go.",
  },
  {
    name: "Medium Summer Scene",
    difficulty: "Medium",
    src: "/annotshare/mediumAnchor.png",
    task: "Place an anchor on every beach ball you can find. This one is trickier.",
  },
];

export default function AnchorPointTool() {
  const [anchorModeOn, setAnchorModeOn] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [anchors, setAnchors] = useState<AnchorPin[]>([]);
  const [status, setStatus] = useState("Anchor tool is off. Anchors placed: 0");

  const currentScene = anchorScenes[sceneIndex];

  function toggleAnchorMode() {
    const nextValue = !anchorModeOn;
    setAnchorModeOn(nextValue);

    if (nextValue) {
      setStatus(
        `Anchor tool is on. Click the image to place anchors. Anchors placed: ${anchors.length}`
      );
    } else {
      setStatus(`Anchor tool is off. Anchors placed: ${anchors.length}`);
    }
  }

  function clearAnchors() {
    setAnchors([]);
    setStatus("Anchors cleared. Anchors placed: 0");
  }

  function goToNextScene() {
    setSceneIndex((currentIndex) =>
      currentIndex === anchorScenes.length - 1 ? 0 : currentIndex + 1
    );

    setAnchors([]);
    setStatus("Scene changed. Anchors placed: 0");
  }

  function placeAnchor(event: React.MouseEvent<HTMLDivElement>) {
    if (!anchorModeOn) {
      return;
    }

    const box = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - box.left) / box.width) * 100;
    const y = ((event.clientY - box.top) / box.height) * 100;

    setAnchors((previousAnchors) => {
      const updatedAnchors = [
        ...previousAnchors,
        {
          id: previousAnchors.length + 1,
          x,
          y,
        },
      ];

      setStatus(`Anchor placed. Anchors placed: ${updatedAnchors.length}`);
      return updatedAnchors;
    });
  }

  return (
    <article className="demo-tool-card card">
      <div
        className={
          anchorModeOn
            ? "demo-image-area demo-anchor-area anchor-active"
            : "demo-image-area demo-anchor-area"
        }
        onClick={placeAnchor}
      >
        <img
          src={currentScene.src}
          alt={`${currentScene.name} for shared anchor point practice`}
        />

        {anchors.map((anchor) => (
          <div
            key={anchor.id}
            className="demo-anchor-pin"
            style={{
              left: `${anchor.x}%`,
              top: `${anchor.y}%`,
            }}
          >
            {anchor.id}
          </div>
        ))}
      </div>

      <div className="demo-tool-content">

        <h2>Shared Anchor Point</h2>

        <p className="text-muted">
          This tool lets users place numbered anchor points on the image so both
          people know exactly what part is being tracked.
        </p>
<div className="demo-button-row">
          <button
            className="demo-tool-button"
            type="button"
            onClick={toggleAnchorMode}
          >
            {anchorModeOn ? "Turn Anchor Tool Off" : "Try Anchor Tool"}
          </button>

          <button
            className="demo-tool-button secondary"
            type="button"
            onClick={clearAnchors}
          >
            Clear Anchors
          </button>

          <button
            className="demo-tool-button secondary"
            type="button"
            onClick={goToNextScene}
          >
            Next Scene
          </button>

          <span className="demo-step-count">
            {currentScene.difficulty} · Scene {sceneIndex + 1} of{" "}
            {anchorScenes.length}
          </span>
        </div>

        <p className="demo-tool-status">{status}</p>
      </div>
    </article>
  );
}