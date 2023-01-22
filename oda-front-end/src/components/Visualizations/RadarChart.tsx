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
import { TransferList, TransferListData } from "@mantine/core";

export function RadarChartVisualization({ data }: any) {
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
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey={transferData[0][0].label} />
          <PolarRadiusAxis />
          {transferData[1].map((datakey) => (
            <Radar
              dataKey={datakey.label}
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          ))}

          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
