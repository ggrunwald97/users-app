import { Box, CircularProgress, Divider, Grid, IconButton, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { User } from "../../../app/models/User";
import { RootState } from "../../../app/store";
import { addUser, getUsers } from "../users-thunk";
import { UserListItem } from "./user-list-item";
import { useFormik } from "formik";
import FormikInputField from "../../../common-components/formik-field";
import { STATUSES, GENDERS } from "../../../constants";
import { validationSchema } from "../../../app/commonSchemas.ts/schemas";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

export const UsersOverview = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);

  const usersList = useSelector((state: RootState) => state.users.usersList);
  const areUsersLoading = useSelector((state: RootState) => state.users.isLoading);
  const isUserLoggedIn = useSelector((state: RootState) => state.login.isUserLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate('/login')
    }
  })

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const initialValuesAdd = {
    email: '',
    name: '',
    status: 'active',
    gender: 'male',
  };

  const checkIfIsValid = (value: any) =>
    validationSchema.validate(value)
    .then(() => setIsSaveButtonEnabled(true))
    .catch(() => setIsSaveButtonEnabled(false));

  const formik = useFormik({
    initialValues: initialValuesAdd,
    validationSchema,
    validate: checkIfIsValid,
    onSubmit: () => {},
  });

  const handleSaveNewUser = () => {
    const postBody = {
      name: formik.values?.name,
      email: formik.values?.email,
      gender: formik.values?.gender,
      status: formik.values?.status,
    } as User

    dispatch(addUser(postBody))
    setIsAdd(false);
  }

  const addNewUserView = (
    <div>
      <Box padding={2} paddingBottom={4}>
        <Paper elevation={4}>
          <Grid container spacing={2} paddingLeft={1} paddingRight={1}>
            <Grid item xs={12}>
              <Typography>
                Add new User
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <FormikInputField id={"email"} label={"Email"} formik={formik}/>
            </Grid>
            <Grid item xs={6}>
              <FormikInputField id={"name"} label={"Name"} formik={formik}/>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="status"
                name="status"
                select
                fullWidth
                label="Status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.status && formik.errors.status}
              >
                {STATUSES.map((option: string) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="gender"
                name="gender"
                select
                fullWidth
                label="Gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.gender && formik.errors.gender}
              >
                {GENDERS.map((option: string) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  )


  const addUserControl = (
    <Grid container>
      <Grid item xs={12}>
        <IconButton onClick={() => {setIsAdd(false)}}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </Grid>
      {isAdd && (
        <Grid item xs={12} paddingTop={3}>
          <IconButton disabled={!isSaveButtonEnabled} onClick={() => handleSaveNewUser()}>
            <CheckIcon fontSize="large" />
          </IconButton>
        </Grid>
      )}
    </Grid>
  )

  return (
    <Box paddingTop={5}>
    <div>

      {areUsersLoading ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box paddingBottom={5}>
            {!isAdd ? (
              <>
                <Typography>
                  Add New User
                </Typography>
                <IconButton onClick={() => {setIsAdd(true)}}>
                  <AddIcon fontSize="large" />
                </IconButton>
              </ >
            ) : (
              <Paper>
                <Grid container paddingTop={2}>
                  <Grid item xs={10}>
                    {addNewUserView}
                  </Grid>
                  <Grid item xs={2}>
                    {addUserControl}
                  </Grid>
                </ Grid>
              </Paper>
            )}
          </Box>
        {usersList?.length > 0 ? (
          usersList.map((user: User) => (
            <UserListItem key={user?.id} user={user} />
          ))) : (
            <div>
              Sorry, no users found.
            </div>
          )}
        </>
      )}
    </div>
    </Box>
  )
}

export default UsersOverview;
