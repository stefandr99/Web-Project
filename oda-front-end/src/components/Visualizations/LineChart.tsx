import { Button, MultiSelect, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { useApplicationStore } from "../../useApplicationStore";
import { useUserStore } from "../../useUserStore";
import { DataExporter } from "../DataExporter";

export const LineChartVisualization = ({
  data,
  onSaveVisualization,
  simpleView,
}: any) => {
  const theme = useMantineTheme();
  const keys = Object.keys(data[0]).map((value) => ({ value, label: value }));
  const entryValues = useApplicationStore((state: any) => state.entryValues);
  const setEntryValues = useApplicationStore(
    (state: any) => state.setEntryValues
  );
  const outValues = useApplicationStore((state: any) => state.outValues);
  const setOutValues = useApplicationStore((state: any) => state.setOutValues);
  const isLogged = useUserStore((state: any) => state.isLoggedIn);

  let { id } = useParams();

  useEffect(() => {
    if (!id) {
      setEntryValues([]);
      setOutValues([]);
    }
  }, []);

  return (
    <div className="w-full h-[400px] text-black text-xs pt-5">
      {!simpleView && (
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
          <div className="mt-5 flex gap-5">
            <DataExporter data={data} />
            {isLogged && (
              <Button
                disabled={entryValues.length === 0 || outValues.length === 0}
                color={"green"}
                onClick={() => {
                  onSaveVisualization(entryValues, outValues);
                }}
              >
                Save visualization
              </Button>
            )}
          </div>
        </div>
      )}

      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart
          width={400}
          height={400}
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          {entryValues.map((datakey: any) => (
            <XAxis dataKey={datakey} />
          ))}

          <Tooltip />
          <CartesianGrid
            stroke={theme.colorScheme === "dark" ? "white" : "black"}
          />

          {outValues.map((datakey: any) => (
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
