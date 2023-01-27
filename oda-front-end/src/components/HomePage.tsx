import { Badge, Button, Card, Group, Text } from "@mantine/core";
import React from "react";
import { Eye, User, UserPlus } from "react-feather";
import { Link } from "react-router-dom";
import { useUserStore } from "../useUserStore";

function HomePage() {
  const isLoggedIn = useUserStore((state: any) => state.isLoggedIn);
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className=" flex items-center flex-col max-w-[950px]">
        <Text weight={700} size={"xl"}>
          Welcome to Theia Visualizer
        </Text>
        <div className="flex flex-wrap justify-center gap-6 py-8">
          <Card
            className="flex items-center flex-col text-center w-[300px]"
            shadow="sm"
            p="lg"
            radius="md"
            withBorder
          >
            <Eye size={50} />
            <Text size={"xl"} mt="md" weight={500}>
              Visualize data from query
            </Text>

            <Link className="no-underline" to={"/query"}>
              <Button
                variant="gradient"
                gradient={{ from: "orange", to: "red" }}
                fullWidth
                mt="lg"
                radius="md"
              >
                View
              </Button>
            </Link>
          </Card>
          {!isLoggedIn && (
            <>
              <Card
                className="flex items-center flex-col text-center w-[300px]"
                shadow="sm"
                p="lg"
                radius="md"
                withBorder
              >
                <User size={50} />
                <Text size={"xl"} mt="md" weight={500}>
                  Log in to account
                </Text>
                <Link className="no-underline" to={"/login"}>
                  <Button
                    variant="gradient"
                    gradient={{ from: "orange", to: "red" }}
                    fullWidth
                    mt="lg"
                    radius="md"
                  >
                    Log in
                  </Button>
                </Link>
              </Card>
              <Card
                className="flex items-center flex-col text-center w-[300px]"
                shadow="sm"
                p="lg"
                radius="md"
                withBorder
              >
                <UserPlus size={50} />
                <Text size={"xl"} mt="md" weight={500}>
                  Register
                </Text>
                <Link className="no-underline" to={"/register"}>
                  <Button
                    variant="gradient"
                    gradient={{ from: "orange", to: "red" }}
                    fullWidth
                    mt="lg"
                    radius="md"
                  >
                    Register
                  </Button>
                </Link>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
