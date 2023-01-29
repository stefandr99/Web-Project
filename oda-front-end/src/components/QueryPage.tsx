import { Button, Group, Modal, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import React, { useState } from "react";

import { useApplicationStore } from "../useApplicationStore";
import { useUserStore } from "../useUserStore";
import QueryDataGraphPicker from "./QueryDataGraphPicker";
import QueryInput from "./QueryInput";
import { BarChartVisualization } from "./Visualizations/BarChart";
import { LineChartVisualization } from "./Visualizations/LineChart";
import { PieChartVisualization } from "./Visualizations/PieChart";
import { RadarChartVisualization } from "./Visualizations/RadarChart";
import { RadialChartVisualization } from "./Visualizations/RadialChart";
import { ScatterChartVisualization } from "./Visualizations/ScatterChart";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

function QueryPage() {
  const step = useApplicationStore((state) => state.step);
  const setStep = useApplicationStore((state) => state.setStep);
  const [opened, setOpened] = useState(false);
  const data: any[] = useApplicationStore((state) => state.dataResult);
  const type = useApplicationStore((state) => state.chosenGraphicType);
  const userMail = useUserStore((state: any) => state.email);
  const token = useUserStore((state: any) => state.token);
  const query = useApplicationStore((state: any) => state.query);
  const source = useApplicationStore((state: any) => state.source);
  const entryValues = useApplicationStore((state: any) => state.entryValues);
  const outValues = useApplicationStore((state: any) => state.outValues);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
  });

  async function saveVisualization() {
    try {
      await axios.post(
        "http://localhost:4000/user/save",
        {
          entryValues: entryValues,
          outValues: outValues,
          email: userMail,
          type: type,
          data: data,
          title: form.values.title,
          description: form.values.description,
          query: query,
          source: source,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );

      showNotification({
        title: "Saved successfully",
        message: "Your visualization has been saved",
        color: "orange",
      });
      setStep(0);
      setOpened(false);
      navigate("/saved");
    } catch (err) {
      showNotification({
        title: "Error",
        message: "Something went wrong. Please try again",
        color: "red",
      });

      setOpened(false);

      throw err;
    }
  }

  switch (step) {
    case 0:
      return <QueryInput />;
    case 1:
      return <QueryDataGraphPicker />;
    case 2:
      return (
        <>
          <ChartRenderer setOpened={setOpened} />{" "}
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Choose visualization type"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveVisualization();
              }}
            >
              <TextInput
                withAsterisk
                my={"md"}
                label="Title"
                type={"text"}
                placeholder="Area of Japan perfectures"
                {...form.getInputProps("title")}
              />

              <Textarea
                withAsterisk
                my={"md"}
                label="Description"
                placeholder="What does this graph represent"
                {...form.getInputProps("description")}
              />

              <Group position="right" mt="xl">
                <Button
                  color={"green"}
                  disabled={
                    form.getInputProps("title").value.length === 0 ||
                    form.getInputProps("description").value.length === 0
                  }
                  type="submit"
                >
                  Save
                </Button>
              </Group>
            </form>
          </Modal>
        </>
      );
    default:
      return <div>Wrong page buddy...</div>;
  }
}

export function ChartRenderer({ setOpened, simpleView }: any) {
  const data: any[] = useApplicationStore((state) => state.dataResult);
  const type = useApplicationStore((state) => state.chosenGraphicType);

  switch (type) {
    case "barChart":
      return (
        <BarChartVisualization
          data={data}
          simpleView={simpleView}
          onSaveVisualization={() => {
            setOpened(true);
          }}
        />
      );

    case "pieChart":
      return (
        <>
          <PieChartVisualization
            data={data}
            simpleView={simpleView}
            onSaveVisualization={() => {
              setOpened(true);
            }}
          />
        </>
      );

    case "radarChart":
      return (
        <RadarChartVisualization
          data={data}
          simpleView={simpleView}
          onSaveVisualization={() => {
            setOpened(true);
          }}
        />
      );

    case "scatterChart":
      return (
        <ScatterChartVisualization
          data={data}
          simpleView={simpleView}
          onSaveVisualization={() => {
            setOpened(true);
          }}
        />
      );

    case "radialChart":
      return (
        <RadialChartVisualization
          data={data}
          simpleView={simpleView}
          onSaveVisualization={() => {
            setOpened(true);
          }}
        />
      );
    case "lineChart":
      return (
        <LineChartVisualization
          data={data}
          simpleView={simpleView}
          onSaveVisualization={() => {
            setOpened(true);
          }}
        />
      );
    default:
      return <>Unknown Chart Type</>;
  }
}

export default QueryPage;
