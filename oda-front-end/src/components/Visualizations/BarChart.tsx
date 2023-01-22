import { TransferList, TransferListData } from "@mantine/core";
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

export const BarChartVisualization = ({ data }: any) => {
  const keys = Object.keys(data[0]).map((value) => ({ value, label: value }));
  const [transferData, setTransferData] = useState<TransferListData>([
    keys.splice(0, 1),
    keys,
  ]);

  return (
    <div className="w-full h-[400px] text-black text-xs pt-5">
      <TransferList
        style={{ color: "white" }}
        value={transferData}
        onChange={setTransferData}
        searchPlaceholder="Search..."
        nothingFound="Nothing here"
        titles={["X Axis", "Y Axis"]}
        breakpoint="sm"
        mb={20}
      />

      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart
          width={400}
          height={400}
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          {transferData[0].map((datakey) => (
            <XAxis dataKey={datakey.value} />
          ))}

          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />

          {transferData[1].map((datakey) => (
            <Line
              type="monotone"
              dataKey={datakey.value}
              stroke="#ff7300"
              yAxisId={0}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart
          width={400}
          height={400}
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="pref" />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Bar type="monotone" dataKey="area" fill="#4186EA" yAxisId={0} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
