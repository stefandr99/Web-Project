import { Card, Image, Text, Badge, Button, Group, Tabs, useMantineTheme } from '@mantine/core';
import { IconEye } from '@tabler/icons';
import React from "react";
import { Database, Eye } from 'react-feather';
import { useApplicationStore } from "../useApplicationStore";

interface GraphType {
  label: string;
  value: string;
  image: string;
  description?: string;
}

const graphTypes: GraphType[] = [
  {
    label: "Bar Chart",
    value: "barChart",
    image: "https://www.chartphp.com/wp-content/uploads/dark-bar.png",
    description: "Graphical representation of data using bars of different heights."
  },
  {
    label: "Pie Chart",
    value: "pieChart",
    image: "https://static.anychart.com/images/gallery/v8/pie-and-donut-charts-pie-chart-darkturquoise.png",
    description: "A circular statistical graphic, which is divided into slices to illustrate numerical proportion."
  },
  {
    label: "Scatter Chart",
    value: "scatterChart",
    image: "https://t3.ftcdn.net/jpg/03/76/87/64/360_F_376876441_0qF19cNvPPKODsIxHofT81SzsslFbmkS.jpg",
    description: "A type of plot or mathematical diagram using Cartesian coordinates to display values for typically two variables for a set of data."
  },
  {
    label: "Radar Chart",
    value: "radarChart",
    image: "https://static.anychart.com/images/gallery/v8/radar-charts-(spiderweb)-comparison-radar-chart-darkturquoise.png",
    description: "A chart that consists of a sequence of equi-angular spokes, called radii, with each spoke representing a variable."
  },
  {
    label: "Radial Chart",
    value: "radialChart",
    image: "https://static.wixstatic.com/media/2bbf02_3c5ab7fc51064d11a118421a150b5bcd~mv2.png/v1/fit/w_784%2Ch_832%2Cal_c/file.png",
    description: "A chart that consists of a sequence of equi-angular spokes, called radii, with each spoke representing a variable."
  },
  {
    label: "Line Chart",
    value: "lineChart",
    image: "https://static.wixstatic.com/media/2bbf02_3c5ab7fc51064d11a118421a150b5bcd~mv2.png/v1/fit/w_784%2Ch_832%2Cal_c/file.png",
    description: "A chart that consists of a sequence of equi-angular spokes, called radii, with each spoke representing a variable."
   },
];

function QueryDataGraphPicker() {
  const theme = useMantineTheme();
  const dataResult = useApplicationStore((state) => state.dataResult);
  const [activeTab, setActiveTab] = React.useState("visualization");
  const gptSuggestion = useApplicationStore((state) => state.gptSuggestion);
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
    <div className="text-xs pt-4">
      <Tabs value={activeTab} onTabChange={(tab : string) => {setActiveTab(tab)}}>
        <Tabs.List>
          <Tabs.Tab value="visualization" icon={<Eye size={18}/>}>Visualizations</Tabs.Tab>
          <Tabs.Tab value="table" icon={<Database size={18}/>}>Table</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="visualization">
          <div className="flex flex-col flex-grow">
            <div>
              <Text className="text-xl font-bold mt-10">Language Model Analysis</Text>
              <Text mt="md" mb="xs" size="sm" color="dimmed">
                {gptSuggestion}
              </Text>
            </div>
            <span className="py-4 text-xl">Choose the type of chart</span>
            <div className="flex flex-wrap gap-4">
              {graphTypes.map((gtype) => (
                <Card shadow="sm" p="lg" className='w-[300px]' radius="md" withBorder>
                  <Card.Section>
                    <Image
                      src={gtype.image}
                      width={300}
                      height={160}
                      alt="Norway"
                    />
                  </Card.Section>

                  <Text mt="xl" mb="xs" size="sm" color="orange">
                    {gtype.label}
                  </Text>

                  <Text mt="md" mb="xs" size="sm" color="dimmed">
                    {gtype.description}
                  </Text>

                  <Button onClick={()=>{generateGraphic(gtype.value);}} fullWidth mt="md" radius="md">
                    Choose
                  </Button>
                </Card>
              ))}
            </div>

          </div>

        </Tabs.Panel>
        <Tabs.Panel value="table"><div className="w-full mt-4 overflow-auto">
          <table className='w-full border-spacing-0'>
            <thead>
              <tr className="rounded">
                {theadData.map((heading) => {
                  return (
                    <th
                      className={`px-4 py-2 sticky border border-solid border-[#1a1a1a] top-0 ${theme.colorScheme === "dark" ? " bg-[#1a1a1a] ":" white " } uppercase font-extrabold`}
                      key={heading}
                    >
                      {heading}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className='border-spacing-0'>
              {tbodyData.map((row, index) => {
                return (
                  <tr className='border-spacing-0' key={index}>
                    {theadData.map((key, index) => {
                      return (
                        <td className={`px-4 py-2 border  border-solid border-[#25262b] ${theme.colorScheme === "dark" ? " bg-[#25262b] ":" white " }`} key={row[key]}>
                          {row[key]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div></Tabs.Panel>
      </Tabs>




    </div>
  );
}

export default QueryDataGraphPicker;
