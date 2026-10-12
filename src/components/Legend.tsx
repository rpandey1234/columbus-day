import type { DisplayCategory } from "../lib/status";
import { categoryLabel } from "../lib/status";

type LegendProps = {
  counts: Record<DisplayCategory, number>;
  historical: boolean;
};

const order: DisplayCategory[] = ["indigenous", "columbus", "neither", "not-yet"];

export function Legend({ counts, historical }: LegendProps) {
  const shown = historical
    ? order.filter((category) => category === "indigenous" || category === "not-yet")
    : order.filter((category) => category !== "not-yet");

  return (
    <ul className="legend">
      {shown.map((category) => (
        <li key={category}>
          <span className={`swatch swatch-${category}`} aria-hidden="true" />
          <span>
            {categoryLabel(category)}
            <strong> {counts[category]}</strong>
          </span>
        </li>
      ))}
    </ul>
  );
}
