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
import { TransferList, TransferListData } from "@mantine/core";

export function ScatterChartVisualization({ data }: any) {
  const keys = Object.keys(data[0]).map((value) => ({ value, label: value }));
  const [transferData, setTransferData] = useState<TransferListData>([
    keys.splice(0, 1),
    keys,
  ]);

  return (
    <div className="w-full h-[700px] text-black text-xs pt-5">
      <TransferList
        style={{ color: "white" }}
        value={transferData}
        onChange={setTransferData}
        searchPlaceholder="Search..."
        nothingFound="Nothing here"
        titles={["Label Value (only one)", "Selected Values (min 2, max 3)"]}
        breakpoint="sm"
        mb={20}
      />

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
          {transferData[1].length == 2 ? (
            <>
              <XAxis
                type="number"
                dataKey={transferData[1][0].label}
                name={transferData[1][0].label}
              />
              <YAxis
                type="number"
                dataKey={transferData[1][1].label}
                name={transferData[1][1].label}
              />
            </>
          ) : transferData[1].length == 3 ? (
            <>
              <XAxis
                type="number"
                dataKey={transferData[1][0].label}
                name={transferData[1][0].label}
              />
              <YAxis
                type="number"
                dataKey={transferData[1][1].label}
                name={transferData[1][1].label}
              />
              <ZAxis
                type="number"
                dataKey={transferData[1][2].label}
                name={transferData[1][2].label}
              />
            </>
          ) : (
            <></>
          )}

          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="A school" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
