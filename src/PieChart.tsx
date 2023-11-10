// BarChart.tsx
import React, { useState, useEffect } from "react";
import { useFrappeGetDocCount } from "frappe-react-sdk";
import "./PieChart.css"; // Create a CSS file for your bar chart styles

function PieChart() {
    const [inCount, setInCount] = useState(0);
    const [outCount, setOutCount] = useState(0);
    const [presentCount, setPresentCount] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedLocation, setSelectedLocation] = useState("Open Workspace - 1"); // State for selected location


  const { data: inTimeData } = useFrappeGetDocCount("Attendance", [
    ["attendance_date", ">=", `${selectedYear}-01-01`],
    ["attendance_date", "<=", `${selectedYear}-12-31`],
    ["location", "=", selectedLocation],
    ["in_time", "!=", ""], // Add more conditions as needed
  ]);

  const { data: outTimeData } = useFrappeGetDocCount("Attendance", [
    ["attendance_date", ">=", `${selectedYear}-01-01`],
    ["attendance_date", "<=", `${selectedYear}-12-31`],
    ["location", "=", selectedLocation],
    ["out_time", "!=", ""], // Add more conditions as needed
  ]);


  useEffect(() => {
    if (inTimeData && outTimeData) {
      const inTimeCount = inTimeData || 0;
      const outTimeCount = outTimeData || 0;
      const totalEmployeeCount = inTimeCount;

      const inPercentageValue = (inTimeCount / totalEmployeeCount) * 100;
      const outPercentageValue = (outTimeCount / totalEmployeeCount) * 100;
      const presentPercentageValue = 100 - outPercentageValue;

      setInCount(inTimeCount);
      setOutCount(outTimeCount);
      setPresentCount(inTimeCount - outTimeCount);
    }
  }, [inTimeData, outTimeData]);

  const handleYearSelection = (year:any) => {
    setSelectedYear(year);
    // Fetch and update data for the selected year here
  };
  const handleLocationSelection = (location:any) => {
    setSelectedLocation(location);
    // Fetch and update data for the selected location here
  };

  return (
    <div className="bar-chart-container">
      <div className="bar">
        <div className="bar-label">IN</div>
        <div className="inner-bar in-bar" style={{ width: `${(inCount / 10)}%` }}>
          {inCount}
        </div>
      </div>
      <div className="bar">
        <div className="bar-label">OUT</div>
        <div className="inner-bar out-bar" style={{ width: `${(outCount / 10)}%` }}>
          {outCount}
        </div>
      </div>
      <div className="bar">
        <div className="bar-label">PRESENT</div>
        <div className="inner-bar present-bar" style={{ width: `${(presentCount / 10)}%` }}>
          {presentCount}
        </div>
      </div>

      <div>
        <label htmlFor="yearSelect">Select Year: </label>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={(e) => handleYearSelection(parseInt(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={selectedYear - 5 + i}>
              {selectedYear - 5 + i}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="locationSelect">Select Location: </label>
        <select
          id="locationSelect"
          value={selectedLocation}
          onChange={(e) => handleLocationSelection(e.target.value)}
        >
          <option value="Open Workspace - 1">Open Workspace - 1</option>
          <option value="Open Workspace - 2">Open Workspace - 2</option>
          <option value="Thaiyur">Thaiyur</option>
          {/* Add more location options as needed */}
        </select>
      </div>
    </div>
  );
}

export default PieChart;
