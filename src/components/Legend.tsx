import type { MapColoring } from "../lib/population";
import { highPopulation, lowPopulation } from "../lib/population";
import type { DisplayCategory } from "../lib/status";
import { categoryLabel, earlyIndigenous, lateIndigenous } from "../lib/status";

type LegendProps = {
  counts: Record<DisplayCategory, number>;
  historical: boolean;
  coloring: MapColoring;
};

const order: DisplayCategory[] = ["indigenous", "columbus", "neither", "not-yet"];

export function Legend({ counts, historical, coloring }: LegendProps) {
  if (coloring === "population") {
    return (
      <div className="legend-block">
        <ul className="legend">
          <li>
            <span
              className="swatch swatch-scale"
              style={{ background: `linear-gradient(90deg, ${lowPopulation}, ${highPopulation})` }}
              aria-hidden="true"
            />
            <span>Native population share</span>
          </li>
        </ul>
        <p className="legend-note">
          Darker brown marks a larger American Indian and Alaska Native
          population. This view stays fixed while the year slider moves.
        </p>
      </div>
    );
  }

  const shown = historical
    ? order.filter((category) => category === "indigenous" || category === "not-yet")
    : order.filter((category) => category !== "not-yet");

  return (
    <div className="legend-block">
      <ul className="legend">
        {shown.map((category) => (
          <li key={category}>
            <span
              className={`swatch swatch-${category}${
                category === "indigenous" && coloring === "adoption" ? " swatch-scale" : ""
              }`}
              style={
                category === "indigenous" && coloring === "adoption"
                  ? { background: `linear-gradient(90deg, ${earlyIndigenous}, ${lateIndigenous})` }
                  : undefined
              }
              aria-hidden="true"
            />
            <span>
              {categoryLabel(category)}
              <strong> {counts[category]}</strong>
            </span>
          </li>
        ))}
      </ul>
      {coloring === "adoption" && shown.includes("indigenous") ? (
        <p className="legend-note">
          Darker green marks an earlier statewide observance. States with no
          verified year use the lightest green.
        </p>
      ) : null}
    </div>
  );
}
