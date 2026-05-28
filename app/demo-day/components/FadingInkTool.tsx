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

const mazeImages = [
  {
    name: "Easy Maze",
    difficulty: "Easy",
    src: "/annotshare/easyMaze.svg",
    task: "Start with the easy maze. Set a fade time, then click and hold to start your timed maze attempt.",
  },
  {
    name: "Medium Maze",
    difficulty: "Medium",
    src: "/annotshare/mediumMaze.svg",
    task: "Now try the medium maze. Try changing the timer to see if shorter or longer fading ink helps more.",
  },
  {
    name: "Hard Maze",
    difficulty: "Hard",
    src: "/annotshare/hardMaze.svg",
    task: "Try the hard maze last. This one tests whether fading ink still helps when the task gets harder.",
  },
];

export default function FadingInkTool() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const attemptStartRef = useRef<number | null>(null);

  const [inkOn, setInkOn] = useState(false);
  const [fadeTime, setFadeTime] = useState(30);
  const [mazeIndex, setMazeIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [attemptActive, setAttemptActive] = useState(false);
  const [status, setStatus] = useState("Fading ink is off.");

  const currentMaze = mazeImages[mazeIndex];

  const savedLines = useRef<InkLine[]>([]);
  const currentLine = useRef<InkLine | null>(null);
  const isDrawing = useRef(false);

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

  function getMousePosition(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = event.currentTarget;
    const box = canvas.getBoundingClientRect();

    return {
      x: event.clientX - box.left,
      y: event.clientY - box.top,
    };
  }

  function startNewAttempt() {
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

    startNewAttempt();

    event.currentTarget.setPointerCapture(event.pointerId);

    isDrawing.current = true;

    currentLine.current = {
      points: [getMousePosition(event)],
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

    currentLine.current.points.push(getMousePosition(event));
  }

  function stopDrawing() {
    if (!isDrawing.current || !currentLine.current) {
      return;
    }

    isDrawing.current = false;
    savedLines.current.push(currentLine.current);
    currentLine.current = null;

    setStatus(
      "Attempt still running. Click and hold again to restart with a fresh timer."
    );
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
      setStatus("Time is up. Click and hold on the maze to try again.");
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

      drawLine(ctx, line.points, opacity, shouldWarn);
    });

    if (currentLine.current) {
      drawLine(ctx, currentLine.current.points, 1, shouldWarn);
    }
  }

  function drawLine(
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

    // White under-stroke keeps the ink visible on different backgrounds.
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

  function toggleInk() {
    const nextValue = !inkOn;

    setInkOn(nextValue);

    if (nextValue) {
      setStatus("Fading ink is on. Click and hold on the maze to start.");
      setTimeLeft(fadeTime);
    } else {
      resetAttempt("Fading ink is off.");
    }
  }

  function clearInk() {
    savedLines.current = [];
    currentLine.current = null;
    isDrawing.current = false;
    attemptStartRef.current = null;

    setAttemptActive(false);
    setTimeLeft(fadeTime);
    setStatus("Ink cleared. Click and hold on the maze to start again.");
  }

  function resetAttempt(nextStatus: string) {
    savedLines.current = [];
    currentLine.current = null;
    isDrawing.current = false;
    attemptStartRef.current = null;

    setAttemptActive(false);
    setTimeLeft(fadeTime);
    setStatus(nextStatus);
  }

  function goToNextMaze() {
    setMazeIndex((currentIndex) =>
      currentIndex === mazeImages.length - 1 ? 0 : currentIndex + 1
    );

    resetAttempt("Moved to the next maze. Click and hold to start the timer.");
  }

  function formatTime(seconds: number) {
    if (seconds >= 60) {
      return "1 min";
    }

    return `${Math.ceil(seconds)}s`;
  }

  return (
    <article className="demo-tool-card card">
      <div className="demo-image-area demo-drawing-area">
        <img
          className="demo-maze-image"
          src={currentMaze.src}
          alt={`${currentMaze.name} fading ink maze`}
        />

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
        <div className="demo-tool-header">
          <span
            className={
              attemptActive && timeLeft <= 5
                ? "badge demo-timer-badge warning"
                : "badge demo-timer-badge"
            }
          >
            Timer: {formatTime(timeLeft)}
          </span>
        </div>

        <h2>Amaze-ing disappearing ink tool</h2>

        <p className="text-muted">
          This tool lets users draw temporary ink while solving a maze. The ink
          fades after the selected time, so users can test if fading ink helps
          them move faster without leaving permanent marks on the screen.
        </p>
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

          <button
            className="demo-tool-button secondary"
            type="button"
            onClick={goToNextMaze}
          >
            Next Maze
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

          <span className="demo-step-count">
            {currentMaze.difficulty} · Maze {mazeIndex + 1} of{" "}
            {mazeImages.length}
          </span>
        </div>

        <p className="demo-tool-status">{status}</p>
      </div>
    </article>
  );
}