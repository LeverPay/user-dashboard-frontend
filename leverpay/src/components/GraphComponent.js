import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js/auto";

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const GraphComponent = ({ chartData }) => {
  return (
    <div>
      {/* <h5 className="portfolioText">Portfolio</h5> */}
      <Line
        data={chartData}
        width={700}
        height={291}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default GraphComponent;
