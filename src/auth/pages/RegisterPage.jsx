import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useState } from 'react';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';
import { useMemo } from 'react';

const formData = {
  email: '',
  password: '',
  displayName: '',
};

const formValidations = {
  email: [value => value.trim().includes('@'), 'Email should have @'],
  password: [value => value.trim().length >= 6, 'Password should have at least 6 characters'],
  displayName: [value => value.trim().length > 1, 'Name is required'],
};

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);

  const isCheckingAuthentication = useMemo(() => status === 'checkin', [status]);

  const dispatch = useDispatch();

  const {
    formState,
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = e => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Register">
      <h1>Form Valid {isFormValid ? 'true' : 'false'}</h1>

      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}>
            <TextField
              label="Full name"
              type="text"
              placeholder="Your name"
              fullWidth
              autoComplete="full-name"
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="email@google.com"
              fullWidth
              autoComplete="email"
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="password"
              fullWidth
              autoComplete="new-password"
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          {errorMessage && (
            <Grid
              container
              spacing={2}
              sx={{ mb: 2, mt: 1 }}>
              <Grid
                item
                xs={12}
                sm={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            </Grid>
          )}

          <Grid
            container
            spacing={2}
            sx={{ mb: 2, mt: 1 }}>
            <Grid
              item
              xs={12}
              sm={12}>
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth>
                Create account
              </Button>
            </Grid>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="end">
            <Typography sx={{ mr: 1 }}>Already have an account?</Typography>
            <Link
              component={RouterLink}
              color="inherit"
              to="/auth/login">
              Login
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
