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

type FadingInkToolProps = {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  defaultFadeTime?: number;
  showTitle?: boolean;
  showStatus?: boolean;
  className?: string;
};

const defaultImage = {
  src: "/annotshare/easyMaze.svg",
  alt: "Easy maze for fading ink tool",
};

export default function FadingInkTool({
  imageSrc = defaultImage.src,
  imageAlt = defaultImage.alt,
  title = "Amaze-ing disappearing ink tool",
  defaultFadeTime = 10,
  showTitle = true,
  showStatus = true,
  className = "",
}: FadingInkToolProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const timerStartRef = useRef<number | null>(null);

  const savedLines = useRef<InkLine[]>([]);
  const currentLine = useRef<InkLine | null>(null);
  const isDrawing = useRef(false);

  const [inkOn, setInkOn] = useState(false);
  const [fadeTime, setFadeTime] = useState(defaultFadeTime);
  const [timeLeft, setTimeLeft] = useState(defaultFadeTime);
  const [timerRunning, setTimerRunning] = useState(false);
  const [status, setStatus] = useState("Fading ink is off.");

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

  function getPoint(event: React.PointerEvent<HTMLCanvasElement>) {
    const box = event.currentTarget.getBoundingClientRect();

    return {
      x: event.clientX - box.left,
      y: event.clientY - box.top,
    };
  }

  function startTimerIfNeeded(now: number) {
    if (timerStartRef.current !== null) {
      return;
    }

    timerStartRef.current = now;

    setTimerRunning(true);
    setTimeLeft(fadeTime);
    setStatus("Timer started. Keep drawing until the ink fades.");
  }

  function startDrawing(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!inkOn) {
      return;
    }

    startTimerIfNeeded(event.timeStamp);

    event.currentTarget.setPointerCapture(event.pointerId);

    isDrawing.current = true;

    currentLine.current = {
      points: [getPoint(event)],
      time: event.timeStamp,
    };
  }

  function draw(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!inkOn || !isDrawing.current || !currentLine.current) {
      return;
    }

    currentLine.current.points.push(getPoint(event));
  }

  function stopDrawing() {
    if (!isDrawing.current || !currentLine.current) {
      return;
    }

    isDrawing.current = false;
    savedLines.current.push(currentLine.current);
    currentLine.current = null;

    if (timerRunning) {
      setStatus("Ink added. The same timer is still running.");
    }
  }

  function clearDrawingData() {
    savedLines.current = [];
    currentLine.current = null;
    isDrawing.current = false;
    timerStartRef.current = null;
  }

  function clearInk() {
    clearDrawingData();

    setTimerRunning(false);
    setTimeLeft(fadeTime);
    setStatus("Ink cleared. Click the image to start again.");
  }

  function resetTool(nextStatus: string) {
    clearDrawingData();

    setTimerRunning(false);
    setTimeLeft(fadeTime);
    setStatus(nextStatus);
  }

  function updateTimer(now: number) {
    if (!timerRunning || timerStartRef.current === null) {
      return;
    }

    const elapsedSeconds = (now - timerStartRef.current) / 1000;
    const secondsLeft = Math.max(0, fadeTime - elapsedSeconds);

    setTimeLeft(secondsLeft);

    if (secondsLeft <= 0) {
      clearDrawingData();

      setTimerRunning(false);
      setTimeLeft(fadeTime);
      setStatus("Ink faded away. Click the image to start again.");
    } else if (secondsLeft <= 5) {
      setStatus("Ink is almost faded.");
    }
  }

  function drawLine(
    ctx: CanvasRenderingContext2D,
    points: Point[],
    opacity: number,
    almostFaded: boolean
  ) {
    if (points.length < 2) {
      return;
    }

    const inkColor = almostFaded ? "#8a5a00" : "#1f3a5f";

    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    points.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });

    ctx.strokeStyle = "rgba(255,255,255,0.95)";
    ctx.lineWidth = 9;
    ctx.shadowColor = "rgba(255,255,255,0.55)";
    ctx.shadowBlur = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    points.forEach((point) => {
      ctx.lineTo(point.x, point.y);
    });

    ctx.strokeStyle = inkColor;
    ctx.lineWidth = 5;
    ctx.shadowColor = inkColor;
    ctx.shadowBlur = almostFaded ? 5 : 2;
    ctx.stroke();

    ctx.restore();
  }

  function redrawCanvas(now: number) {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    const box = canvas.getBoundingClientRect();
    const fadeMs = fadeTime * 1000;
    const almostFaded = timerRunning && timeLeft <= 5;

    ctx.clearRect(0, 0, box.width, box.height);

    savedLines.current = savedLines.current.filter((line) => {
      return now - line.time < fadeMs;
    });

    savedLines.current.forEach((line) => {
      const age = now - line.time;
      const opacity = 1 - age / fadeMs;

      drawLine(ctx, line.points, opacity, almostFaded);
    });

    if (currentLine.current) {
      drawLine(ctx, currentLine.current.points, 1, almostFaded);
    }
  }

  function toggleInk() {
    const nextValue = !inkOn;

    setInkOn(nextValue);

    if (nextValue) {
      setStatus("Fading ink is on. Click the image to start the timer.");
      setTimeLeft(fadeTime);
    } else {
      resetTool("Fading ink is off.");
    }
  }

  function updateFadeTime(nextFadeTime: number) {
    setFadeTime(nextFadeTime);

    if (!timerRunning) {
      setTimeLeft(nextFadeTime);
    }
  }

  function formatTime(seconds: number) {
    if (seconds >= 60) {
      return "1 min";
    }

    return `${Math.ceil(seconds)}s`;
  }

  useEffect(() => {
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    function animationLoop(now: number) {
      updateTimer(now);
      redrawCanvas(now);

      animationRef.current = requestAnimationFrame(animationLoop);
    }

    animationRef.current = requestAnimationFrame(animationLoop);

    return () => {
      window.removeEventListener("resize", resizeCanvas);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    // This keeps the prototype simple and stops the animation loop from fighting ESLint.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fadeTime, timerRunning, timeLeft]);

  useEffect(() => {
    if (!timerRunning) {
      setTimeLeft(fadeTime);
    }
  }, [fadeTime, timerRunning]);

  return (
    <article className={`demo-tool-card card ${className}`}>
      <div className="demo-tool-content demo-tool-content-top">
        <div className="demo-tool-header">
          <span
            className={
              timerRunning && timeLeft <= 5
                ? "badge demo-timer-badge gentle-warning"
                : "badge demo-timer-badge"
            }
          >
            Ink fades away in: {formatTime(timeLeft)}
          </span>
        </div>

        {showTitle && <h2>{title}</h2>}

        <div className="demo-button-row">
          <button
            className={
              inkOn
                ? "demo-tool-button tool-toggle-active"
                : "demo-tool-button secondary tool-toggle-inactive"
            }
            type="button"
            onClick={toggleInk}
            aria-pressed={inkOn}
          >
            {inkOn ? "Fading Ink On" : "Turn Fading Ink On"}
          </button>

          <button
            className="demo-tool-button secondary"
            type="button"
            onClick={clearInk}
          >
            Clear Ink
          </button>

          <label className="demo-fade-control">
            <span>Fade time:</span>

            <input
              type="range"
              min="5"
              max="60"
              step="5"
              value={fadeTime}
              onChange={(event) => updateFadeTime(Number(event.target.value))}
            />

            <span>{formatTime(fadeTime)}</span>
          </label>
        </div>

        {showStatus && <p className="demo-tool-status">{status}</p>}
      </div>

      <div className="demo-image-area demo-drawing-area">
        <img className="demo-maze-image" src={imageSrc} alt={imageAlt} />

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
    </article>
  );
}