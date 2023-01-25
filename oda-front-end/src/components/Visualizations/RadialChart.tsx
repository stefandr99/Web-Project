import React, { useState } from "react";
import * as d3 from "d3";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { MultiSelect, TransferList, TransferListData } from "@mantine/core";
import { DataExporter } from "../DataExporter";
const style = {
  top: "50%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};

export function RadialChartVisualization({ data }: any) {
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
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="10%"
          outerRadius="80%"
          barSize={10}
          data={data}
        >
          {outValues.map((datakey) => (
            <RadialBar
              label={{ position: "insideStart", fill: "#fff" }}
              background
              dataKey={datakey}
              // @ts-ignore
              nameKey={entryValues[0]}
              // @ts-ignore
              clockWise
              // @ts-ignore
              minAngle={15}
            />
          ))}
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
