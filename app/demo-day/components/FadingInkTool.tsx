"use client";

import { useEffect, useRef, useState } from "react";

type Point = {
  x: number;
  y: number;
};

type InkLine = {
  points: Point[];
  time: number;
};

export default function FadingInkTool() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const [inkOn, setInkOn] = useState(false);
  const [fadeTime, setFadeTime] = useState(4);
  const [status, setStatus] = useState("Fading ink is off.");

  // I am using refs here because I do not want the page to re-render
  // every single time the mouse moves.
  const savedLines = useRef<InkLine[]>([]);
  const currentLine = useRef<InkLine | null>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    // This loop keeps redrawing the canvas so older ink can fade.
    function animationLoop() {
      redrawCanvas();
      animationRef.current = requestAnimationFrame(animationLoop);
    }

    animationRef.current = requestAnimationFrame(animationLoop);

    return () => {
      window.removeEventListener("resize", resizeCanvas);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [fadeTime]);

  function resizeCanvas() {
    const canvas = canvasRef.current;

    if (!canvas || !canvas.parentElement) {
      return;
    }

    const box = canvas.parentElement.getBoundingClientRect();
    const scale = window.devicePixelRatio || 1;

    canvas.width = box.width * scale;
    canvas.height = box.height * scale;

    canvas.style.width = `${box.width}px`;
    canvas.style.height = `${box.height}px`;

    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
    }
  }

  function getMousePosition(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = event.currentTarget;
    const box = canvas.getBoundingClientRect();

    return {
      x: event.clientX - box.left,
      y: event.clientY - box.top,
    };
  }

  function startDrawing(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!inkOn) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);

    isDrawing.current = true;

    currentLine.current = {
      points: [getMousePosition(event)],
      time: Date.now(),
    };

    setStatus("Drawing... the ink should fade after a few seconds.");
  }

  function draw(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!inkOn || !isDrawing.current || !currentLine.current) {
      return;
    }

    currentLine.current.points.push(getMousePosition(event));
  }

  function stopDrawing() {
    if (!isDrawing.current || !currentLine.current) {
      return;
    }

    isDrawing.current = false;
    savedLines.current.push(currentLine.current);
    currentLine.current = null;

    setStatus("Ink added. It will fade away soon.");
  }

  function redrawCanvas() {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    const box = canvas.getBoundingClientRect();
    const now = Date.now();
    const fadeMilliseconds = fadeTime * 1000;

    ctx.clearRect(0, 0, box.width, box.height);

    // Remove lines after they have fully faded.
    savedLines.current = savedLines.current.filter((line) => {
      return now - line.time < fadeMilliseconds;
    });

    // Older lines get more transparent.
    savedLines.current.forEach((line) => {
      const age = now - line.time;
      const opacity = 1 - age / fadeMilliseconds;

      drawLine(ctx, line.points, opacity);
    });

    // This draws the current line while the user is still moving the mouse.
    if (currentLine.current) {
      drawLine(ctx, currentLine.current.points, 1);
    }
  }

  function drawLine(
    ctx: CanvasRenderingContext2D,
    points: Point[],
    opacity: number
  ) {
    if (points.length < 2) {
      return;
    }

    ctx.save();

    ctx.globalAlpha = opacity;
    ctx.strokeStyle = "#2f7d7b";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowColor = "#2f7d7b";
    ctx.shadowBlur = 8 * opacity;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    points.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });

    ctx.stroke();
    ctx.restore();
  }

  function toggleInk() {
    const nextValue = !inkOn;

    setInkOn(nextValue);

    if (nextValue) {
      setStatus("Fading ink is on. Draw on the image.");
    } else {
      isDrawing.current = false;
      currentLine.current = null;
      setStatus("Fading ink is off.");
    }
  }

  function clearInk() {
    savedLines.current = [];
    currentLine.current = null;
    isDrawing.current = false;
    setStatus("Ink cleared.");
  }

  return (
    <article className="demo-tool-card card">
      <div className="demo-image-area demo-drawing-area">
        <img src="/annotshare/scenario-1.jpg" alt="Fading ink tool scenario" />

        <canvas
          ref={canvasRef}
          className={inkOn ? "demo-ink-canvas active" : "demo-ink-canvas"}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
          onPointerLeave={stopDrawing}
        />
      </div>

      <div className="demo-tool-content">
        <span className="badge badge-gold">Tool 1</span>

        <h2>Fading Ink Tool</h2>

        <p className="text-muted">
          This first section introduces fading ink. Users can draw temporary
          marks on the screen, and the ink fades after a few seconds.
        </p>

        <div className="demo-tool-task">
          <strong>User study task:</strong>
          <p>
            Ask the user to draw or point out something on the screen using
            fading ink.
          </p>
        </div>

        <div className="demo-button-row">
          <button
            className="demo-tool-button"
            type="button"
            onClick={toggleInk}
          >
            {inkOn ? "Turn Fading Ink Off" : "Try Fading Ink"}
          </button>

          <button
            className="demo-tool-button secondary"
            type="button"
            onClick={clearInk}
          >
            Clear Ink
          </button>

          <label className="demo-slider-label">
            Fade:
            <input
              type="range"
              min="1"
              max="10"
              value={fadeTime}
              onChange={(event) => setFadeTime(Number(event.target.value))}
            />
            <span>{fadeTime}s</span>
          </label>
        </div>

        <p className="demo-tool-status">{status}</p>
      </div>
    </article>
  );
}