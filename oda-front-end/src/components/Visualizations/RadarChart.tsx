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
import { MultiSelect, TransferList, TransferListData, useMantineTheme } from "@mantine/core";
import { DataExporter } from "../DataExporter";

export function RadarChartVisualization({ data }: any) {
  const theme = useMantineTheme();
  const keys = Object.keys(data[0]).map((value) => ({ value, label: value }));
  const [entryValues, setEntryValues] = useState<string[]>([]);
  const [outValues, setOutValues] = useState<string[]>([]);

  return (
    <div className="w-full h-[700px] text-black text-xs pt-5">
      <div className="flex items-center gap-5 mb-10">
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
        <div className="mt-5">

        <DataExporter data={data} />
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey={entryValues[0]} />
          <PolarRadiusAxis />
          {outValues.map((datakey) => (
            <Radar
              dataKey={datakey}
              stroke={theme.colorScheme ==="dark"?"white":"black"}
              fill={"#e8590c"}
              fillOpacity={0.6}
            />
          ))}

          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
