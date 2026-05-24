"use client";

import { useState } from "react";

type Pin = {
  id: number;
  x: number;
  y: number;
};

export default function AnchorPointTool() {
  const [anchorOn, setAnchorOn] = useState(false);
  const [pins, setPins] = useState<Pin[]>([]);
  const [status, setStatus] = useState("Anchor tool is off.");

  function toggleAnchor() {
    const nextValue = !anchorOn;

    setAnchorOn(nextValue);

    if (nextValue) {
      setStatus("Anchor tool is on. Click the image to place a pin.");
    } else {
      setStatus("Anchor tool is off.");
    }
  }

  function addPin(event: React.PointerEvent<HTMLDivElement>) {
    if (!anchorOn) {
      return;
    }

    // This gets the image area location so the pin goes where I clicked,
    // not just where it is on the whole browser window.
    const box = event.currentTarget.getBoundingClientRect();

    const newPin = {
      id: pins.length + 1,
      x: event.clientX - box.left,
      y: event.clientY - box.top,
    };

    setPins([...pins, newPin]);
    setStatus(`Anchor ${newPin.id} placed.`);
  }

  function clearPins() {
    setPins([]);
    setStatus("Anchors cleared.");
  }

  return (
    <article className="demo-tool-card card">
      <div
        className={
          anchorOn
            ? "demo-image-area demo-anchor-area anchor-active"
            : "demo-image-area demo-anchor-area"
        }
        onPointerDown={addPin}
      >
        <img
          src="/annotshare/scenario-2.gif"
          alt="Shared anchor point scenario"
        />

        {pins.map((pin) => (
          <div
            className="demo-anchor-pin"
            key={pin.id}
            style={{
              left: pin.x,
              top: pin.y,
            }}
          >
            {pin.id}
          </div>
        ))}
      </div>

      <div className="demo-tool-content">
        <span className="badge badge-gold">Tool 2</span>

        <h2>Shared Anchor Point</h2>

        <p className="text-muted">
          This section introduces shared anchor points. Users can place numbered
          pins on the screen so both people know what part is being discussed.
        </p>

        <div className="demo-tool-task">
          <strong>User study task:</strong>
          <p>
            Ask the user to place an anchor point where the helper should look
            next.
          </p>
        </div>

        <div className="demo-button-row">
          <button
            className="demo-tool-button"
            type="button"
            onClick={toggleAnchor}
          >
            {anchorOn ? "Turn Anchor Tool Off" : "Try Anchor Tool"}
          </button>

          <button
            className="demo-tool-button secondary"
            type="button"
            onClick={clearPins}
          >
            Clear Anchors
          </button>
        </div>

        <p className="demo-tool-status">
          {status} Anchors placed: {pins.length}
        </p>
      </div>
    </article>
  );
}