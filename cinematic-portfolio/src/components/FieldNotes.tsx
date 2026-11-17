import ComputeEstimator from "./ComputeEstimator";

export default function FieldNotes() {
  return (
    <section id="field-notes" aria-labelledby="notes-heading" className="notes-section">
      <div className="mx-auto max-w-7xl">
        <header className="notes-intro">
          <h2 id="notes-heading">Before we buy more compute.</h2>
          <p>What my six-month SNAIC programme got me thinking about as someone who came from finance.</p>
        </header>
        <div className="notes-layout">
          <article className="notes-body" aria-labelledby="notes-heading">
            <p>My seniors in finance told me they used to do accounting with pen and paper. Excel changed the way teams worked because it solved practical problems. When a company says it needs AI, I come back to the same question. Which part of the job are we trying to improve?</p>

            <h3>Some tools only need AI at build time</h3>
            <p>I taught myself VBA to cut down recurring finance work. Today, a coding agent can help me write a Python script to consolidate month-end files, build a reconciliation check, or put together a reporting dashboard. Once the rules are tested and documented, the team can run that tool again and trace how the output was produced. A script like this can run without calling a model.</p>

            <h3>Every model call has to run somewhere</h3>
            <p>When a live assistant runs a model, that work uses compute whether the company owns the hardware or pays for an API. Larger models often need more memory for their weights. Longer documents and more people asking questions at once can add pressure even when the model stays the same. Storing weights at lower precision can reduce memory use, and a smaller model may be enough for a well-defined task. I would measure answer quality, latency and cost on real examples before choosing a model or buying capacity.</p>

            <h3>Decide where the workbook can go</h3>
            <p>A workbook uploaded to explain a variance might include payroll, supplier rates or unreleased results. Before anyone uploads it, the company needs to know which accounts are approved, who can access it, how long it is retained and whether it can be used for training.</p>
            <p>During SNAIC I worked on a retrieval-augmented assistant that cites relevant passages and flags weak evidence. An internal policy assistant could answer from approved documents without browsing the web. Keeping the data in a company-controlled environment depends on where retrieval and inference run, and how access, logs and retention are configured.</p>

            <h3>Make verification part of the work</h3>
            <p>For generated code, I give the agent the business rules, file formats and edge cases. Then I test what happens when a file is missing, an invoice appears twice, or a total ties out for the wrong reason. A finance team should be able to understand, rerun and maintain the tool.</p>
            <p>I’m grateful to NVIDIA, the Singapore Institute of Technology and the people I learned and built with. I’d like to connect with teams applying that same discipline to finance transformation, automation and AI.</p>
          </article>
          <ComputeEstimator />
        </div>
      </div>
    </section>
  );
}
