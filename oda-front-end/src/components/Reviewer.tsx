import {
  Badge,
  Button,
  Group,
  Modal,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import React from "react";
import { useApplicationStore } from "../useApplicationStore";
import { useUserStore } from "../useUserStore";
import { ChartRenderer } from "./QueryPage";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { APILink } from "../env";

function Reviewer() {
  const [opened, setOpened] = React.useState(false);
  const userMail = useUserStore((state: any) => state.email);
  const visualisation = useApplicationStore(
    (state: any) => state.visualisation
  );
  const token = useUserStore((state: any) => state.token);

  const form = useForm({
    initialValues: {
      toBeSharedEmail: "",
    },
  });

  async function shareVisualization() {
    try {
      await axios.post(
        `https://${APILink}/user/share`,
        {
          userEmail: userMail,
          queryId: visualisation._id,
          friendEmail: form.values.toBeSharedEmail,
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
    } catch (err) {
      showNotification({
        title: "Error",
        message: "Something went wrong. Please try again",
        color: "red",
      });

      throw err;
    }
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Enter email of the person you want to share with."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            shareVisualization();
          }}
        >
          <TextInput
            withAsterisk
            my={"md"}
            label="Email"
            type={"email"}
            placeholder="Enter email"
            {...form.getInputProps("toBeSharedEmail")}
          />

          <Group position="right" mt="xl">
            <Button
              color={"green"}
              disabled={
                form.getInputProps("toBeSharedEmail").value.length === 0
              }
              type="submit"
            >
              Share
            </Button>
          </Group>
        </form>
      </Modal>

      <div>
        <div className="flex w-full items-center justify-between">
          <h1 className="py-0 my-4">{visualisation.title}</h1>
          <Button size="md" color={"green"} onClick={() => setOpened(true)}>
            Share
          </Button>
        </div>
        <Text mb={14}>{visualisation.description}</Text>
        <Badge color="pink" mx={4} variant="light">
          {visualisation.type}
        </Badge>
        <Badge color="pink" mx={4} variant="light">
          {visualisation.source}
        </Badge>
        <ChartRenderer setOpened={false} simpleView={true} />
      </div>
    </>
  );
}

export default Reviewer;
