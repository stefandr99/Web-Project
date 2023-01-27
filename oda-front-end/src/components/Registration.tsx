import React from 'react'
import { TextInput, Checkbox, Button, Group, Box, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useUserStore } from '../useUserStore';
import imgUrl from '../assets/something_went_wrong.png'




function Registration() {
  const [loading, setLoading] = React.useState(false);
  const isLoggedIn = useUserStore((state: any) => state.isLoggedIn);

  const form = useForm({
    initialValues: {
      email: '',
      userName: '',
      password: '',
      termsOfService: false,
    },

    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      userName: (value: string) => (value.length > 3 ? null : 'Username must be at least 4 characters long'),
      password: (value: string) => (value.length > 3 ? null : 'Password must be at least 4 characters long'),
    },
  });

  async function register() {
    try{
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: form.values.email, name: form.values.userName, password: form.values.password })
      });
      const status = await response.status;
      if(status !== 200){
        throw new Error('Registration failed');
      }
      return response;
    }
    catch(error){
      throw error;
    } 
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setLoading(true);
      register()
      .then(() => {
        showNotification({
          title: 'Registration successful',
          message: 'You can now log in',
          color: 'orange',
        });
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
        setLoading(false);

      }).catch((error) => {
        setLoading(false)
        showNotification({
          title: 'Registration failed',
          message: 'Please try again',
          color: 'red',
        });
      })
    }

    if (isLoggedIn) {
      return (
        <div className='flex h-full w-full items-center justify-center'>
          <div><img className='w-72 mr-8' src={imgUrl} /></div>
          <h1>You are already logged in...</h1>
        </div>
      )
    }

  return (
    <div className='flex h-full w-full items-center justify-center'>

      <Box sx={{ maxWidth: 400, width: 400 }} mx="auto" className={'relative'}>
        <form onSubmit={
          handleSubmit
        }>
          <LoadingOverlay visible={loading} />
          <TextInput
            withAsterisk
            my={'md'}
            label="Full name"
            placeholder="Example User"
            {...form.getInputProps('userName')}
          />

          <TextInput
            withAsterisk
            my={'md'}
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />

          <TextInput
            withAsterisk
            my={'md'}
            type="password"
            label="Password"
            placeholder="********"
            {...form.getInputProps('password')}
          />

          <Checkbox
            my={'xl'}

            label="I agree that the owner of this website can use my data for whatever he wants, and will not be held responsible for any damages caused by the use of this website."
            {...form.getInputProps('termsOfService', { type: 'checkbox' })}
          />

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Box>
    </div>

  )
}

export default Registration