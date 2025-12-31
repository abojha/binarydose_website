import React, { useEffect, useState } from "react";

export default function PyqsList({ data }) {
  // Read initial filter from URL
  const getInitialFilter = () => {
    if (typeof window === "undefined") return "all";
    const params = new URLSearchParams(window.location.search);
    return params.get("f") || "all";
  };

  const [filter, setFilter] = useState(getInitialFilter);

  // Sync filter → URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (filter === "all") {
      params.delete("f");
    } else {
      params.set("f", filter);
    }
    const newUrl =
      window.location.pathname +
      (params.toString() ? `?${params}` : "");
    window.history.replaceState(null, "", newUrl);
  }, [filter]);

  const years = Array.from(
    new Set(data.flatMap(item => item.years))
  ).sort((a, b) => b - a);

  const filteredData = data.filter(item => {
    if (filter === "all") return true;
    if (filter === "must-do") return item.years.length >= 2;
    return item.years.includes(Number(filter));
  });

  const showYears = filter === "all";

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <select
          className="pyq-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Questions</option>
          <option value="must-do">🔥 Must-Do Only</option>
          {years.map(y => (
            <option key={y} value={y}>
              Year {y}
            </option>
          ))}
        </select>
      </div>

      <div className="pyq-list">
        {filteredData.map((item, index) => {
          const isMustDo = item.years.length >= 2;

          return (
            <div
              key={index}
              className={`pyq-card ${isMustDo ? "pyq-must-do" : ""}`}
            >
              <div className="pyq-row">
                <p className="pyq-question">{item.question}</p>

                {showYears && (
                  <div className="pyq-years">
                    {item.years.map(y => (
                      <span key={y} className="pyq-year-chip">{y}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
