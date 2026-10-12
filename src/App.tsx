import { useMemo, useState } from "react";
import { AdoptionTimeline } from "./components/AdoptionTimeline";
import { Legend } from "./components/Legend";
import { StateDetails } from "./components/StateDetails";
import { StateList } from "./components/StateList";
import { StateMap } from "./components/StateMap";
import {
  currentYear,
  dataCurrentAsOf,
  states,
} from "./data/states";
import type { DisplayCategory } from "./lib/status";
import { categoryLabel, displayCategory, officeLabel } from "./lib/status";
import "./styles.css";

function formatReviewDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const emptyCounts: Record<DisplayCategory, number> = {
  indigenous: 0,
  columbus: 0,
  neither: 0,
  "not-yet": 0,
};

export function App() {
  const [year, setYear] = useState(currentYear);
  const [selectedPostal, setSelectedPostal] = useState<string | null>(null);
  const [hoveredPostal, setHoveredPostal] = useState<string | null>(null);

  const statesByFips = useMemo(
    () => new Map(states.map((state) => [state.fips, state])),
    [],
  );
  const statesByPostal = useMemo(
    () => new Map(states.map((state) => [state.postal, state])),
    [],
  );

  const counts = useMemo(() => {
    const next = { ...emptyCounts };
    for (const state of states) {
      next[displayCategory(state, year)] += 1;
    }
    return next;
  }, [year]);

  const selected = selectedPostal
    ? (statesByPostal.get(selectedPostal) ?? null)
    : null;
  const previewPostal = hoveredPostal ?? selectedPostal;
  const preview = previewPostal
    ? (statesByPostal.get(previewPostal) ?? null)
    : null;
  const historical = year < currentYear;

  return (
    <>
      <a className="skip" href="#state-map">
        Skip to map
      </a>
      <header className="masthead">
        <p className="eyebrow">Second Monday in October</p>
        <h1>Columbus Day, by state</h1>
        <p className="lede">
          Federal law still calls the day Columbus Day. States do not. This map
          shows which ones observe Indigenous Peoples’ Day, Columbus Day only,
          or neither, and when a statewide Indigenous observance began.
        </p>
        <p className="meta">Data current as of {formatReviewDate(dataCurrentAsOf)}.</p>
      </header>
      <main>
        <div className="layout">
          <section className="map-panel" id="state-map" aria-label="State map">
            <Legend counts={counts} historical={historical} />
            <StateMap
              statesByFips={statesByFips}
              categoryFor={(state) => displayCategory(state, year)}
              selectedPostal={selectedPostal}
              onSelect={setSelectedPostal}
              onHover={setHoveredPostal}
            />
            <p className="map-summary" aria-live="polite">
              {preview ? (
                <>
                  <strong>{preview.name}.</strong>{" "}
                  {categoryLabel(displayCategory(preview, year))}.{" "}
                  {preview.category === "indigenous" && preview.firstObservedYear
                    ? `First observed ${preview.firstObservedYear}. `
                    : ""}
                  {officeLabel(preview.officesClosed)}.
                </>
              ) : (
                "Hover or focus a state. Select it for sources and notes."
              )}
            </p>
            <AdoptionTimeline
              year={year}
              states={states}
              onYearChange={setYear}
            />
          </section>
          <StateDetails state={selected} year={year} />
        </div>
        <StateList
          states={states}
          selectedPostal={selectedPostal}
          onSelect={setSelectedPostal}
        />
        <section className="method">
          <h2>How a state is classified</h2>
          <p>
            A state is counted under Indigenous Peoples’ Day when it has
            statewide recognition of that day, or an equivalent Native
            observance, on the second Monday in October — including when
            Columbus Day remains on the books. Recognition can be a statute, a
            standing executive order, or a repeated gubernatorial proclamation.
            Paid and unpaid status is separate: it records whether state
            offices generally close.
          </p>
          <p>
            The slider uses the first statewide observance. Where a one-year
            proclamation came before a statute, both years are kept. Ohio,
            Pennsylvania, and Rhode Island stay in the Indigenous Peoples’ Day
            group because Pew Research Center and Newsweek count them as
            observing both holidays, but no start year is established. North
            Dakota’s Indigenous Peoples Day falls on the Friday before the
            Monday, so the Monday itself is unmarked.
          </p>
          <p>
            The national markers — 1977, Berkeley in 1992, and the 2021
            presidential proclamation — are context. They are not state
            adoptions. District of Columbia and U.S. territories are outside
            this map.
          </p>
        </section>
      </main>
      <footer className="source-credit">
        <p>
          Nationwide baseline:{" "}
          <a
            href="https://www.pewresearch.org/short-reads/2025/10/07/columbus-day-indigenous-peoples-day-or-just-a-regular-monday-it-depends-on-where-you-are/"
            target="_blank"
            rel="noreferrer"
          >
            Pew Research Center, “Columbus Day, Indigenous Peoples Day or just a
            regular Monday?” (October 7, 2025)
          </a>
        </p>
      </footer>
    </>
  );
}
