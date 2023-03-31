import React from "react";
import "../GraphComponent/GraphComponent.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
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
    <div className="graphComponentDiv col-md-12">
      <h5 className="portfolioText">Portfolio</h5>
      <div className="graph-dropdown">
        {[DropdownButton].map((DropdownType, idx) => (
          <DropdownType
            as={ButtonGroup}
            key={idx}
            id={`dropdown-button-drop-${idx}`}
            size="sm"
            variant="dark"
            title="Last 7 days"
          >
            {/* <Dropdown.Item eventKey="1">Action</Dropdown.Item>
            <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
            <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4">Separated link</Dropdown.Item> */}
          </DropdownType>
        ))}
      </div>
      <Line
        data={chartData}
        position="absolute"
        height={250}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default GraphComponent;
