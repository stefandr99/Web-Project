import React from "react";

import { useApplicationStore } from "../useApplicationStore";
import QueryDataGraphPicker from "./QueryDataGraphPicker";
import QueryInput from "./QueryInput";
import { BarChartVisualization } from "./Visualizations/BarChart";
import { PieChartVisualization } from "./Visualizations/PieChart";
import { RadarChartVisualization } from "./Visualizations/RadarChart";
import { RadialChartVisualization } from "./Visualizations/RadialChart";
import { ScatterChartVisualization } from "./Visualizations/ScatterChart";

function QueryPage() {
  const step = useApplicationStore((state) => state.step);

  switch (step) {
    case 0:
      return <QueryInput />;
    case 1:
      return <QueryDataGraphPicker />;
    case 2:
      return <ChartRenderer />;
    default:
      return <div>Wrong page buddy...</div>;
  }
}

function ChartRenderer() {
  const data: any[] = useApplicationStore((state) => state.dataResult);
  const type = useApplicationStore((state) => state.chosenGraphicType);

  switch (type) {
    case "barChart":
      return <BarChartVisualization data={data} />;

    case "pieChart":
      return <PieChartVisualization data={data} />;

    case "radarChart":
      return <RadarChartVisualization data={data} />;

    case "scatterChart":
      return <ScatterChartVisualization data={data} />;

    case "radialChart":
      return <RadialChartVisualization data={data} />;
    default:
      return <>Unknown Chart Type</>;
  }
}

export default QueryPage;
