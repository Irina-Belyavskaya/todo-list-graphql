import { Grid, CssBaseline, Paper, Box, Avatar, Typography, TextField, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

// ============== Yup ==============
import { schemaSignIn } from "./auth-schemas.yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FieldValues, useForm } from "react-hook-form";

// ============== Types ==============
import { AuthenticationDto } from "./types/authentication.dto";

// ============== Components ==============
import ErrorAlert from "components/error-alert.component";

// ============== Icons ==============
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

// ============== Cookies ==============
import Cookies from "js-cookie";

// ============== Graphql ==============
import { useMutation } from "@apollo/client";
import { LOGIN } from "app/graphql/users";

export default function AuthSignInPage() {
  let navigate = useNavigate();

  const [login, { error }] = useMutation(LOGIN, {
    onCompleted(data){
      reset();
      Cookies.set('jwt_token', data.login.access_token);
      Cookies.set('expired_at', data.login.expired_at);
      navigate('/', { replace: true });
    }
  });
  
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schemaSignIn),
    defaultValues: { email: '', password: '' }
  });

  const handleSubmitForm = (data: FieldValues) => {
    const dto: AuthenticationDto = {
      email: data.email,
      password: data.password
    };

    login({ variables: { "input": { ...dto } } });
  }

  return (
    <>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(https://images.unsplash.com/photo-1529346378633-c2b2a059c367?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar
              sx={{
                m: 1,
                bgcolor: '#0476E4',
                color: 'white'
              }}
            >
              <LoginOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handleSubmitForm)}
              sx={{ mt: 1 }}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <TextField
                        helperText={errors.email ? `${errors.email.message}`: ''}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        error={errors.email ? true : false}
                        {...field} />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <TextField
                      helperText={errors.password ? `${errors.password.message}`: ''}
                      margin="normal"
                      fullWidth
                      required
                      label="Password"
                      type="password"
                      id="password"
                      error={errors.password ? true : false}
                      {...field} />
                )}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: '20px',
                  backgroundColor: '#0476E4',
                  '&:hover': {
                    backgroundColor: '#1761A8',
                    color: 'white',
                  }
                }}
              >
                Sign in
              </Button>
              <Grid container>
                <Grid item>
                  <NavLink to="/app/auth/sign-up" style={{ color: '#0476E4' }}>
                    {"Don't have an account? Create!"}
                  </NavLink>
                </Grid>
                <Grid
                  container
                  item
                  sx={{ marginTop: '30px' }}
                >
                  {error &&  <ErrorAlert title="Error" text={error.message} />}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}