import { Button, CardHeader, Paper } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { logUserOut } from "../features/login/login-slice";

export const Header = () => {
  const isUserLoggedIn = useSelector((state: RootState) => state.login.isUserLoggedIn);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logUserOut());
    navigate('/login');
  }

  return (
    <div>
      <Paper elevation={1} sx={{backgroundColor: 'steelblue'}}>
        <CardHeader title="Users App"/>
        {isUserLoggedIn && (
          <Button onClick={handleLogOut}>
            Log Out
          </Button>
        )}
      </Paper>
    </div>
  )
}

export default Header;
