import * as React from 'react';
import { FC, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import {
  SubmitHandler,
  useForm,
  Controller,
  FieldValues,
} from 'react-hook-form';
import useMobxStoreHook from '../../hooks/use-mobx-store.hook';
import { observer } from 'mobx-react-lite';

const theme: Theme = createTheme();

const SignIn: FC = () => {
  const [errorSt, setError] = useState(false);

  const { register, handleSubmit, control } = useForm({
    mode: 'onBlur',
  });

  const {
    session: { login },
  } = useMobxStoreHook();

  const onSubmit: SubmitHandler<FieldValues> = async (): Promise<void> => {
    await handleSubmit(async (data: any) => {
      try {
        await login(data);
      } catch (e) {
        setError(true);
      }
    })();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Container
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 300,
              }}
            >
              <Controller
                control={control}
                name="login"
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="Login"
                    fullWidth={true}
                    margin="dense"
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                )}
              />

              <Controller
                control={control}
                name="password"
                render={() => (
                  <TextField
                    {...register('password')}
                    name="password"
                    type="password"
                    label="Password"
                    fullWidth={true}
                  />
                )}
              />
            </Container>
            {errorSt ? (
              <Box sx={{ color: 'red', mt: 2 }}>
                Incorrect password or login
              </Box>
            ) : null}
            <Button
              type="submit"
              variant="contained"
              disableElevation={true}
              sx={{
                marginTop: 2,
              }}
            >
              Sign In
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </form>
  );
};

export default observer(SignIn);
