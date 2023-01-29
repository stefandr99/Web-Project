import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../useUserStore";
import { Badge, Button, Card, Group, Text } from "@mantine/core";
import { useApplicationStore } from "../useApplicationStore";
import { useNavigate } from "react-router-dom";
import imgUrl from "../assets/something_went_wrong.png";

function SavedVisualizations() {
  const isLogged = useUserStore((state: any) => state.isLoggedIn);
  const token = useUserStore((state: any) => state.token);
  const setData = useApplicationStore((state: any) => state.setDataResult);
  const setVisualization = useApplicationStore(
    (state: any) => state.setVisualisation
  );

  const setType = useApplicationStore(
    (state: any) => state.setChoosenGraphicType
  );

  const setEntryValues = useApplicationStore(
    (state: any) => state.setEntryValues
  );
  const setOutValues = useApplicationStore((state: any) => state.setOutValues);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [visualizations, setVisualizations] = useState([]);
  const navigate = useNavigate();

  async function fetchVisualizations() {
    try {
      return await axios.get("http://localhost:4000/user/", {
        headers: {
          authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async function fetchVisualizationData(source: string, query: string) {
    try {
      return await axios.post("http://localhost:4000/sparql/simple", {
        query: query,
        endpoint: source,
      });
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    fetchVisualizations()
      .then((response: any) => {
        setVisualizations(response.data.queries);
        setIsFetching(false);
      })
      .catch((error: any) => {
        setIsError(true);
        setIsFetching(false);
      });
  }, []);

  if (!isLogged)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div>
          <img className="w-72 mr-8" src={imgUrl} />
        </div>
        <h1 className={"max-w-[300px]"}>You are smart... We're smarter tho.</h1>
      </div>
    );

  if (isFetching) return <div>Loading...</div>;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-6 ">
      {visualizations.map((visualization: any) => (
        //@ts-ignore
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Group position="apart" mb="xs">
            <Text weight={500}>{visualization.title}</Text>
            <Badge color="pink" variant="light">
              {visualization.type}
            </Badge>
            <Badge color="pink" variant="light">
              {visualization.source}
            </Badge>
          </Group>

          <Text size="sm" color="dimmed">
            {visualization.description}
          </Text>
          <Button
            onClick={() => {
              fetchVisualizationData(
                visualization.source,
                visualization.query.replace(/\\n/g, "\n")
              )
                .then((response: any) => {
                  setData(response.data.data);
                  setOutValues(visualization.outValues);
                  setEntryValues(visualization.entryValues);
                  setType(visualization.type);
                  setVisualization(visualization);
                  navigate("/saved/" + visualization._id);
                })
                .catch((error: any) => {
                  console.log(error);
                });
            }}
            fullWidth
            mt="md"
            radius="md"
          >
            View
          </Button>
        </Card>
      ))}
    </div>
  );
}

export default SavedVisualizations;
