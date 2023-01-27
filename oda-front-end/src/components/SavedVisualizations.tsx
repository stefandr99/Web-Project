import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUserStore } from "../useUserStore";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { useApplicationStore } from "../useApplicationStore";
import { useNavigate } from "react-router-dom";

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

  function fetchVisualizations() {
    try {
      const response: any = axios.get("http://localhost:4000/user/", {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  function fetchVisualizationData(source: string, query: string) {
    try {
      const response: any = axios.post("http://localhost:4000/sparql/simple", {
        query: query,
        endpoint: source,
      });
      return response;
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

  if (!isLogged) return <div>Not logged in</div>;

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
          {JSON.stringify}

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
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
          >
            Book classic tour now
          </Button>
        </Card>
      ))}
    </div>
  );
}

export default SavedVisualizations;
