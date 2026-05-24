import FadingInkTool from "./components/FadingInkTool";
import AnchorPointTool from "./components/AnchorPointTool";
import VoiceHighlightTool from "./components/VoiceHighlightTool";
import CombinedStoryTool from "./components/CombinedStoryTool";

export default function DemoDay() {
  return (
    <main className="demo-day-page">
      <section className="demo-day-hero">
        <span className="badge badge-teal">CSS 480 Prototype v1.1</span>

        <h1>AnnotShare Demo Day</h1>

        <p>
          This page introduces each AnnotShare tool first, then gives users a
          combined scenario where they can decide when each tool would help.
        </p>
      </section>

      <section className="demo-tool-list" aria-label="AnnotShare demo tools">
        <FadingInkTool />

        <AnchorPointTool />

        <VoiceHighlightTool />

        <CombinedStoryTool />
      </section>

      <section className="demo-feedback-section card">
        <h2>Feedback Survey</h2>

        <p className="text-muted">
          After trying the prototype, users will complete a short feedback
          survey about what felt useful, confusing, or easy to understand.
        </p>

        <a className="demo-survey-link" href="#" aria-disabled="true">
          Link for survey here
        </a>
      </section>
    </main>
  );
}