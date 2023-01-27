import React from "react";
import { TextInput, Checkbox, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useUserStore } from "../useUserStore";
import imgUrl from "../assets/something_went_wrong.png";

import axios from "axios";

async function login(email: string, password: string) {
  try {
    const response = await axios.post("http://localhost:4000/auth/login", {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

function Login() {
  const setToken = useUserStore((state: any) => state.setToken);
  const setUserName = useUserStore((state: any) => state.setUserName);
  const setEmail = useUserStore((state: any) => state.setEmail);
  const isLoggedIn = useUserStore((state: any) => state.isLoggedIn);

  const setIsLoggedIn = useUserStore((state: any) => state.setIsLoggedIn);
  const [loading, setLoading] = React.useState(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      password: (value: string) =>
        value.length > 3 ? null : "Password must be at least 4 characters long",
    },
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    login(form.values.email, form.values.password)
      .then((response: any) => {
        showNotification({
          title: "Login successful",
          message: "You can now log in",
          color: "orange",
        });

        setLoading(false);
        setEmail(response.email);
        setUserName(response.username);
        setToken(response.acessToken);
        setIsLoggedIn(true);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        showNotification({
          title: "Login failed",
          message: "Please try again",
          color: "red",
        });
      });
  }

  if (isLoggedIn) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div>
          <img className="w-72 mr-8" src={imgUrl} />
        </div>
        <h1>You are already logged in...</h1>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Box sx={{ maxWidth: 400, width: 400 }} mx="auto">
        <form onSubmit={handleSubmit}>
          <TextInput
            withAsterisk
            my={"md"}
            label="Email"
            type={"email"}
            placeholder="your@email.com"
            {...form.getInputProps("email")}
          />

          <TextInput
            withAsterisk
            my={"md"}
            type="password"
            label="Password"
            placeholder="********"
            {...form.getInputProps("password")}
          />

          <Group position="right" mt="xl">
            <Button type="submit">Log in</Button>
          </Group>
        </form>
      </Box>
    </div>
  );
}

export default Login;
