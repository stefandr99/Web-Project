import { MultiSelect, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { DataExporter } from "../DataExporter";

export const LineChartVisualization = ({ data }: any) => {
  const theme = useMantineTheme();
  const keys = Object.keys(data[0]).map((value) => ({ value, label: value }));
  const [entryValues, setEntryValues] = useState<string[]>([]);
  const [outValues, setOutValues] = useState<string[]>([]);

  return (
    <div className="w-full h-[400px] text-black text-xs pt-5">
      <div className="flex gap-5 mb-10 items-end">
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

      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart
          width={400}
          height={400}
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          {entryValues.map((datakey) => (
            <XAxis dataKey={datakey} />
          ))}

          <Tooltip />
          <CartesianGrid stroke={theme.colorScheme ==="dark"?"white":"black"} />

          {outValues.map((datakey) => (
            <Line
              type="monotone"
              dataKey={datakey}
              stroke="#ff7300"
              yAxisId={0}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
