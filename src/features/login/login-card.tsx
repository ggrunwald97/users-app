import { Button, Paper, Grid, Typography } from "@mui/material"
import * as yup from 'yup';
import { useFormik } from 'formik';
import FormikInputField from "../../common-components/formik-field";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { USER_EMAIL, USER_PW } from "../../constants";
import { useDispatch } from "react-redux";
import { logUserIn } from "./login-slice";

export const LoginCard = () => {
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    email: yup
      .string()
      .min(1, 'Enter your email')
      .email('Enter a valid email address')
      .required('Email is required'),
    password: yup
      .string()
      .min(1, 'Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const checkIfIsValid = (value: any) =>
    validationSchema.validate(value)
    .then(() => setIsSaveButtonEnabled(true))
    .catch(() => setIsSaveButtonEnabled(false));

  const formik = useFormik({
    initialValues,
    validationSchema,
    validate: checkIfIsValid,
    onSubmit: () => {},
  });

  const handleSubmit = () => {
    if ( formik.values.email === USER_EMAIL && formik.values.password === USER_PW ) {
      dispatch(logUserIn());
      navigate('/');
    }
  }

  return (
    <Paper elevation={3}>
      <Typography paddingTop={4} variant='subtitle1' color='gray'>
        Login to your account
      </Typography>
      <div>
        <form>
          <Grid container padding={3}>
            <Grid item xs={12} paddingBottom={3}>
              <FormikInputField
                id='email'
                label='Email'
                formik={formik}
              />
            </Grid>
            <Grid item xs={12} paddingBottom={3}>
              <FormikInputField
                id='password'
                label='Password'
                formik={formik}
              />
            </Grid>
            <Grid item xs={9} />
            <Grid item xs={3} >
              <Button
                onClick={handleSubmit}
                disabled={!isSaveButtonEnabled}
                fullWidth
                variant='outlined'
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Paper>
  );
}

export default LoginCard;
