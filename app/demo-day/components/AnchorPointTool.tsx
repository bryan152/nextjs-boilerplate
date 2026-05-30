"use client";

import { useState } from "react";

type AnchorPin = {
  id: number;
  x: number;
  y: number;
  color: string;
};

type AnchorPointToolProps = {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  showTitle?: boolean;
  className?: string;
};

const defaultImage = {
  src: "/annotshare/easyAnchor.png",
  alt: "Farm image for shared anchor point tool",
};

const pinColors = [
  {
    name: "Red",
    solid: "#b42318",
    transparent: "rgba(180, 35, 24, 0.62)",
  },
  {
    name: "Green",
    solid: "#207a3c",
    transparent: "rgba(32, 122, 60, 0.62)",
  },
  {
    name: "Blue",
    solid: "#1f3a5f",
    transparent: "rgba(31, 58, 95, 0.62)",
  },
];

export default function AnchorPointTool({
  imageSrc = defaultImage.src,
  imageAlt = defaultImage.alt,
  title = "Shared Anchor Point",
  showTitle = true,
  className = "",
}: AnchorPointToolProps) {
  const [anchorOn, setAnchorOn] = useState(false);
  const [anchors, setAnchors] = useState<AnchorPin[]>([]);
  const [colorIndex, setColorIndex] = useState(2);
  const [status, setStatus] = useState("Anchor tool is off.");

  const currentColor = pinColors[colorIndex];
  const count = anchors.length;

  function toggleAnchorTool() {
    const nextValue = !anchorOn;

    setAnchorOn(nextValue);

    if (nextValue) {
      setStatus("Anchor tool is on. Click the image to place anchors.");
    } else {
      setStatus("Anchor tool is off.");
    }
  }

  function placeAnchor(event: React.MouseEvent<HTMLDivElement>) {
    if (!anchorOn) {
      return;
    }

    const box = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - box.left) / box.width) * 100;
    const y = ((event.clientY - box.top) / box.height) * 100;

    setAnchors((oldAnchors) => {
      const newAnchors = [
        ...oldAnchors,
        {
          id: oldAnchors.length + 1,
          x,
          y,
          color: currentColor.transparent,
        },
      ];

      setStatus(`Anchor placed. Count: ${newAnchors.length}.`);
      return newAnchors;
    });
  }

  function removeLastAnchor() {
    setAnchors((oldAnchors) => {
      if (oldAnchors.length === 0) {
        setStatus("No anchors to remove.");
        return oldAnchors;
      }

      const newAnchors = oldAnchors.slice(0, -1);
      setStatus(`Last anchor removed. Count: ${newAnchors.length}.`);
      return newAnchors;
    });
  }

  function clearAnchors() {
    setAnchors([]);
    setStatus("Anchors cleared.");
  }

  function updatePinColor(nextIndex: number) {
    setColorIndex(nextIndex);
    setStatus(`Anchor color changed to ${pinColors[nextIndex].name}.`);
  }

  return (
    <article className={`demo-tool-card card ${className}`}>
      <div className="demo-tool-content demo-tool-content-top">
        <div className="demo-tool-header">
          <span
            className="badge demo-timer-badge"
            style={{
              background: currentColor.solid,
              borderColor: currentColor.solid,
            }}
          >
            Count: {count}
          </span>
        </div>

        {showTitle && <h2>{title}</h2>}

        <div className="demo-button-row">
          <button
            className={
              anchorOn
                ? "demo-tool-button tool-toggle-active"
                : "demo-tool-button secondary tool-toggle-inactive"
            }
            type="button"
            onClick={toggleAnchorTool}
            aria-pressed={anchorOn}
          >
            {anchorOn ? "Anchor Tool On" : "Turn Anchor Tool On"}
          </button>

          <button
            className="demo-tool-button secondary"
            type="button"
            onClick={removeLastAnchor}
            aria-label="Remove last anchor"
          >
            − Remove Last
          </button>

          <button
            className="demo-tool-button secondary"
            type="button"
            onClick={clearAnchors}
          >
            Clear Anchors
          </button>

          <label className="demo-fade-control">
            <span>Pin color:</span>

            <input
              type="range"
              min="0"
              max={pinColors.length - 1}
              step="1"
              value={colorIndex}
              onChange={(event) => updatePinColor(Number(event.target.value))}
            />

            <span>{currentColor.name}</span>
          </label>
        </div>

        <p className="demo-tool-status">{status}</p>
      </div>

      <div
        className={
          anchorOn
            ? "demo-image-area demo-anchor-area anchor-active"
            : "demo-image-area demo-anchor-area"
        }
        onClick={placeAnchor}
      >
        <img src={imageSrc} alt={imageAlt} />

        {anchors.map((anchor) => (
          <div
            key={anchor.id}
            className="demo-anchor-pin"
            style={{
              left: `${anchor.x}%`,
              top: `${anchor.y}%`,
              background: anchor.color,
            }}
          >
            {anchor.id}
          </div>
        ))}
      </div>
    </article>
  );
}