import React from "react";
import { useApplicationStore } from "../useApplicationStore";

interface GraphType {
  label: string;
  value: string;
}

const graphTypes: GraphType[] = [
  {
    label: "Bar Chart",
    value: "barChart",
  },
  {
    label: "Pie Chart",
    value: "pieChart",
  },
  {
    label: "Scatter Chart",
    value: "scatterChart",
  },
  {
    label: "Radar Chart",
    value: "radarChart",
  },
  {
    label: "Radial Chart",
    value: "radialChart",
  },
];

function QueryDataGraphPicker() {
  const dataResult = useApplicationStore((state) => state.dataResult);
  const nextStep = useApplicationStore((state) => state.nextStep);
  const setGraphicType = useApplicationStore(
    (state) => state.setChoosenGraphicType
  );

  function generateGraphic(graphicType: string) {
    setGraphicType(graphicType);
    nextStep();
  }

  const [theadData, setTheadData] = React.useState<any[]>(
    Object.keys(dataResult[0])
  );
  const [tbodyData, setTbodyData] = React.useState<any[]>(dataResult);

  return (
    <div className="text-xs flex pt-4">
      <div className="flex flex-col flex-grow">
        <span className="py-4 text-xl">Choose the type of chart</span>
        <div className="flex gap-4">
          {graphTypes.map((gtype) => (
            <div
              onClick={() => {
                generateGraphic(gtype.value);
              }}
              className=" text-[#1a1a1a] text-2xl flex flex-col items-center justify-center bg-slate-200 rounded-2xl h-56 w-56 cursor-pointer"
            >
              <div className="w-32 h-32">
                <img src="https://www.svgrepo.com/show/99962/bar-chart.svg" />
              </div>
              {gtype.label}
            </div>
          ))}
        </div>
      </div>
      <div className="max-h-[600px] w-[500px] overflow-auto">
        <table>
          <thead>
            <tr className="rounded">
              {theadData.map((heading) => {
                return (
                  <th
                    className="px-4 py-2 sticky top-0 bg-[#1a1a1a] uppercase font-extrabold"
                    key={heading}
                  >
                    {heading}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tbodyData.map((row, index) => {
              return (
                <tr key={index}>
                  {theadData.map((key, index) => {
                    return (
                      <td className="px-4 py-2 bg-[#4e4e4e]" key={row[key]}>
                        {row[key]}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QueryDataGraphPicker;
