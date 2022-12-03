import { Alert, Snackbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setAlert } from '../features/users/users-slice';


const AlertToast = () => {
  const dispatch = useDispatch();

  const alert = useSelector((state: RootState) => state.users.alert);

  const handleCloseAlert = (event: any, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAlert({ severity: undefined, isOpen: false, text: '' }))
  }

  return (
    <Snackbar
      sx={{paddingTop: 10}}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      open={alert?.isOpen}
      autoHideDuration={4500}
      onClose={handleCloseAlert}
    >
      <Alert severity={alert?.severity}> {alert?.text}</Alert>
    </Snackbar>
  )
}

export default AlertToast
