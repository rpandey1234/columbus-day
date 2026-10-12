import type { StateRecord } from "../data/states";
import { categoryLabel } from "../lib/status";
import {
  formatShare,
  nativeRank,
  nativeShare,
  populationExceptions,
  shareStats,
} from "../lib/population";

type NativeComparisonProps = {
  states: StateRecord[];
  activePostal: string | null;
  selectedPostal: string | null;
  onSelect: (postal: string) => void;
  onHover: (postal: string | null) => void;
};

const width = 760;
const height = 268;
const labelWidth = 196;
const rightPad = 18;
const top = 18;
const bottom = 42;
const axisMax = 16;
const plotWidth = width - labelWidth - rightPad;

const rows = [
  { category: "indigenous", label: "Indigenous Peoples’ Day" },
  { category: "columbus", label: "Columbus Day only" },
  { category: "neither", label: "Does not observe" },
] as const;

function xFor(share: number): number {
  return labelWidth + (share / axisMax) * plotWidth;
}

function jitter(postal: string): number {
  const code = postal.charCodeAt(0) + postal.charCodeAt(1);
  return ((code % 5) - 2) * 5;
}

export function NativeComparison({
  states,
  activePostal,
  selectedPostal,
  onSelect,
  onHover,
}: NativeComparisonProps) {
  const indigenousShares = states
    .filter((state) => state.category === "indigenous")
    .map((state) => nativeShare(state.postal));
  const columbusShares = states
    .filter((state) => state.category === "columbus")
    .map((state) => nativeShare(state.postal));
  const indigenous = shareStats(indigenousShares);
  const columbus = shareStats(columbusShares);
  const exceptions = populationExceptions(states);
  const lane = (height - top - bottom) / rows.length;
  const active = states.find((state) => state.postal === activePostal) ?? null;

  return (
    <section className="comparison" aria-labelledby="native-comparison-title">
      <h2 id="native-comparison-title">Native population and the holiday name</h2>
      <p>
        States that use an Indigenous name average{" "}
        <strong>{formatShare(indigenous.mean)}%</strong> Native population, compared
        with <strong>{formatShare(columbus.mean)}%</strong> in Columbus-only states.
        The Indigenous median is {formatShare(indigenous.median)}%, because Alaska,
        New Mexico, Oklahoma, and South Dakota raise the average.
      </p>
      <svg
        className="plot"
        viewBox={`0 0 ${width} ${height}`}
        role="group"
        aria-label="Native population share by holiday classification"
      >
        {[0, 4, 8, 12, 16].map((tick) => (
          <g key={tick}>
            <line
              x1={xFor(tick)}
              x2={xFor(tick)}
              y1={top}
              y2={height - bottom}
              className="plot-grid"
            />
            <text x={xFor(tick)} y={height - 16} className="plot-axis" textAnchor="middle">
              {tick}%
            </text>
          </g>
        ))}
        <text x={labelWidth} y={height - 2} className="plot-caption">
          American Indian and Alaska Native alone, 2020
        </text>
        {rows.map((row, index) => {
          const y = top + lane * index + lane / 2;
          return (
            <g key={row.category}>
              <text x={0} y={y} className="plot-row" dominantBaseline="middle">
                {row.label}
              </text>
              {states
                .filter((state) => state.category === row.category)
                .map((state) => {
                  const share = nativeShare(state.postal);
                  const selected = state.postal === selectedPostal;
                  const highlighted = state.postal === activePostal;
                  return (
                    <circle
                      key={state.postal}
                      cx={xFor(share)}
                      cy={y + jitter(state.postal)}
                      r={highlighted ? 7 : 5.5}
                      className={`plot-dot plot-${row.category}${selected ? " is-selected" : ""}`}
                      role="button"
                      tabIndex={0}
                      aria-pressed={selected}
                      aria-label={`${state.name}, ${categoryLabel(state.category)}, ${formatShare(share)} percent Native population, rank ${nativeRank(state.postal)} of 50`}
                      onClick={() => onSelect(state.postal)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          onSelect(state.postal);
                        }
                      }}
                      onMouseEnter={() => onHover(state.postal)}
                      onMouseLeave={() => onHover(null)}
                      onFocus={() => onHover(state.postal)}
                      onBlur={() => onHover(null)}
                    />
                  );
                })}
              {states
                .filter((state) => state.category === row.category && nativeShare(state.postal) >= 5)
                .map((state) => (
                  <text
                    key={`${state.postal}-label`}
                    x={xFor(nativeShare(state.postal))}
                    y={y + jitter(state.postal) - 12}
                    className="plot-label"
                    textAnchor="middle"
                  >
                    {state.postal}
                  </text>
                ))}
            </g>
          );
        })}
      </svg>
      <p className="map-summary" aria-live="polite">
        {active ? (
          <>
            <strong>{active.name}.</strong> {formatShare(nativeShare(active.postal))}%
            Native population, rank {nativeRank(active.postal)} of 50.{" "}
            {categoryLabel(active.category)}.
          </>
        ) : (
          "Hover or focus a state. Select it for the full record."
        )}
      </p>
      <p className="quiet">
        At 2.5% or more, without an Indigenous name on this Monday:{" "}
        {exceptions.highWithoutIndigenousName
          .map((state) => `${state.name} (${formatShare(nativeShare(state.postal))}%)`)
          .join(", ")}
        . Under 0.75%, with an Indigenous name:{" "}
        {exceptions.lowWithIndigenousName
          .map((state) => `${state.name} (${formatShare(nativeShare(state.postal))}%)`)
          .join(", ")}
        .
      </p>
    </section>
  );
}
