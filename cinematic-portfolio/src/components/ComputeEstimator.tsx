"use client";

import { useState } from "react";

const modelSizes = [3, 8, 14, 32, 70];
const precisions = [4, 8, 16];

export default function ComputeEstimator() {
  const [parameters, setParameters] = useState(8);
  const [bits, setBits] = useState(4);
  const weights = parameters * bits / 8;
  const maxWeights = modelSizes[modelSizes.length - 1] * precisions[precisions.length - 1] / 8;

  return (
    <aside className="compute-panel" aria-labelledby="compute-heading">
      <h3 id="compute-heading">How much memory do the weights need?</h3>
      <p>Change model size or precision to see what happens before a single request is served.</p>
      <div className="compute-controls">
        <label>
          Model size
          <select value={parameters} onChange={(event) => setParameters(Number(event.target.value))}>
            {modelSizes.map((size) => <option key={size} value={size}>{size}B parameters</option>)}
          </select>
        </label>
        <label>
          Precision
          <select value={bits} onChange={(event) => setBits(Number(event.target.value))}>
            {precisions.map((precision) => <option key={precision} value={precision}>{precision}-bit</option>)}
          </select>
        </label>
      </div>
      <div className="compute-estimate">
        <output>{weights.toLocaleString("en-SG")} GB for weights</output>
        <div className="compute-meter" aria-hidden="true">
          <span style={{ width: (weights / maxWeights * 100) + "%" }} />
        </div>
        <p>{parameters} billion parameters × {bits} bits per weight ÷ 8 bits per byte, expressed in decimal GB.</p>
      </div>
      <p>Rough estimate. Allow extra memory for quantization metadata, runtime buffers and the KV cache, which grows with context length and concurrent requests.</p>
      <div className="compute-sources">
        <a href="https://docs.vllm.ai/en/stable/configuration/conserving_memory/">vLLM guide to serving memory</a>
      </div>
    </aside>
  );
}
