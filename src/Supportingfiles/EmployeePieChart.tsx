import React, { useEffect, useState } from "react";
import { Chart } from "chart.js";

const EmployeePieChart = ({ pieChartData }: { pieChartData: { IN: number; OUT: number; PRESENT: number } | null }) => {
  useEffect(() => {
    const pieChartCanvas = document.getElementById("pieChart") as HTMLCanvasElement;

    if (pieChartCanvas && pieChartData) {
      const pieData = {
        labels: ["IN", "OUT", "PRESENT"],
        datasets: [
          {
            data: [pieChartData.IN, pieChartData.OUT, pieChartData.PRESENT],
            backgroundColor: ["green", "blue", "orange"],
          },
        ],
      };

      new Chart(pieChartCanvas, {
        type: "pie",
        data: pieData,
      });
    }
  }, [pieChartData]);

  return (
    <div className="pie-chart-container">
      <canvas id="pieChart" width="100" height="100"></canvas>
    </div>
  );
};

export default EmployeePieChart;
