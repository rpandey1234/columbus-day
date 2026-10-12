import { useMemo, useState } from "react";
import { AdoptionTimeline } from "./components/AdoptionTimeline";
import { Legend } from "./components/Legend";
import { NativeComparison } from "./components/NativeComparison";
import { StateDetails } from "./components/StateDetails";
import { StateList } from "./components/StateList";
import { StateMap } from "./components/StateMap";
import {
  currentYear,
  dataCurrentAsOf,
  states,
} from "./data/states";
import type { MapColoring } from "./lib/population";
import { formatShare, nativeRank, nativeShare } from "./lib/population";
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

const colorings: { id: MapColoring; label: string }[] = [
  { id: "status", label: "Holiday status" },
  { id: "adoption", label: "Adoption year" },
  { id: "population", label: "Native population" },
];

const emptyCounts: Record<DisplayCategory, number> = {
  indigenous: 0,
  columbus: 0,
  neither: 0,
  "not-yet": 0,
};

export function App() {
  const [year, setYear] = useState(currentYear);
  const [coloring, setColoring] = useState<MapColoring>("status");
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
        <h1>Columbus Day or Indigenous Peoples’ Day</h1>
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
            <div className="view-toggle" role="radiogroup" aria-label="Map coloring">
              {colorings.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={coloring === option.id}
                  className={coloring === option.id ? "is-active" : ""}
                  onClick={() => setColoring(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <Legend counts={counts} historical={historical} coloring={coloring} />
            <StateMap
              statesByFips={statesByFips}
              categoryFor={(state) => displayCategory(state, year)}
              coloring={coloring}
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
                  {coloring === "population"
                    ? `${formatShare(nativeShare(preview.postal))}% Native population, rank ${nativeRank(preview.postal)} of 50. `
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
        <NativeComparison
          states={states}
          activePostal={previewPostal}
          selectedPostal={selectedPostal}
          onSelect={setSelectedPostal}
          onHover={setHoveredPostal}
        />
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
          <p>
            The population comparison uses the 2020 Census Bureau estimate of
            people identifying as American Indian and Alaska Native alone, as a
            share of each state’s population. It records self-identified race,
            not tribal enrollment. Among the factors examined, this share is the
            strongest association with whether a state gives the Monday an
            Indigenous name. It is not a cause: several high-share states do
            not, and several low-share states do.
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
