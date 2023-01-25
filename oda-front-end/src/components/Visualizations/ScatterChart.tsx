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
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Scatter,
  ZAxis,
} from "recharts";
import { MultiSelect } from "@mantine/core";
import { DataExporter } from "../DataExporter";

export function ScatterChartVisualization({ data }: any) {
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
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          {outValues.length == 2 ? (
            <>
              <XAxis type="number" dataKey={outValues[0]} name={outValues[0]} />
              <YAxis type="number" dataKey={outValues[1]} name={outValues[1]} />
            </>
          ) : outValues.length == 3 ? (
            <>
              <XAxis type="number" dataKey={outValues[0]} name={outValues[0]} />
              <YAxis type="number" dataKey={outValues[1]} name={outValues[1]} />
              <ZAxis type="number" dataKey={outValues[2]} name={outValues[2]} />
            </>
          ) : (
            <></>
          )}

          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="A school" data={data} fill="#fd7e14" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
