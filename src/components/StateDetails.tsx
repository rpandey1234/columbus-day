import type { StateRecord } from "../data/states";
import { currentYear } from "../data/states";
import { categoryLabel, displayCategory, officeLabel } from "../lib/status";

type StateDetailsProps = {
  state: StateRecord | null;
  year: number;
};

export function StateDetails({ state, year }: StateDetailsProps) {
  if (!state) {
    return (
      <aside className="details" aria-live="polite">
        <h2>State details</h2>
        <p className="quiet">
          Select a state on the map or in the list to see its observance, office
          closure, and sources.
        </p>
      </aside>
    );
  }

  const shown = displayCategory(state, year);
  const yearKnown = state.firstObservedYear !== null;

  return (
    <aside className="details" aria-live="polite">
      <p className="eyebrow">{state.postal}</p>
      <h2>{state.name}</h2>
      <p className={`badge badge-${shown}`}>{categoryLabel(shown)}</p>
      <dl>
        <div>
          <dt>Official name</dt>
          <dd>{state.observanceName ?? "No statewide name on this Monday"}</dd>
        </div>
        <div>
          <dt>Columbus Day</dt>
          <dd>
            {state.category === "columbus"
              ? "This is the state’s observance"
              : state.alsoColumbusDay
                ? "Also recognized"
                : "Not recognized on this Monday"}
          </dd>
        </div>
        <div>
          <dt>State offices</dt>
          <dd>{officeLabel(state.officesClosed)}</dd>
        </div>
        {state.category === "indigenous" ? (
          <>
            <div>
              <dt>First observed</dt>
              <dd>{yearKnown ? state.firstObservedYear : "Year unverified"}</dd>
            </div>
            <div>
              <dt>Permanent statute</dt>
              <dd>{state.permanentLawYear ?? "No statute year on file"}</dd>
            </div>
          </>
        ) : null}
      </dl>
      {year < currentYear && shown === "not-yet" ? (
        <p className="quiet">
          {yearKnown
            ? `${state.name}’s first statewide October observance was ${state.firstObservedYear}.`
            : `${state.name} is in the current Indigenous Peoples’ Day group, and the start year is unverified.`}
        </p>
      ) : null}
      {state.notes ? <p>{state.notes}</p> : null}
      <h3>Sources</h3>
      <ul className="sources">
        {state.sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} target="_blank" rel="noreferrer">
              {source.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
