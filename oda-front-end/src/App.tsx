import "./App.css";
import { Routes, Route } from "react-router-dom";
import QueryPage from "./components/QueryPage";
import { useApplicationStore } from "./useApplicationStore";
import { IconGitBranch, IconGitCommit } from "@tabler/icons";

import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Button,
  useMantineTheme,
  ScrollArea,
  UnstyledButton, Group, Avatar, Text, Box,
  ActionIcon,
  useMantineColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme
} from '@mantine/core';
import { Moon, Sun } from "react-feather";

function AppWithinContext() {

  const step = useApplicationStore((state) => state.step);
  const previousStep = useApplicationStore((state) => state.previousStep);
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="xs" width={{ base: 250 }}>
          <Navbar.Section mt="xs">{<Box
            sx={(theme) => ({
              paddingLeft: theme.spacing.xs,
              paddingRight: theme.spacing.xs,
              paddingBottom: theme.spacing.lg,
              borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
            })}
          >
            <Group position="apart">
              OdaWebDev
              <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                {colorScheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </ActionIcon>
            </Group>
          </Box>}</Navbar.Section>

          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            {/* scrollable content here */}
          </Navbar.Section>

          <Navbar.Section>{<Box
            sx={{
              paddingTop: theme.spacing.sm,
              borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
            }}
          >
            <UnstyledButton
              sx={{
                display: 'block',
                width: '100%',
                padding: theme.spacing.xs,
                borderRadius: theme.radius.sm,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                '&:hover': {
                  backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                },
              }}
            >
              <Group>
                <Avatar
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                  radius="xl"
                />
                <Box sx={{ flex: 1 }}>
                  <Text size="sm" weight={500}>
                    Amy Horsefighter
                  </Text>
                  <Text color="dimmed" size="xs">
                    ahorsefighter@gmail.com
                  </Text>
                </Box>
              </Group>
            </UnstyledButton>
          </Box>}</Navbar.Section>
        </Navbar>
      }
    >
      <Routes>
        <Route
          path="/query"
          element={
            <div>
              <div className="flex items-center justify-between">
                <Text fw={700} size={"xl"}>SPARQL Query</Text>
                {step > 0 &&
                  <Button
                    color="orange" radius="md" size="md"
                    variant="gradient" gradient={{ from: 'orange', to: 'red' }}
                    onClick={() => {
                      previousStep();
                    }}
                  >
                    Back
                  </Button>}


              </div>

              <QueryPage />
            </div>
          }
        ></Route>
      </Routes>
    </AppShell>)
}

function App() {

  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));


  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS theme={{ colorScheme:colorScheme, primaryColor: "orange" }} >

        <AppWithinContext />
      </MantineProvider>
    </ColorSchemeProvider>



  );
}

export default App;
