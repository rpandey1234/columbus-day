import { currentYear, milestones, timelineStart } from "../data/states";
import type { StateRecord } from "../data/states";
import { adoptedStates } from "../lib/status";

type AdoptionTimelineProps = {
  year: number;
  states: StateRecord[];
  onYearChange: (year: number) => void;
};

export function AdoptionTimeline({
  year,
  states,
  onYearChange,
}: AdoptionTimelineProps) {
  const adopted = adoptedStates(states, year);
  const undated = states.filter(
    (state) => state.category === "indigenous" && state.firstObservedYear === null,
  );
  const span = currentYear - timelineStart;

  return (
    <div className="timeline">
      <div className="timeline-heading">
        <label htmlFor="adoption-year">Adoption through {year}</label>
        <button
          type="button"
          className="text-button"
          onClick={() => onYearChange(currentYear)}
          disabled={year === currentYear}
        >
          Show current status
        </button>
      </div>
      <input
        id="adoption-year"
        type="range"
        min={timelineStart}
        max={currentYear}
        step={1}
        value={year}
        onChange={(event) => onYearChange(Number(event.target.value))}
        aria-valuemin={timelineStart}
        aria-valuemax={currentYear}
        aria-valuenow={year}
        aria-valuetext={
          year === currentYear
            ? `${year}, current status`
            : `${year}, Indigenous Peoples’ Day adoptions so far`
        }
      />
      <div className="milestone-track" aria-hidden="true">
        {milestones.map((milestone) => (
          <span
            key={milestone.year}
            className="milestone-tick"
            style={{ left: `${((milestone.year - timelineStart) / span) * 100}%` }}
          />
        ))}
      </div>
      <div className="year-ends" aria-hidden="true">
        <span>{timelineStart}</span>
        <span>{currentYear}</span>
      </div>
      <ul className="milestones">
        {milestones.map((milestone) => (
          <li key={milestone.year}>
            <button
              type="button"
              className={year === milestone.year ? "is-active" : ""}
              onClick={() => onYearChange(milestone.year)}
            >
              <strong>{milestone.year}</strong> {milestone.title}
            </button>
            {year === milestone.year ? <p>{milestone.detail}</p> : null}
          </li>
        ))}
      </ul>
      <ol className="adoption-list">
        {adopted.map((state) => (
          <li key={state.postal}>
            <strong>{state.firstObservedYear}</strong>
            <span>
              {state.name}
              {state.permanentLawYear !== null &&
              state.permanentLawYear !== state.firstObservedYear
                ? ` · statute ${state.permanentLawYear}`
                : ""}
            </span>
          </li>
        ))}
      </ol>
      {adopted.length === 0 ? (
        <p className="quiet">No state had a statewide October observance yet.</p>
      ) : null}
      {year === currentYear ? (
        <p className="quiet">
          {undated.map((state) => state.name).join(", ")} currently count as
          Indigenous Peoples’ Day in the Pew grouping, and their start years are
          still unverified.
        </p>
      ) : null}
    </div>
  );
}
