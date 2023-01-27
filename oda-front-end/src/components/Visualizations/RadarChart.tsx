import React, { useEffect, useState } from "react";
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
import {
  Button,
  MultiSelect,
  TransferList,
  TransferListData,
  useMantineTheme,
} from "@mantine/core";
import { DataExporter } from "../DataExporter";
import { useApplicationStore } from "../../useApplicationStore";
import { useParams } from "react-router-dom";
import { useUserStore } from "../../useUserStore";

export function RadarChartVisualization({
  data,
  onSaveVisualization,
  simpleView,
}: any) {
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
    <div className="w-full h-[700px] text-black text-xs pt-5">
      {!simpleView && (
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

      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey={entryValues[0]} />
          <PolarRadiusAxis />
          {outValues.map((datakey: any) => (
            <Radar
              dataKey={datakey}
              stroke={theme.colorScheme === "dark" ? "white" : "black"}
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
