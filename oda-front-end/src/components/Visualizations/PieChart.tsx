import React, { useState } from "react";
import * as d3 from "d3";
import { ResponsiveContainer, Tooltip, PieChart, Pie } from "recharts";
import { TransferList, TransferListData } from "@mantine/core";

export function PieChartVisualization({ data, outerRadius, innerRadius }: any) {
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
        <PieChart width={1000} height={1000}>
          {transferData[1].map((datakey) => (
            <Pie
              data={data}
              nameKey={transferData[0][0].value}
              dataKey={datakey.value}
              cx="50%"
              cy="50%"
              outerRadius={300}
              fill="#8884d8"
              label
            />
          ))}
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
