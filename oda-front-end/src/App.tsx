import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import QueryPage from "./components/QueryPage";
import { useApplicationStore } from "./useApplicationStore";
import { IconGitBranch, IconGitCommit } from "@tabler/icons";

import React, { useState } from "react";
import {
  AppShell,
  Navbar,
  Button,
  useMantineTheme,
  ScrollArea,
  UnstyledButton,
  Group,
  Avatar,
  Text,
  Box,
  ActionIcon,
  useMantineColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme,
  ThemeIcon,
} from "@mantine/core";
import { Eye, Home, LogOut, Moon, Save, Sun } from "react-feather";
import HomePage from "./components/HomePage";
import { useUserStore } from "./useUserStore";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { NotificationsProvider } from "@mantine/notifications";
import { json } from "d3";
import SavedVisualizations from "./components/SavedVisualizations";
import Reviewer from "./components/Reviewer";
import { JsonLd } from "react-schemaorg";
import { WebApplication } from "schema-dts";

function AppWithinContext() {
  const step = useApplicationStore((state) => state.step);
  const previousStep = useApplicationStore((state) => state.previousStep);
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isLogged = useUserStore((state: any) => state.isLoggedIn);
  const userName = useUserStore((state: any) => state.userName);
  const userMail = useUserStore((state: any) => state.email);
  const resetStore = useUserStore((state: any) => state.resetStore);

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="xs" width={{ base: 250 }}>
          <Navbar.Section mt="xs">
            {
              <Box
                sx={(theme) => ({
                  paddingLeft: theme.spacing.xs,
                  paddingRight: theme.spacing.xs,
                  paddingBottom: theme.spacing.lg,
                  borderBottom: `1px solid ${
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[4]
                      : theme.colors.gray[2]
                  }`,
                })}
              >
                <Group position="apart">
                  <Link className="no-underline" to={"/"}>
                    <UnstyledButton
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        width: "100%",
                        padding: theme.spacing.xs,
                        borderRadius: theme.radius.sm,
                        color:
                          theme.colorScheme === "dark"
                            ? theme.colors.dark[0]
                            : theme.black,

                        "&:hover": {
                          backgroundColor:
                            theme.colorScheme === "dark"
                              ? theme.colors.dark[6]
                              : theme.colors.gray[0],
                        },
                      }}
                    >
                      <Eye size={32} strokeWidth={2.5} />
                      <Text size={"lg"} weight={700}>
                        Theia
                      </Text>
                    </UnstyledButton>
                  </Link>
                  <ActionIcon
                    variant="default"
                    onClick={() => toggleColorScheme()}
                    size={30}
                  >
                    {colorScheme === "dark" ? (
                      <Sun size={16} />
                    ) : (
                      <Moon size={16} />
                    )}
                  </ActionIcon>
                </Group>
              </Box>
            }
          </Navbar.Section>

          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            <Link className="no-underline" to={"/query"}>
              <UnstyledButton
                sx={(theme) => ({
                  display: "block",
                  width: "100%",
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.sm,
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.black,

                  "&:hover": {
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[0],
                  },
                })}
              >
                <Group>
                  <ThemeIcon color="orange">
                    <Eye size={15} />
                  </ThemeIcon>

                  <Text size="sm" weight={700}>
                    Visualize Data
                  </Text>
                </Group>
              </UnstyledButton>
            </Link>

            {isLogged && (
              <>
                <Link className="no-underline" to={"/saved"}>
                  <UnstyledButton
                    sx={(theme) => ({
                      display: "block",
                      width: "100%",
                      padding: theme.spacing.xs,
                      borderRadius: theme.radius.sm,
                      color:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[0]
                          : theme.black,

                      "&:hover": {
                        backgroundColor:
                          theme.colorScheme === "dark"
                            ? theme.colors.dark[6]
                            : theme.colors.gray[0],
                      },
                    })}
                  >
                    <Group>
                      <ThemeIcon color="green">
                        <Save size={15} />
                      </ThemeIcon>

                      <Text size="sm" weight={700}>
                        My visualizations
                      </Text>
                    </Group>
                  </UnstyledButton>
                </Link>
                <UnstyledButton
                  onClick={() => {
                    resetStore();
                  }}
                  sx={(theme) => ({
                    display: "block",
                    width: "100%",
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[0]
                        : theme.black,

                    "&:hover": {
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[6]
                          : theme.colors.gray[0],
                    },
                  })}
                >
                  <Group>
                    <ThemeIcon color="red">
                      <LogOut size={15} />
                    </ThemeIcon>

                    <Text size="sm" weight={700}>
                      Log out
                    </Text>
                  </Group>
                </UnstyledButton>
              </>
            )}
          </Navbar.Section>

          <Navbar.Section>
            {
              <Box
                sx={{
                  paddingTop: theme.spacing.sm,
                  borderTop: `1px solid ${
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[4]
                      : theme.colors.gray[2]
                  }`,
                }}
              >
                <UnstyledButton
                  sx={{
                    display: "block",
                    width: "100%",
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[0]
                        : theme.black,

                    "&:hover": {
                      backgroundColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[6]
                          : theme.colors.gray[0],
                    },
                  }}
                >
                  {isLogged ? (
                    <Group>
                      <Avatar radius="xl">{userName[0].toUpperCase()}</Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Text size="sm" weight={500}>
                          {userName}
                        </Text>
                        <Text color="dimmed" size="xs">
                          {userMail}
                        </Text>
                      </Box>
                    </Group>
                  ) : (
                    <Group className="flex items-center justify-center">
                      <Link to={"/login"}>
                        <Button>Log in</Button>
                      </Link>
                      <Link to={"/register"}>
                        <Button>Register</Button>
                      </Link>
                    </Group>
                  )}
                </UnstyledButton>
              </Box>
            }
          </Navbar.Section>
        </Navbar>
      }
    >
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Registration />}></Route>
        <Route path="/saved" element={<SavedVisualizations />}></Route>
        <Route path="/saved/:id/" element={<Reviewer />}></Route>
        <Route
          path="/query"
          element={
            <div>
              <div className="flex items-center justify-between">
                <Text fw={700} size={"xl"}>
                  SPARQL Query
                </Text>
                {step > 0 && (
                  <Button
                    color="orange"
                    radius="md"
                    size="md"
                    variant="gradient"
                    gradient={{ from: "orange", to: "red" }}
                    onClick={() => {
                      previousStep();
                    }}
                  >
                    Back
                  </Button>
                )}
              </div>

              <QueryPage />
            </div>
          }
        ></Route>
      </Routes>
    </AppShell>
  );
}

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: colorScheme, primaryColor: "orange" }}
      >
        <NotificationsProvider>
          <AppWithinContext />
          <JsonLd<WebApplication>
            item={{
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Theia Oda Visualizer",
              author: "Serghei Cunev, Stefan Dragoi, Nazar Fatikhov",
              countryOfOrigin: "Romania, Republic of Moldova, Russia",
              about: "Visualize your SPARQL queries with ease and style",
              dateCreated: "2 February, 2022",
              featureList:
                "SPARQL Query, Visualization, Save, Share, OpenAI GPT-3",
              availableOnDevice: "Desktop, Tablet",
              softwareVersion: "1.0.0",
              applicationCategory: "Visualization",
              browserRequirements: "JavaScript enabled",
              inLanguage: "English",
            }}
          />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
