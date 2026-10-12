import { useMemo, useState } from "react";
import type { Category, StateRecord } from "../data/states";
import { categoryLabel } from "../lib/status";

type StateListProps = {
  states: StateRecord[];
  selectedPostal: string | null;
  onSelect: (postal: string) => void;
};

const filters: Array<{ id: Category | "all"; label: string }> = [
  { id: "all", label: "All" },
  { id: "indigenous", label: "Indigenous Peoples’ Day" },
  { id: "columbus", label: "Columbus Day only" },
  { id: "neither", label: "Does not observe" },
];

export function StateList({ states, selectedPostal, onSelect }: StateListProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Category | "all">("all");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return states
      .filter((state) => filter === "all" || state.category === filter)
      .filter((state) => {
        if (!needle) return true;
        return (
          state.name.toLowerCase().includes(needle) ||
          state.postal.toLowerCase().includes(needle)
        );
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [states, query, filter]);

  return (
    <section className="directory" aria-labelledby="directory-heading">
      <div className="directory-bar">
        <h2 id="directory-heading">All states</h2>
        <label className="search">
          <span className="visually-hidden">Search states</span>
          <input
            type="search"
            value={query}
            placeholder="Search by state"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>
      <div className="filters" role="group" aria-label="Filter by observance">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            className={filter === item.id ? "is-active" : ""}
            aria-pressed={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">State</th>
              <th scope="col">Observance</th>
              <th scope="col">Offices</th>
              <th scope="col">Indigenous Peoples’ Day since</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((state) => {
              const selected = state.postal === selectedPostal;
              return (
                <tr
                  key={state.postal}
                  className={selected ? "is-selected" : ""}
                  onClick={() => onSelect(state.postal)}
                >
                  <th scope="row">
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => onSelect(state.postal)}
                    >
                      {state.name}
                    </button>
                  </th>
                  <td>{categoryLabel(state.category)}</td>
                  <td>{state.officesClosed ? "Closed" : "Open"}</td>
                  <td>
                    {state.category === "indigenous"
                      ? (state.firstObservedYear ?? "Year unverified")
                      : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {visible.length === 0 ? (
        <p className="quiet">No states match that search.</p>
      ) : (
        <p className="quiet">
          {visible.length} {visible.length === 1 ? "state" : "states"}
        </p>
      )}
    </section>
  );
}
