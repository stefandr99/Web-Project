import { Badge, Button, Text } from "@mantine/core";
import React from "react";
import { useApplicationStore } from "../useApplicationStore";
import { useUserStore } from "../useUserStore";
import { ChartRenderer } from "./QueryPage";
import { BarChartVisualization } from "./Visualizations/BarChart";
import { LineChartVisualization } from "./Visualizations/LineChart";
import { PieChartVisualization } from "./Visualizations/PieChart";
import { RadarChartVisualization } from "./Visualizations/RadarChart";
import { RadialChartVisualization } from "./Visualizations/RadialChart";
import { ScatterChartVisualization } from "./Visualizations/ScatterChart";

function Reviewer() {
  const data: any[] = useApplicationStore((state) => state.dataResult);
  const type = useApplicationStore((state) => state.chosenGraphicType);
  const query = useApplicationStore((state: any) => state.query);
  const entryValues = useApplicationStore((state: any) => state.entryValues);
  const outValues = useApplicationStore((state: any) => state.outValues);
  const visualisation = useApplicationStore(
    (state: any) => state.visualisation
  );

  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <h1 className="py-0 my-4">{visualisation.title}</h1>
        <Button size="md" color={"green"}>
          Share
        </Button>
      </div>
      <Text mb={14}>{visualisation.description}</Text>
      <Badge color="pink" mx={4} variant="light">
        {visualisation.type}
      </Badge>
      <Badge color="pink" mx={4} variant="light">
        {visualisation.source}
      </Badge>
      <ChartRenderer setOpened={false} simpleView={true} />
    </div>
  );
}

export default Reviewer;
