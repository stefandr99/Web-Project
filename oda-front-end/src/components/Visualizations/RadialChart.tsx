import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Button,
  MultiSelect,
  TransferList,
  TransferListData,
} from "@mantine/core";
import { DataExporter } from "../DataExporter";
import { useApplicationStore } from "../../useApplicationStore";
import { useParams } from "react-router-dom";
import { useUserStore } from "../../useUserStore";
const style = {
  top: "50%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};

export function RadialChartVisualization({
  data,
  onSaveVisualization,
  simpleView,
}: any) {
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
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="10%"
          outerRadius="80%"
          barSize={10}
          data={data}
        >
          {outValues.map((datakey: any) => (
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
          <Tooltip
            label={(e: any) => {
              return e.name;
            }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
