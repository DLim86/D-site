"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { pillars } from "@/lib/content";
import InterfaceCard from "./InterfaceCard";

export default function FeatureStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = pillars.length - 1;
    let next: number;
    switch (event.key) {
      case "ArrowLeft": next = index === 0 ? last : index - 1; break;
      case "ArrowRight": next = index === last ? 0 : index + 1; break;
      case "Home": next = 0; break;
      case "End": next = last; break;
      default: return;
    }
    event.preventDefault();
    setActiveIndex(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="expertise" aria-labelledby="expertise-heading" className="workflow-section">
      <div className="mx-auto max-w-7xl">
        <div className="workflow-intro">
          <h2 id="expertise-heading">Follow the invoice.</h2>
          <p>Check who can edit the records, match an invoice, then ask the policy. Try the controls and see what changes.</p>
        </div>

        <div className="workflow-console" data-chapter={pillars[activeIndex].id}>
          <div className="workflow-bar">
            <span>Finance workflow</span>
            <span>Sample data</span>
          </div>
          <div role="tablist" aria-label="Finance workflow stages" className="workflow-tabs" style={{ "--active-tab": activeIndex } as CSSProperties}>
            <span className="workflow-trace" aria-hidden="true" />
            {pillars.map((pillar, index) => (
              <button
                key={pillar.id}
                ref={(element) => { tabs.current[index] = element; }}
                type="button"
                role="tab"
                id={"workflow-tab-" + pillar.id}
                aria-selected={index === activeIndex}
                aria-controls={"workflow-panel-" + pillar.id}
                tabIndex={index === activeIndex ? 0 : -1}
                onKeyDown={(event) => moveTab(event, index)}
                onClick={() => setActiveIndex(index)}
              >
                {pillar.tag}
              </button>
            ))}
          </div>

          {pillars.map((pillar, index) => (
            <div
              key={pillar.id}
              id={"workflow-panel-" + pillar.id}
              role="tabpanel"
              aria-labelledby={"workflow-tab-" + pillar.id}
              hidden={index !== activeIndex}
              tabIndex={0}
              className="workflow-panel"
            >
              <div className="workflow-panel-grid">
                <div className="workflow-copy">
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                  <dl className="workflow-facts">
                    {pillar.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dt>{metric.label}</dt>
                        <dd>{metric.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <InterfaceCard pillarId={pillar.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
