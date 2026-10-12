import { geoAlbersUsa, geoPath } from "d3-geo";
import type { FeatureCollection, Geometry } from "geojson";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import atlas from "us-atlas/states-10m.json";
import { states } from "../data/states";
import type { StateRecord } from "../data/states";
import type { MapColoring } from "../lib/population";
import { formatShare, nativeRank, nativeShare, populationFill } from "../lib/population";
import type { DisplayCategory } from "../lib/status";
import { categoryLabel, indigenousFill } from "../lib/status";

type MapFeature = FeatureCollection<Geometry, Record<string, never>>;

const topology = atlas as unknown as Topology<{
  states: GeometryCollection;
}>;

const collection = feature(topology, topology.objects.states) as MapFeature;
const stateFips = new Set(states.map((state) => state.fips));
const stateCollection: MapFeature = {
  type: "FeatureCollection",
  features: collection.features.filter((shape) =>
    stateFips.has(String(shape.id ?? "").padStart(2, "0")),
  ),
};
const projection = geoAlbersUsa().fitSize([975, 610], stateCollection);
const draw = geoPath(projection);

type StateMapProps = {
  statesByFips: Map<string, StateRecord>;
  categoryFor: (state: StateRecord) => DisplayCategory;
  coloring: MapColoring;
  selectedPostal: string | null;
  onSelect: (postal: string) => void;
  onHover: (postal: string | null) => void;
};

export function StateMap({
  statesByFips,
  categoryFor,
  coloring,
  selectedPostal,
  onSelect,
  onHover,
}: StateMapProps) {
  return (
    <svg
      className={`map${coloring === "population" ? " is-population" : ""}`}
      viewBox="0 0 975 610"
      role="group"
      aria-label="Map of U.S. states by observance"
    >
      {stateCollection.features.map((shape) => {
        const fips = String(shape.id ?? "").padStart(2, "0");
        const state = statesByFips.get(fips);
        if (!state) return null;
        const category = categoryFor(state);
        const selected = state.postal === selectedPostal;
        const path = draw(shape);
        if (!path) return null;
        const share = nativeShare(state.postal);
        const fill =
          coloring === "population"
            ? populationFill(share)
            : coloring === "adoption" && category === "indigenous"
              ? indigenousFill(state.firstObservedYear)
              : undefined;
        const population =
          coloring === "population"
            ? ` ${formatShare(share)} percent Native population, rank ${nativeRank(state.postal)} of 50.`
            : "";
        const adopted =
          coloring !== "population" && category === "indigenous"
            ? ` First observed ${state.firstObservedYear ?? "in an unverified year"}.`
            : "";
        return (
          <path
            key={state.postal}
            d={path}
            className={`state state-${category}${selected ? " is-selected" : ""}`}
            style={fill ? { fill } : undefined}
            role="button"
            tabIndex={0}
            aria-pressed={selected}
            aria-label={`${state.name}, ${categoryLabel(category)}.${adopted}${population}`}
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
    </svg>
  );
}
