import React, { useState } from "react";
import * as d3 from "d3";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { TransferList, TransferListData } from "@mantine/core";
const style = {
  top: "50%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};

export function RadialChartVisualization({ data }: any) {
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
        titles={["Label Value (only one)", "Selected Values"]}
        breakpoint="sm"
        mb={20}
      />

      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="10%"
          outerRadius="80%"
          barSize={10}
          data={data}
        >
          {transferData[1].map((datakey) => (
            <RadialBar
              label={{ position: "insideStart", fill: "#fff" }}
              background
              dataKey={datakey.value}
              // @ts-ignore
              nameKey={transferData[0][0].label}
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
