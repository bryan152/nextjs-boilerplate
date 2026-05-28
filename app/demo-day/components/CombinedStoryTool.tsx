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

type AnchorPin = {
  id: number;
  x: number;
  y: number;
};

const combinedImages = [
  {
    name: "Combined Scenario 1",
    src: "/annotshare/scenario-1.jpg",
  },
  {
    name: "Combined Scenario 2",
    src: "/annotshare/scenario-2.gif",
  },
];

export default function CombinedStoryTool() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const attemptStartRef = useRef<number | null>(null);

  const savedLines = useRef<InkLine[]>([]);
  const currentLine = useRef<InkLine | null>(null);
  const isDrawing = useRef(false);

  const [imageIndex, setImageIndex] = useState(0);
  const [inkOn, setInkOn] = useState(false);
  const [anchorOn, setAnchorOn] = useState(false);
  const [voiceHighlightOn, setVoiceHighlightOn] = useState(false);
  const [anchors, setAnchors] = useState<AnchorPin[]>([]);
  const [fadeTime, setFadeTime] = useState(30);
  const [timeLeft, setTimeLeft] = useState(30);
  const [attemptActive, setAttemptActive] = useState(false);
  const [status, setStatus] = useState("Choose a tool to use on the image.");

  const currentImage = combinedImages[imageIndex];

  useEffect(() => {
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    function animationLoop() {
      updateAttemptTimer();
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
  }, [fadeTime, attemptActive, timeLeft]);

  useEffect(() => {
    if (!attemptActive) {
      setTimeLeft(fadeTime);
    }
  }, [fadeTime, attemptActive]);

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

  function getPointerPosition(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = event.currentTarget;
    const box = canvas.getBoundingClientRect();

    return {
      x: event.clientX - box.left,
      y: event.clientY - box.top,
    };
  }

  function startNewInkAttempt() {
    savedLines.current = [];
    currentLine.current = null;
    isDrawing.current = false;

    attemptStartRef.current = Date.now();

    setAttemptActive(true);
    setTimeLeft(fadeTime);
    setStatus(`Timer started. You have ${formatTime(fadeTime)}.`);
  }

  function startDrawing(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!inkOn) {
      return;
    }

    startNewInkAttempt();

    event.currentTarget.setPointerCapture(event.pointerId);

    isDrawing.current = true;

    currentLine.current = {
      points: [getPointerPosition(event)],
      time: Date.now(),
    };
  }

  function draw(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!inkOn || !isDrawing.current || !currentLine.current) {
      return;
    }

    if (attemptStartRef.current === null) {
      return;
    }

    currentLine.current.points.push(getPointerPosition(event));
  }

  function stopDrawing() {
    if (!isDrawing.current || !currentLine.current) {
      return;
    }

    isDrawing.current = false;
    savedLines.current.push(currentLine.current);
    currentLine.current = null;

    setStatus("Ink added. Click and hold again to restart the timer.");
  }

  function updateAttemptTimer() {
    if (!attemptActive || attemptStartRef.current === null) {
      return;
    }

    const elapsedSeconds = (Date.now() - attemptStartRef.current) / 1000;
    const remainingSeconds = Math.max(0, fadeTime - elapsedSeconds);

    setTimeLeft(remainingSeconds);

    if (remainingSeconds <= 0) {
      attemptStartRef.current = null;
      isDrawing.current = false;
      currentLine.current = null;
      savedLines.current = [];

      setAttemptActive(false);
      setTimeLeft(0);
      setStatus("Time is up. Click and hold on the image to try again.");
    } else if (remainingSeconds <= 5) {
      setStatus("Almost out of time! The ink is flashing red.");
    }
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
    const shouldWarn = attemptActive && timeLeft <= 5;

    ctx.clearRect(0, 0, box.width, box.height);

    savedLines.current = savedLines.current.filter((line) => {
      return now - line.time < fadeMilliseconds;
    });

    savedLines.current.forEach((line) => {
      const age = now - line.time;
      const opacity = 1 - age / fadeMilliseconds;

      drawInkLine(ctx, line.points, opacity, shouldWarn);
    });

    if (currentLine.current) {
      drawInkLine(ctx, currentLine.current.points, 1, shouldWarn);
    }
  }

  function drawInkLine(
    ctx: CanvasRenderingContext2D,
    points: Point[],
    opacity: number,
    shouldWarn: boolean
  ) {
    if (points.length < 2) {
      return;
    }

    const flashOn = shouldWarn && Math.floor(Date.now() / 220) % 2 === 0;
    const mainColor = flashOn ? "#b42318" : "#1f3a5f";

    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // White outline so ink stays visible on different images.
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    points.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });

    ctx.strokeStyle = "rgba(255,255,255,0.95)";
    ctx.lineWidth = flashOn ? 11 : 9;
    ctx.shadowColor = "rgba(255,255,255,0.65)";
    ctx.shadowBlur = 5;
    ctx.stroke();

    // Main accessible marker stroke.
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    points.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });

    ctx.strokeStyle = mainColor;
    ctx.lineWidth = flashOn ? 6 : 5;
    ctx.shadowColor = mainColor;
    ctx.shadowBlur = flashOn ? 8 : 3;
    ctx.stroke();

    ctx.restore();
  }

  function placeAnchor(event: React.MouseEvent<HTMLDivElement>) {
    if (!anchorOn || inkOn) {
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

      setStatus(`Anchor placed. Anchors placed: ${updatedAnchors.length}.`);
      return updatedAnchors;
    });
  }

  function toggleInk() {
    const nextValue = !inkOn;

    setInkOn(nextValue);

    if (nextValue) {
      setAnchorOn(false);
      setStatus("Fading ink is on. Click and hold on the image to start.");
      setTimeLeft(fadeTime);
    } else {
      stopInkAttempt("Fading ink is off.");
    }
  }

  function toggleAnchor() {
    const nextValue = !anchorOn;

    setAnchorOn(nextValue);

    if (nextValue) {
      setInkOn(false);
      stopInkAttempt("Anchor points are on.");
    } else {
      setStatus("Anchor points are off.");
    }
  }

  function toggleVoiceHighlight() {
    const nextValue = !voiceHighlightOn;

    setVoiceHighlightOn(nextValue);
    setStatus(nextValue ? "Voice highlight shown." : "Voice highlight hidden.");
  }

  function clearInk() {
    savedLines.current = [];
    currentLine.current = null;
    isDrawing.current = false;
    attemptStartRef.current = null;

    setAttemptActive(false);
    setTimeLeft(fadeTime);
    setStatus("Ink cleared.");
  }

  function clearAnchors() {
    setAnchors([]);
    setStatus("Anchors cleared.");
  }

  function stopInkAttempt(nextStatus: string) {
    currentLine.current = null;
    isDrawing.current = false;
    attemptStartRef.current = null;

    setAttemptActive(false);
    setTimeLeft(fadeTime);
    setStatus(nextStatus);
  }

  function resetTools() {
    savedLines.current = [];
    currentLine.current = null;
    isDrawing.current = false;
    attemptStartRef.current = null;

    setInkOn(false);
    setAnchorOn(false);
    setVoiceHighlightOn(false);
    setAttemptActive(false);
    setTimeLeft(fadeTime);
    setAnchors([]);
    setStatus("Tools reset.");
  }

  function goToNextImage() {
    setImageIndex((currentIndex) =>
      currentIndex === combinedImages.length - 1 ? 0 : currentIndex + 1
    );

    resetTools();
    setStatus("Image changed. Choose a tool to use on the image.");
  }

  function formatTime(seconds: number) {
    if (seconds >= 60) {
      return "1 min";
    }

    return `${Math.ceil(seconds)}s`;
  }

  return (
    <article className="demo-tool-card card">
      <div
        className={
          anchorOn
            ? "demo-image-area demo-combined-workspace anchor-active"
            : "demo-image-area demo-combined-workspace"
        }
        onClick={placeAnchor}
      >
        <img
          src={currentImage.src}
          alt={`${currentImage.name} combined AnnotShare workspace`}
        />

        <canvas
          ref={canvasRef}
          className={
            inkOn
              ? "demo-combined-ink-canvas active"
              : "demo-combined-ink-canvas"
          }
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerCancel={stopDrawing}
          onPointerLeave={stopDrawing}
        />

        {anchors.map((anchor) => (
          <div
            key={anchor.id}
            className="demo-combined-anchor-pin"
            style={{
              left: `${anchor.x}%`,
              top: `${anchor.y}%`,
            }}
          >
            {anchor.id}
          </div>
        ))}

        <div
          className={
            voiceHighlightOn
              ? "demo-combined-voice-highlight active"
              : "demo-combined-voice-highlight"
          }
        />
      </div>

      <div className="demo-tool-content">
        <span className="badge badge-gold">Tool 4</span>

        <h2>Combined AnnotShare Tools</h2>

        <p className="text-muted">
          This panel is ready for the final team scenario images. Use the tools
          freely on the image.
        </p>

        <div className="demo-button-row">
          <button className="demo-tool-button" type="button" onClick={toggleInk}>
            {inkOn ? "Turn Ink Off" : "Fading Ink"}
          </button>

          <button
            className="demo-tool-button secondary"
            type="button"
            onClick={clearInk}
          >
            Clear Ink
          </button>

          <button
            className="demo-tool-button"
            type="button"
            onClick={toggleAnchor}
          >
            {anchorOn ? "Turn Anchors Off" : "Anchor Points"}
          </button>

          <button
            className="demo-tool-button secondary"
            type="button"
            onClick={clearAnchors}
          >
            Clear Anchors
          </button>

          <button
            className="demo-tool-button"
            type="button"
            onClick={toggleVoiceHighlight}
          >
            {voiceHighlightOn ? "Hide Voice Highlight" : "Voice Highlight"}
          </button>

          <button
            className="demo-tool-button secondary"
            type="button"
            onClick={goToNextImage}
          >
            Next Image
          </button>

          <button
            className="demo-tool-button secondary"
            type="button"
            onClick={resetTools}
          >
            Reset
          </button>

          <label className="demo-fade-control">
            <span>Time:</span>

            <input
              type="range"
              min="5"
              max="60"
              step="5"
              value={fadeTime}
              onChange={(event) => setFadeTime(Number(event.target.value))}
            />

            <span>{formatTime(fadeTime)}</span>
          </label>

          <span
            className={
              attemptActive && timeLeft <= 5
                ? "demo-step-count warning"
                : "demo-step-count"
            }
          >
            Timer: {formatTime(timeLeft)}
          </span>

          <span className="demo-step-count">
            Image {imageIndex + 1} of {combinedImages.length}
          </span>
        </div>

        <p className="demo-tool-status">{status}</p>
      </div>
    </article>
  );
}