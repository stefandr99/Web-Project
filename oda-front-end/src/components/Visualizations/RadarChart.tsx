import React, { useState } from "react";
import {
  ResponsiveContainer,
  Tooltip,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { MultiSelect, TransferList, TransferListData } from "@mantine/core";
import { DataExporter } from "../DataExporter";

export function RadarChartVisualization({ data }: any) {
  const keys = Object.keys(data[0]).map((value) => ({ value, label: value }));
  const [entryValues, setEntryValues] = useState<string[]>([]);
  const [outValues, setOutValues] = useState<string[]>([]);

  return (
    <div className="w-full h-[700px] text-black text-xs pt-5">
      <div className="flex gap-5 mb-10">
        <MultiSelect
          data={keys}
          value={entryValues}
          onChange={(evt) => {
            setEntryValues(evt);
          }}
          label="X Axis"
          placeholder="Pick all that you like"
        />
        <MultiSelect
          data={keys}
          value={outValues}
          onChange={(evt) => {
            setOutValues(evt);
          }}
          label="Y Axis"
          placeholder="Pick all that you like"
        />
        <DataExporter data={data} />
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey={entryValues[0]} />
          <PolarRadiusAxis />
          {outValues.map((datakey) => (
            <Radar
              dataKey={datakey}
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          ))}

          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
