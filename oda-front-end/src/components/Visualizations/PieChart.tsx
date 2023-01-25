import React, { useState } from "react";
import * as d3 from "d3";
import { ResponsiveContainer, Tooltip, PieChart, Pie } from "recharts";
import { Button, MultiSelect, TransferList, TransferListData, useMantineTheme } from "@mantine/core";
import { DataExporter } from "../DataExporter";

export function PieChartVisualization({ data, outerRadius, innerRadius }: any) {
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
        <PieChart width={1000} height={1000}>
          {outValues.map((datakey) => (
            <Pie
              data={data}
              nameKey={entryValues[0]}
              dataKey={datakey}
              cx="50%"
              cy="50%"
              stroke={theme.colorScheme ==="dark"?"white":"black"}
              outerRadius={300}
              fill="#fd7e14"
              label={(entry) => {
                return entry.name;
                }}
            />
          ))}
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
